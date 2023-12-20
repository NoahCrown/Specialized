from flask import Flask, request, abort, jsonify
from helpers.get_data import extract_data
from helpers.summarize import summarize_data
import requests

app = Flask(__name__)

api_endpoint = 'https://fakerapi.it/api/v1/custom?_quantity=1&firstName=firstName&lastName=lastName&street=streetAddress&city=city&country=country&phone=phone&company=company_name&dateEntered=dateTime&dateRetired=dateTime&school=state&dateEntered=dateTime&dateGraduated=dateTime&certification=website'

def process_api_response(response):
    if response.status_code == 200:
        json_data = response.json()
        candidate_data = extract_data(json_data)
        # response = summarize_data(candidate_data)

        return candidate_data
    else:
        return jsonify({'error': 'Failed to fetch data from API'}), response.status_code

# Example usage within Flask route or webhook handling
@app.route('/process_data', methods=['GET'])
def handle_api_data():
    try:
        # Make a GET request to the API
        count = 0
        list_of_response = []
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