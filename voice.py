import os
import groq
import openai
import pandas as pd
from dotenv import load_dotenv

# --- Step 0: Set up API Clients and Data ---
load_dotenv()
groq_client = groq.Groq(api_key=os.environ.get("GROQ_API_KEY"))
openai_client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# Load farm knowledge from a CSV file
# Example format: latitude,longitude,soil_type,common_crops,weather_forecast
try:
    farm_knowledge_df = pd.read_csv("farm_knowledge_base.csv")
except FileNotFoundError:
    print("Error: 'farm_knowledge_base.csv' not found. Please create it.")
    exit()

def get_local_farm_data(latitude, longitude):
    """
    Retrieves the closest farm data from the DataFrame based on location.
    In a real app, you'd use a more advanced spatial query.
    For this example, we'll find the closest match.
    """
    # Calculate the distance to each point in the knowledge base
    farm_knowledge_df['distance'] = (
        (farm_knowledge_df['latitude'] - latitude)**2 + 
        (farm_knowledge_df['longitude'] - longitude)**2
    )**0.5
    
    # Get the row with the minimum distance
    closest_row = farm_knowledge_df.sort_values(by='distance').iloc[0]
    return closest_row.to_dict()

# --- Step 1: Speech-to-Text (using Groq) ---
def transcribe_audio(audio_file_path):
    """Transcribes an audio file to text using Groq's Whisper model."""
    try:
        with open(audio_file_path, "rb") as file:
            transcription = groq_client.audio.transcriptions.create(
                file=(audio_file_path, file.read()),
                model="whisper-large-v3",
            )
        return transcription.text
    except Exception as e:
        print(f"Error during transcription: {e}")
        return None

# --- Step 2: Location-Aware LLM (using Groq) ---
def generate_location_aware_response(user_text, latitude, longitude):
    """Generates a text response using a Groq LLM, augmented with location data."""
    local_data = get_local_farm_data(latitude, longitude)

    # Use the retrieved data to build a custom system prompt.
    system_prompt = f"""
    You are an expert agricultural consultant specializing in {local_data['region_name']}. 
    You must provide advice based on the provided location data.
    - Soil Type: {local_data['soil_type']}
    - Common Crops: {local_data['common_crops']}
    - Weather Forecast: {local_data['weather_forecast']}

    Your advice should be specific, concise, and easy for a farmer to understand.
    """
    
    try:
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_text},
            ],
            model="llama-3.1-8b-instant",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error generating response: {e}")
        return None

# --- Step 3: Text-to-Speech (using OpenAI) ---
def synthesize_speech(text_response, output_audio_path):
    """Synthesizes text into an audio file using OpenAI's TTS API."""
    try:
        response = openai_client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=text_response
        )
        response.stream_to_file(output_audio_path)
        print(f"Audio response saved to: {output_audio_path}")
        return output_audio_path
    except Exception as e:
        print(f"Error synthesizing speech: {e}")
        return None

# --- Main Pipeline Logic ---
def run_voice_bot_for_farmers(audio_file, lat, lon):
    print("Processing audio...")
    # Step 1: Transcribe the audio
    user_input_text = transcribe_audio(audio_file)
    if not user_input_text:
        return

    print(f"User said: '{user_input_text}'")

    # Step 2: Generate a location-aware text response
    chatbot_response_text = generate_location_aware_response(user_input_text, lat, lon)
    if not chatbot_response_text:
        return

    print(f"Chatbot's text response: '{chatbot_response_text}'")

    # Step 3: Synthesize the audio and save it
    output_audio_file = "chatbot_response.mp3"
    synthesize_speech(chatbot_response_text, output_audio_file)
    print("Voice response is ready to be played.")