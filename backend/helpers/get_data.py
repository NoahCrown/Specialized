from flask import jsonify
import random

job_positions = ["Software Engineer", "Data Analyst", "Project Manager", "Marketing Specialist", "UI/UX Designer"]

def generate_random_position(positions):
    if not positions:
        return "No positions available"
    else:
        return random.choice(positions)

def extract_data(json_data):
    if 'data' in json_data and len(json_data['data']) > 0:
        item = json_data['data'][0]
        fullname = item.get('firstName') + ' ' + item.get('lastName')
        email = None  # The provided JSON response doesn't contain an 'email' field
        
        phone = item.get('phone')
        
        address = {
            'street': item.get('street', ''),
            'city': item.get('city', ''),
            'country': item.get('country', '')
        }

        job_history = {
            'date_entered': item.get('dateEntered', {}).get('date', ''),
            'job position': generate_random_position(job_positions),
            'date_retired': item.get('dateRetired', {}).get('date', ''),
            'company': item.get('company', '')
        }

        education_history = {
            'date_graduated': item.get('dateGraduated', {}).get('date', ''),
            'school': item.get('school', '')
        }

        certification = item.get('certification', '')

        candidate_data = {
            'fullname': fullname,
            'email': email,
            'phone': phone,
            'address': address,
            'job_history': job_history,
            'education_history': education_history,
            'certification': certification
        }

        return candidate_data
    else:
        return jsonify({'error': 'No data available in the response'}), 404