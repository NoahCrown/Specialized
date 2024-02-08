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
    {custom_prompt}
    
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
    query = load_data 
    prompt = PromptTemplate(template=query, input_variables=["custom_prompt","candidate_data"])
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(params)
    json_start = response.find('[')
    json_end = response.rfind(']') + 1

    response = response[json_start:json_end]
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
    {custom_prompt}
    
    
    Data: 
    {candidate_data}

    Current Date: 
    {current_date}

    Json Format:
    {{"Age": (insert here the inferred age of the candidate base on the data given to you), "confidence": (AI's confidence in inferring the data 1-5, 5 being the highest),}}

    Only return me a json object, no explanation, no sample data, no nothing, just the json data with values inserted in it.

    [/INST]

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
    json_start = response.find('{')
    json_end = response.rfind('}') + 1

    response = response[json_start:json_end]
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
    {custom_prompt}
    
    Data: 
    {candidate_data}

    Current Date: 
    {current_date}

    Json Format:
    {{"Location":( insert here the inferred location of the candidate base on the data given to you ),"confidence":( AI's confidence in inferring the data 1-5, 5 being the highest)}}
    
    Only return me a json object, no explanation, no sample data, no nothing, just the json data with values inserted in it.
    [/INST]

    """
    query = custom_prompt + load_data
    prompt = PromptTemplate(template=query, input_variables=["candidate_data","custom_prompt", "current_date"])
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=False)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response = llm_chain.run(params)
    json_start = response.find('{')
    json_end = response.rfind('}') + 1

    response = response[json_start:json_end]
    try:
        return eval(response)
    except:
        return json.loads(response)