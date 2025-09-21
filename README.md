# KrishiMitra

KrishiMitra is an intelligent agricultural assistant designed to empower farmers and agronomists with AI-driven insights, recommendations, and analytics for crop planning, yield prediction, market price forecasting, and more. The platform leverages machine learning models and interactive dashboards to make data-driven farming accessible and multilingual.

---

## Features

### 🌾 Crop Recommendation
- **Smart crop selection** based on local soil, climate, and nutrient profiles, using ML models (`models/crop_recommender.py`).
- Multilingual support for analytics and recommendations.

### 📈 Yield Prediction
- Predicts potential crop yield using historical data and current conditions (`models/yield_pred.py`).
- Inputs: location, crop, season, area.

### 💧 Irrigation Frequency
- Recommends optimal irrigation schedules for different crops based on soil, weather, and crop requirements (`models/irrigation.py`).

### 🧪 Fertilizer Recommendation & Quantity Prediction
- Suggests best fertilizer and quantity for selected crop and location (`models/fert_quantity_pred.py`).

### 🏛️ Market Price Forecasting
- ML-powered market price prediction for agricultural commodities (`models/market_price_prediction.py`).

### 🗣️ Voice-enabled Chatbot
- Conversational AI assistant for voice queries in multiple Indian languages (`frontend/components/voice-chatbot.tsx`, `voice.py`).

### 📊 Crop Analytics Dashboard
- Interactive dashboard for farmers to visualize crop growth, soil health, weather impact, and more (`frontend/app/dashboard/page.tsx`, `frontend/components/crop-analytics.tsx`).

---

## Tech Stack

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Python (FastAPI/Flask recommended), Pandas, scikit-learn, XGBoost
- **ML/AI:** Pre-trained models for crop prediction, yield, irrigation, fertilizer, and market price
- **Voice AI:** Groq Whisper, OpenAI
- **Data:** Custom CSV datasets for crops, soil, nutrients, weather, market prices

---

## Getting Started

1. **Clone the repo**
    ```bash
    git clone https://github.com/Diptesh2006/KrishiMitra.git
    cd KrishiMitra
    ```

2. **Install Python dependencies**
    ```bash
    pip install -r requirements.txt
    ```

3. **Install frontend dependencies**
    ```bash
    cd frontend
    npm install
    ```

4. **Configure environment variables**
    - For voice assistant and AI features, set up `GROQ_API_KEY` and `OPENAI_API_KEY` in a `.env` file.

5. **Run models and backend server**
    - Train and save ML models using scripts in `/models`.
    - Start your backend server (FastAPI/Flask).

6. **Run frontend**
    ```bash
    npm run dev
    ```

---

## File Structure

```
KrishiMitra/
├── models/               # Python ML models for crop, yield, irrigation, fertilizer, market price
├── frontend/             # Next.js frontend app
│   ├── app/dashboard/    # Dashboard pages and components
│   ├── components/       # UI and analytics components
│   ├── lib/api.ts        # API calls to backend
├── voice.py              # Voice assistant handler (Groq + OpenAI)
├── datasets/             # CSV datasets used by models
├── README.md
```

---

## API Endpoints

All backend endpoints are accessible via REST POST requests:
- `/crop/recommend`
- `/fertilizer/recommend`
- `/predict-yield`
- `/irrigation/recommend`
- `/market-price/predict`

See `frontend/lib/api.ts` for details on request payloads.

---

## Multilingual Support

Supports crop analytics and chatbot interactions in Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, and English.

---

## Contributing

Feel free to open issues or pull requests for new features, bug fixes, or improvements.

---

## License

[MIT](LICENSE)

---

## Maintainers

- Diptesh2006 ([GitHub](https://github.com/Diptesh2006))

---

## Acknowledgements

- Indian agricultural datasets
- OpenAI, Groq, scikit-learn, XGBoost, Next.js, React
