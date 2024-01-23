import os
from dotenv import load_dotenv
from flask import Flask, request, abort, jsonify, session
from flask_session import Session
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
from helpers.search import search_for_id, search_for_candidate, search_for_name
from helpers.get_mockdata import extract_and_store, extract_and_store_work_history
from helpers.get_cv_data_llama import extract_cv
from helpers.bullhorn_access import BullhornAuthHelper, on_401_error
from mockdata.data import MOCK_CANDIDATE_DATA,MOCK_CANDIDATEWORKHISTORY_DATA
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)

app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

load_dotenv()
CLIENT_ID = os.getenv('SPECIALIZED_CLIENT_ID')
USERNAME = os.getenv('SPECIALIZED_USERNAME')
PASSWORD = os.getenv('SPECIALIZED_PASSWORD')
CLIENT_SECRET = os.getenv('SPECIALIZED_CLIENT_SECRET')
SPECIALIZED_URL = os.getenv('SPECIALIZED_REST_URL')

# Initialize BullhornAuthHelper
bullhorn_auth_helper = BullhornAuthHelper(CLIENT_ID, CLIENT_SECRET)
bullhorn_auth_helper.authenticate(USERNAME, PASSWORD)

@app.route('/get_candidate', methods=['POST'])
@on_401_error(lambda: bullhorn_auth_helper.authenticate(USERNAME, PASSWORD))
def get_candidate():
    try:
        received_id = request.json
        candidate_id = received_id["candidateId"]
        access_token = bullhorn_auth_helper.get_rest_token()
        search_candidate_by_id_url = f'search/Candidate?BhRestToken={access_token}&query=id:{candidate_id}&fields=id,firstName,lastName,email,phone,dateOfBirth,certifications,ethnicity,primarySkills,educationDegree,comments,secondarySkills,skillSet,specialties'
        candidate_data = requests.get(SPECIALIZED_URL+search_candidate_by_id_url)
        return candidate_data

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# @app.route('/search_name', methods = ['POST'])
# def search_candidate():
#     try:
#         received_name = request.json
#         candidate_name = received_name["name"]
#         candidate_data = search_for_name(candidate_name, list_of_processed_candidates)
#         return candidate_data
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route('/prompt_input', methods=['POST'])
@on_401_error(lambda: bullhorn_auth_helper.authenticate(USERNAME, PASSWORD))
def get_custom_prompt():
    try:
        received_data = request.json
        custom_prompt = received_data["response"]
        candidate_id = received_data["candidateId"]
        infer_data = received_data["dataToInfer"]
        mode = received_data["mode"]
        access_token = bullhorn_auth_helper.get_rest_token()
        search_candidate_by_id_url = f'search/Candidate?BhRestToken={access_token}&query=id:{candidate_id}&fields=id,firstName,lastName,email,phone,dateOfBirth,certifications,ethnicity,primarySkills,educationDegree,comments,secondarySkills,skillSet,specialties'
        search_candidate_workhistory_by_id_url=f'query/CandidateWorkHistory?BhRestToken={access_token}&fields=id,candidate,startDate,endDate,companyName,title,isLastJob,comments,jobOrder&where=candidate.id={candidate_id}'
        if mode == "bullhorn":
            candidate_data = requests.get(SPECIALIZED_URL+search_candidate_by_id_url)
            candidate_data = candidate_data.json()
            candidate_data = candidate_data['data'][0]
            if (infer_data == "age" and candidate_data["dateOfBirth"] is None) or (infer_data == "location" and mode == "bullhorn"):
                candidate_workhistory = requests.get(SPECIALIZED_URL+search_candidate_workhistory_by_id_url)
                candidate_workhistory = candidate_workhistory.json()
                candidate_workhistory = candidate_workhistory['data'][0]
        else:
            candidate_data = session.get('pdfFile', 'No Candidate available please upload the CV again')
        if infer_data == "languageSkills":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is not None:
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is None and mode == "bullhorn":
            response = summarize_data(candidate_workhistory, custom_prompt, infer_data)
        elif infer_data == "age" and candidate_data["dateOfBirth"] is None and mode == "CV":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "location" and mode == "bullhorn":
            candidate_data = [candidate_data, candidate_workhistory]
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        elif infer_data == "location" and mode == "CV":
            response = summarize_data(candidate_data, custom_prompt, infer_data)
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/process_data', methods=['GET'])
@on_401_error(lambda: bullhorn_auth_helper.authenticate(USERNAME, PASSWORD))
def handle_api_data():
    try:
        access_token = bullhorn_auth_helper.get_rest_token()
        get_candidate_url = f'search/Candidate?BhRestToken={access_token}&query=isDeleted:0&fields=id,firstName,lastName,email,phone,dateOfBirth,certifications,ethnicity,primarySkills,educationDegree,comments,secondarySkills,skillSet,specialties&sort=id&start=0&count=500'

        response = requests.get(SPECIALIZED_URL+get_candidate_url)
        response = response.json()
        response = response['data']
        return response

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