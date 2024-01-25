import os
import json
import replicate
from dotenv import load_dotenv

def language_skill(candidate_data, custom_prompt):
    load_dotenv()
    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass
    base_prompt = """
    You are provided with a candidate json data and a custom prompt. Your job is to infer the candidate's language proficiency in english and japanese using the given candidate's data.
    Please follow the JSON format provided below and return only the JSON data.
    """

    load_data = f"""
    Data:
    {candidate_data}"""

    json_format= """
    Don't add an explanation only send back the json data
    JSON Format:
    [
    {
        "Language": "English",
        "enProficiency": ( insert here how proficient the candidate is in english (en) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    },
    {
        "Language": "Japanese",
        "jpProficiency": ( insert here how proficient the candidate is in japanese (jp) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    }
    ]
    """
    query = base_prompt + custom_prompt + load_data + json_format
    system_prompt = "You are a bot that answers in JSON format"
    response = api.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": system_prompt,
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    try:
        return eval(response)
    except:
        return json.loads(response)

def infer_age(candidate_data, custom_prompt, current_date):
    load_dotenv()
    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass
    load_data = f"""
    you are given this json data. the dates are in epoch timestamps

    Data:
    {candidate_data}

    your job is to infer the age of the candidate based on the date given to you. you can use his/her birthday, if those are not available you can rely on his/her job history or year of graduation. add a confidence level to see how confident you are with inferring the age data
    I'll also provide you a date, give me the age of the candidate base of this date.

    Current Date:
    {current_date}
    """

    json_format= """
    Don't add an explanation only send back the json data
    {
        "Age": ( insert inferred age here ),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest)
    }
    """
    query = load_data + custom_prompt + json_format
    system_prompt = "You are a bot that answers in JSON format"
    response = api.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": system_prompt,
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    try:
        return eval(response)
    except:
        return json.loads(response)
    
def infer_location(candidate_data, custom_prompt, current_date):
    load_dotenv()
    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass
    base_instruction = """
    i'm gonna give you a candidate's data, your job is to infer the location of that candidate using his/her work experience, phone number area code and ethinicity
    """
    load_data = f"""
    Data:
    {candidate_data}

    Current Date:
    {current_date}
    """

    json_format= """
    Don't add an explanation only send back the json data
    {
        "Location":  ( insert here the inferred location of the candidate base on the data given to you ),
        "confidence": ( AI's confidence in inferring the data 1-5, 5 being the highest)
    }
    """
    query = base_instruction + custom_prompt + load_data + json_format
    system_prompt = "You are a bot that answers in JSON format"
    response = api.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": system_prompt,
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    try:
        return eval(response)
    except:
        return json.loads(response)