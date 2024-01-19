from flask import Flask, request, abort, jsonify, session
from flask_session import Session
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
from helpers.search import search_for_id, search_for_candidate, search_for_name
from helpers.get_mockdata import extract_and_store, extract_and_store_work_history
from helpers.get_cv_data_llama import extract_cv
from mockdata.data import MOCK_CANDIDATE_DATA,MOCK_CANDIDATEWORKHISTORY_DATA
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

list_of_processed_candidates, list_of_processed_workhistory = [], []
api_endpoint = 'https://fakerapi.it/api/v1/custom?_quantity=1&firstName=firstName&lastName=lastName&street=streetAddress&city=city&country=country&phone=phone&company=company_name&dateEntered=dateTime&dateRetired=dateTime&school=state&dateEntered=dateTime&dateGraduated=dateTime&certification=website'

@app.route('/get_candidate', methods=['POST'])
def get_candidate():
    try:
        received_id = request.json
        candidate_id = received_id["candidateId"]
        candidate_data = search_for_id(candidate_id, list_of_processed_candidates)
        return candidate_data

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/search_name', methods = ['POST'])
def search_candidate():
    try:
        received_name = request.json
        candidate_name = received_name["name"]
        candidate_data = search_for_name(candidate_name, list_of_processed_candidates)
        return candidate_data
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/prompt_input', methods=['POST'])
def get_custom_prompt():
    try:
        received_data = request.json
        custom_prompt = received_data["response"]
        candidate_id = received_data["candidateId"]
        infer_data = received_data["dataToInfer"]
        mode = received_data["mode"]
        if mode == "bullhorn":
            candidate_data = search_for_id(candidate_id, list_of_processed_candidates)
        else:
            candidate_data = session.get('pdfFile', 'No Candidate available please upload the CV again')
        if infer_data == "languageSkills":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is not None:
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is None and mode == "bullhorn":
            candidate_data = search_for_candidate(candidate_id, list_of_processed_workhistory)
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is None and mode == "CV":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "location" and mode == "bullhorn":
            candidate_work_history = search_for_candidate(candidate_id, list_of_processed_workhistory)
            for d in candidate_work_history:
                candidate_data.update(d)
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "location" and mode == "CV":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
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
    
def process_api_mockresponse(response):
    candidate_data = extract_and_store(response)

    return candidate_data

@app.route('/process_data', methods=['GET'])
def handle_api_data():
    global list_of_processed_candidates, list_of_processed_workhistory
    try:
        # Make a GET request to the API
        # count = 0
        # while count < 4:
        #     response = requests.get(api_endpoint)
        #     processed_response = process_api_response(response)
        #     list_of_response.append(processed_response)
        #     count += 1
        list_of_candidates = MOCK_CANDIDATE_DATA
        list_of_workhistory = MOCK_CANDIDATEWORKHISTORY_DATA
        for response in list_of_workhistory:
            processed_response = extract_and_store_work_history(response)
            list_of_processed_workhistory.append(processed_response)
        # Process the API response
        for response in list_of_candidates:
            processed_response = process_api_mockresponse(response)
            list_of_processed_candidates.append(processed_response)
        return jsonify(list_of_processed_candidates)
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/upload', methods=['POST'])   
def upload_file():
    if 'pdfFile' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['pdfFile']
    extracted_data = extract_cv(file)
    session['pdfFile'] = extracted_data

    return extracted_data

if __name__ == '__main__':
    app.run()