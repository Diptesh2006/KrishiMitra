from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
import logging
import json
from datetime import datetime
import pandas as pd

from langchain_community.document_loaders import TextLoader
from langchain_core.documents import Document
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

# creating a flask web sever instance
app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


# Configure the Gemini API client
gemini_api_key = os.getenv("GEMINI_API_KEY")
if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set")


# logging to the file (records)
logging.basicConfig(
    filename='chat_logs.json',
    level=logging.INFO,
    format='%(message)s'
)


# System prompt loader
def load_system_prompt():
    try:
        with open("system_prompt.txt", "r", encoding="utf-8") as file:
            return file.read()
    except Exception:
        return "You are a helpful AI assistant."


system_prompt = load_system_prompt()


def load_knowledge_base():
    """
    Loads documents from both a TXT and a CSV file.
    The CSV data is converted into a structured document format.
    """
    docs = []
    
    # Load from TXT file
    if os.path.exists("knowledge_base.txt"):
        txt_loader = TextLoader("knowledge_base.txt")
        docs.extend(txt_loader.load())
    
    # Load from CSV file
    if os.path.exists("knowledge_base.csv"):
        df = pd.read_csv("knowledge_base.csv")
        for _, row in df.iterrows():
            # Convert each row into a string and then into a LangChain Document
            doc_content = ", ".join([f"{col}: {val}" for col, val in row.items()])
            docs.append(Document(page_content=doc_content))
            
    return docs


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        # Load the combined knowledge base
        docs = load_knowledge_base()

        # Generation chain (initialize Gemini LLM)
        llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            google_api_key=gemini_api_key,
            temperature=0.7
        )

        # The chat prompt is the core of our new system. It includes the system prompt, history, and user input.
        chat_prompt = ChatPromptTemplate.from_messages([
            ("system", system_prompt + "\n\nRelevant context:\n{context}"),
            ("user", "{input}"),
        ])

        
        combine_docs_chain = create_stuff_documents_chain(llm, chat_prompt)
        
        # Invoke the chain to get a response
        response = combine_docs_chain.invoke({"input": user_message, "context": docs})

        
        log_entry = {
            "timestamp": datetime.now().isoformat(),
            "user_message": user_message,
            "chatbot_response": response
        }
        logging.info(json.dumps(log_entry))

        return jsonify({"response": str(response)})

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to get a response from the AI."}), 500

    # jsonify fn converts this dict into a json obj


# Main
if __name__ == "__main__":
    app.run(debug=True)