from flask import Flask, request, abort, jsonify
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
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

        found_candidate_data = None

        for response in list_of_response:
            if response.get('id') == candidate_id:
                found_candidate_data = response
                break
        
        if found_candidate_data:
            return jsonify(found_candidate_data)
        else:
            return jsonify({"message": "Candidate not found"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/prompt_input', methods=['POST'])
def get_custom_prompt():
    try:
        received_data = request.json
        #call/search the active candidate
        custom_prompt = received_data["response"]
        # response = summarize_data(candidate_data, id, custom prompt)
        return custom_prompt
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Return any exception as a JSON response with 500 status code
        
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