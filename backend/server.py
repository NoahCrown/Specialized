from flask import Flask, request, abort, jsonify
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
import requests

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        try:
            received_data = request.json  # Get the JSON data from the request
            if 'id' in received_data:
                data_id = received_data["id"]
                return jsonify(received_data)  # Return 'id' field in JSON format
            else:
                return jsonify({"error": "No 'id' field found in the received JSON data"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Return any exception as a JSON response with 500 status code
api_endpoint = 'https://fakerapi.it/api/v1/persons?_quantity=1'

def process_api_response(response):
    if response.status_code == 200:
        json_data = response.json()
        candidate_data = extract_data(json_data)
        response = summarize_data(candidate_data)

        return {"response":response}
    else:
        return jsonify({'error': 'Failed to fetch data from API'}), response.status_code

# Example usage within Flask route or webhook handling
@app.route('/process_data', methods=['GET'])
def handle_api_data():
    try:
        # Make a GET request to the API
        response = requests.get(api_endpoint)
        # Process the API response
        return process_api_response(response)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()