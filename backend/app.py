import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load your model and scaler once at startup
model = joblib.load(os.path.join(BASE_DIR, 'svm_model.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'scaler.pkl'))


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

