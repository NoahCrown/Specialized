import json

def extract_and_store(response):
    try:
        # Parse the API response as JSON
        api_data = response
        
        # Create an empty dictionary to store the extracted data
        extracted_data = {}
        
        # Store the API response in the dictionary
        extracted_data["id"] = api_data.get("id")
        extracted_data["first_name"] = api_data.get("first_name")
        extracted_data["last_name"] = api_data.get("last_name")
        extracted_data["phone"] = api_data.get("phone")
        extracted_data["dateOfBirth"] = api_data.get("dateOfBirth")
        extracted_data["certification"] = api_data.get("certification")
        extracted_data["ethnicity"] = api_data.get("ethnicity")
        extracted_data["primarySkills"] = api_data.get("primarySkills")
        extracted_data["educationDegree"] = api_data.get("educationDegree")
        extracted_data["comments"] = api_data.get("comments")
        extracted_data["specialties"] = api_data.get("specialties")
        
        return extracted_data
    except json.JSONDecodeError as e:
        print("Error parsing JSON:", e)
        return None
