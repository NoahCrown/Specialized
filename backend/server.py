from flask import Flask, request, abort, jsonify
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
from helpers.search import search_for_id
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

list_of_response = []
api_endpoint = 'https://fakerapi.it/api/v1/custom?_quantity=1&firstName=firstName&lastName=lastName&street=streetAddress&city=city&country=country&phone=phone&company=company_name&dateEntered=dateTime&dateRetired=dateTime&school=state&dateEntered=dateTime&dateGraduated=dateTime&certification=website'

@app.route('/get_candidate', methods=['POST'])
def get_candidate():
    try:
        received_id = request.json
        candidate_id = received_id["candidateId"]
        candidate_data = search_for_id(candidate_id, list_of_response)
        return candidate_data

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/prompt_input', methods=['POST'])
def get_custom_prompt():
    try:
        received_data = request.json
        custom_prompt = received_data["response"]
        candidate_id = received_data["candidateId"]
        candidate_data = search_for_id(candidate_id, list_of_response)
        response = summarize_data(candidate_data, custom_prompt)
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500 
        
def process_api_response(response):
    if response.status_code == 200:
        json_data = response.json()
        candidate_data = extract_data(json_data)

        return candidate_data
    else:
        return jsonify({'error': 'Failed to fetch data from API'}), response.status_code
    
@app.route('/process_data', methods=['GET'])
def handle_api_data():
    global list_of_response
    try:
        # Make a GET request to the API
        count = 0
        while count < 4:
            response = requests.get(api_endpoint)
            processed_response = process_api_response(response)
            list_of_response.append(processed_response)
            count += 1
        # Process the API response
        return list_of_response
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()