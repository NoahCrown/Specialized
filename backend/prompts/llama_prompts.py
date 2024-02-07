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
    <<SYS>>
    You are a bot who is professional at inferring a candidate's language proficiency in english and japanese based on the available data given to you.
    <<SYS>>

    [INST]
    Your job is to infer the candidate's language proficiency in english and japanese and add in your confidence when it comes to the data inferred.
    Your ouput should only be a json object, you are provided with an example of a json object you'll be returning.
    Plug in the datas as values in this json object and remember to only return me a json object, nothing else.
    Please follow the json object format provided to you and only return a json object.
    Do not provide any kind of explanation or example data. I only need the json object with the values inserted.
    
    
    Data: 
    {candidate_data}

    Json Format:
    [
    {{
        "Language":"English",
        "enProficiency":( insert here how proficient the candidate is in english (en) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    }},
    {{
        "Language":"Japanese",
        "jpProficiency":( insert here how proficient the candidate is in japanese (jp) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence:( insert confidence level here from 1-5, 1 being the lowest),
    }}
    ]

    Only return me a json object, no explanation, no sample data, no nothing, just the json data with values inserted in it.

    [/INST]
    
"""

    json_format= """
    Don't add an explanation only send back the json data
    Please follow the json format provided below and only return the json data

    JSON Format:
    [
    {{
        "Language":"English",
        "enProficiency":( insert here how proficient the candidate is in english (en) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence: ( insert confidence level here from 1-5, 1 being the lowest),
    }},
    {{
        "Language":"Japanese",
        "jpProficiency":( insert here how proficient the candidate is in japanese (jp) ranging from None/Basic/Conversational/Business/Fluent/Native)),
        "confidence:( insert confidence level here from 1-5, 1 being the lowest),
    }}
    ]
    """
    query = custom_prompt + load_data 
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
    <<SYS>>
    You are a bot who is professional at inferring a candidate's age based on the available data given to you.
    <<SYS>>

    [INST]
    Your job is to infer the candidate's age and add in your confidence when it comes to the data inferred.
    Your ouput should only be a json object, you are provided with an example of a json object you'll be returning.
    Plug in the datas as values in this json object and remember to only return me a json object, nothing else.
    Please follow the json object format provided to you and only return a json object.
    Also, the date in the candidate data is in epoch timestamp.
    Do not provide any kind of explanation or example data. I only need the json object with the values inserted.
    
    
    Data: 
    {candidate_data}

    Current Date: 
    {current_date}

    Json Format:
    {{"Age": (insert here the inferred age of the candidate base on the data given to you), "confidence": (AI's confidence in inferring the data 1-5, 5 being the highest),}}

    Only return me a json object, no explanation, no sample data, no nothing, just the json data with values inserted in it.

    [/INST]

    """

    json_format = """
    {{"Age": (insert here the inferred age of the candidate base on the data given to you), "confidence": (AI's confidence in inferring the data 1-5, 5 being the highest),}}
    """
    query = load_data 
    prompt = PromptTemplate(template=query, input_variables=["candidate_data", "custom_prompt", "current_date"])
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=False)
    llm.model_kwargs = {
        "temperature": 0,
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
    <<SYS>>
    You are a bot who is professional at inferring a candidate's location based on the available data given to you.
    <<SYS>>

    [INST]
    Your job is to infer the candidate's location and add in your confidence when it comes to the data inferred.
    Your ouput should only be a json object, you are provided with an example of a json object you'll be returning.
    Plug in the datas as values in this json object and remember to only return me a json object, nothing else.
    Please follow the json object format provided to you and only return a json object.
    Please do not provide any kind of explanation on how you got the data or example data. I only need the json object with the values inserted.
    Only return me a json object, thats your job.
    
    
    Data: 
    {candidate_data}

    Current Date: 
    {current_date}

    Json Format:
    {{"Location":( insert here the inferred location of the candidate base on the data given to you ),"confidence":( AI's confidence in inferring the data 1-5, 5 being the highest)}}
    
    Only return me a json object, no explanation, no sample data, no nothing, just the json data with values inserted in it.
    [/INST]

    """

    json_format= """
    Don't add an explanation only send back the json data
    Please follow the json format provided below and only return the json data

    {
        "Location":  '( insert here the inferred location of the candidate base on the data given to you )',
        "confidence": ( AI's confidence in inferring the data 1-5, 5 being the highest)
    }
    """
    query = custom_prompt + load_data
    prompt = PromptTemplate(template=query, input_variables=["candidate_data", "current_date"])
    params = {"candidate_data":candidate_data, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=False)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(params)
    try:
        return eval(response)
    except:
        return json.loads(response)