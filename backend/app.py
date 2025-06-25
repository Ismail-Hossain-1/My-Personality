import os
import requests
import joblib
import io
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# GitHub raw URLs for the model and scaler
MODEL_URL = "https://raw.githubusercontent.com/Ismail-Hossain-1/Personality-Test/main/svm_model.pkl"
SCALER_URL = "https://raw.githubusercontent.com/Ismail-Hossain-1/Personality-Test/main/scaler.pkl"

def load_pickle_from_url(url):
    response = requests.get(url)
    response.raise_for_status()
    return joblib.load(io.BytesIO(response.content))

# Load the model and scaler from GitHub at startup
model = load_pickle_from_url(MODEL_URL)
scaler = load_pickle_from_url(SCALER_URL)

@app.route("/", methods=['GET'])
def home():
    return "Backend Running"

@app.route('/personalitytest', methods=['POST', 'OPTIONS'])
def test():
    if request.method == 'OPTIONS':
        # CORS preflight
        return '', 200
    try:
        data = request.get_json()
        input_data = data.get('input_data')
        print("Input data:", input_data)

        if not input_data or len(input_data) != 7:
            return jsonify({'error': 'Invalid input data'}), 400

        input_array = [input_data]
        input_scaled = scaler.transform(input_array)
        print("Scaled input:", input_scaled)

        prediction = model.predict(input_scaled)[0]
        print("Prediction:", prediction)

        personality = 'Extrovert' if prediction == 0 else 'Introvert'

        return jsonify({
            'prediction': int(prediction),
            'personality': personality
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

