def search_for_id(candidate_id, list_of_response):
    
    found_candidate_data = None
    for response in list_of_response:
        if str(response.get('id')) == candidate_id:
            found_candidate_data = response
            break
    if found_candidate_data:
        return found_candidate_data
    else:
        return {"message": "Candidate not found"}