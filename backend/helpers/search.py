def search_for_id(candidate_id, list_of_response):
    
    found_candidate_data = None
    for response in list_of_response:
        if str(response.get('id')) == str(candidate_id):
            found_candidate_data = response
            break
    if found_candidate_data:
        return found_candidate_data
    else:
        raise ValueError ("Candidate not found")
    
def search_for_candidate(candidate_id, list_of_response):
    found_candidate_data = None
    
    for response in list_of_response:
        if str(response.get('candidate').get('id')) == str(candidate_id):
            found_candidate_data = response
            break
    
    if found_candidate_data:
        return found_candidate_data
    else:
        raise ValueError("Candidate not found")