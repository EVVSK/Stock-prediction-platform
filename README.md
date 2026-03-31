# Stock Prediction Platform using GCP

## Description

This project is a robust Stock Trend Prediction Platform that leverages machine learning and cloud technologies to forecast stock trends in real-time. The system integrates live data feeds, predictive analytics, and interactive visualizations to provide actionable insights for stock market enthusiasts and investors.

## Features

+ **Real-Time Data:** Fetches live stock market data using Yahoo Finance API.
+ **Machine Learning Models:** Implements TensorFlow-based LSTM, DNN models and Gradient Boosting Classifiers for predictive analytics.
+ **Data Visualization:** An interactive front-end visualizes stock price trends and predictions.
+ **Portfolio Recommendations:** Suggests stocks to buy or sell based on prediction trends.
+ **Cloud Integration:** Employs Google Cloud services for data streaming, processing, and storage.

## Technologies Used

+ **Frontend:** React.js, HTML/CSS
+ **Backend:** Node.js, Express, Python (data pipelines)
+ **APIs:** Yahoo Finance (yfinance)
+ **Machine Learning Frameworks:** TensorFlow/Keras, Scikit-learn, Pandas
+ **Google Cloud Platform Services:** Pub/Sub, BigQuery, AI Platform
+ **Data Visualization Tools:** Seaborn, Matplotlib

## Project Structure

- `Model/`: Contains Jupyter notebooks for ML model training, evaluation, and pipeline creation.
- `GCP/`: Notebooks related to fetching stock data and storing/manipulating it in Google BigQuery.
- `saved_model/`: Serialized pre-trained Keras models (`dnn_model.keras`, `lstm_model.keras`, etc.) ready for inference.
- `stock-predictions/`: The full-stack web application.
  - `backend/`: Node.js backend to serve the API and interact with data.
  - `src/` & `public/`: The React-based user interface.

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js (v14 or above)
- A Google Cloud Service Account JSON credentials file for BigQuery/Pub-Sub access.

### 1. Data Pipeline and Models (Python Environment)
If you wish to run the internal ML models or update the data pipeline, ensure your Python environment is set up.

1. Clone the repository:
   ```bash
   git clone https://github.com/EVVSK/Stock-prediction-platform.git
   cd Stock-prediction-platform
   ```
2. Make sure you have the necessary Python packages installed (e.g., `pandas`, `numpy`, `tensorflow`, `scikit-learn`, `google-cloud-bigquery`, `yfinance`).
3. Note: For Google Cloud access, place your service account JSON file in the project folder root. (This file is `.gitignore`d to prevent accidental exposed uploads).

### 2. Running the Backend Server
The Node.js server handles API requests and bridges the interaction between the frontend and your data pipeline/storage.

1. Navigate to the backend directory:
   ```bash
   cd stock-predictions/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (usually runs on port 5000):
   ```bash
   node server.js
   ```

### 3. Running the React Frontend
Open a new terminal window to start the client-side app:

1. Navigate to the React app folder:
   ```bash
   cd stock-predictions
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
   The application will become available locally, standardizing on `http://localhost:3000`.

## License

Please refer to the `License` file at the root of the project.
