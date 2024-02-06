import os
import json
from langchain_community.llms.deepinfra import DeepInfra
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv

def language_skill(candidate_data, custom_prompt):
    load_dotenv()
    os.environ["DEEPINFRA_API_TOKEN"] = os.getenv('DEEPINFRA_API_TOKEN')
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass

    load_data = """
    Data:
    {candidate_data}"""

    json_format= """
    Don't add an explanation only send back the json data
    Please follow the json format provided below and only return the json data

    JSON Format:
    [
    {{
        "Language": "English",
        "enProficiency": '( insert here how proficient the candidate is in english (en) ranging from None/Basic/Conversational/Business/Fluent/Native))',
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    }},
    {{
        "Language": "Japanese",
        "jpProficiency": '( insert here how proficient the candidate is in japanese (jp) ranging from None/Basic/Conversational/Business/Fluent/Native))',
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    }}
    ]
    """
    query = custom_prompt + load_data + json_format
    prompt = PromptTemplate(template=query, input_variables=["candidate_data"])
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(candidate_data)
    try:
        return eval(response)
    except:
        return json.loads(response)

def infer_age(candidate_data, custom_prompt, current_date):
    load_dotenv()
    os.environ["DEEPINFRA_API_TOKEN"] = os.getenv('DEEPINFRA_API_TOKEN')
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass
    load_data = """
    you are given this json data. the dates are in epoch timestamps

    Data:
    {candidate_data}

    {custom_prompt}
    I'll also provide you a date, give me the age of the candidate base of this date.

    Current Date:
    {current_date}
    """

    json_format= """
    Don't add an explanation only send back the json data
    Please follow the json format provided below and only return the json data
    {
        "Age": ( insert inferred age here ),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest)
    }
    """
    query = load_data + json_format
    prompt = PromptTemplate(template=query, input_variables=["candidate_data", "custom_prompt", "current_date"])
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(params)
    try:
        return eval(response)
    except:
        return json.loads(response)
    
def infer_location(candidate_data, custom_prompt, current_date):
    load_dotenv()
    os.environ["DEEPINFRA_API_TOKEN"] = os.getenv('DEEPINFRA_API_TOKEN')
    if custom_prompt is None:
        custom_prompt = ""
    else:
        pass
    
    load_data = """
    Data:
    {candidate_data}

    Current Date:
    {current_date}
    """

    json_format= """
    Don't add an explanation only send back the json data
    Please follow the json format provided below and only return the json data

    {
        "Location":  '( insert here the inferred location of the candidate base on the data given to you )',
        "confidence": ( AI's confidence in inferring the data 1-5, 5 being the highest)
    }
    """
    query = custom_prompt + load_data + json_format
    prompt = PromptTemplate(template=query, input_variables=["candidate_data", "current_date"])
    params = {"candidate_data":candidate_data, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(params)
    try:
        return eval(response)
    except:
        return json.loads(response)