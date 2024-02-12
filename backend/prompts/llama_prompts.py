import os
import json
from langchain_community.llms.deepinfra import DeepInfra
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.pydantic_v1 import BaseModel, Field, EmailStr
from typing import List, Optional, Literal, Union
from dotenv import load_dotenv

class EnglishProficiency(BaseModel):
    Language: Literal["English"] = Field(default="English", description="The language is English.")
    enProficiency: Literal['None', 'Basic', 'Conversational', 'Business', 'Fluent', 'Native'] = Field(..., description="Inferred proficiency of the candidate in English.")
    confidence: int = Field(..., ge=1, le=5, description="AI's confidence in inferring the data, 1 being the lowest and 5 the highest")

class JapaneseProficiency(BaseModel):
    Language: Literal["Japanese"] = Field(default="Japanese", description="The language is Japanese.")
    jpProficiency: Literal['None', 'Basic', 'Conversational', 'Business', 'Fluent', 'Native'] = Field(..., description="Inferred proficiency of the candidate in Japanese.")
    confidence: int = Field(..., ge=1, le=5, description="AI's confidence in inferring the data, 1 being the lowest and 5 the highest")

class LanguageProficiency(BaseModel):
    languageSkills: List[Union[EnglishProficiency, JapaneseProficiency]] = Field(..., description="Inferred proficiency of the candidate in English and Japanese")

class AgeInference(BaseModel):
    Age: int = Field(..., description="Inferred age of the candidate")
    confidence: int = Field(..., ge=1, le=5, description="AI's confidence in inferring the data, 1 being the lowest and 5 the highest")

class LocationInference(BaseModel):
    Location: str = Field(..., description="Inferred location of the candidate")
    confidence: int = Field(..., ge=1, le=5, description="AI's confidence in inferring the location, 1 being the lowest and 5 the highest")

def language_skill(candidate_data, custom_prompt, parser = LanguageProficiency):
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

    Format instructions:
    {format_instructions}

    Answer:
    [/INST]
    
"""
    query = load_data
    language_parser = JsonOutputParser(pydantic_object=parser)
    prompt = PromptTemplate(template=query, input_variables=["custom_prompt","candidate_data"],partial_variables={"format_instructions": language_parser.get_format_instructions()})
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = prompt | llm | language_parser
    response = llm_chain.invoke(params)
    return response

def infer_age(candidate_data, custom_prompt, current_date, parser = AgeInference):
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

    Format instructions:
    {format_instructions}

    Answer:
    [/INST]

    """
    query = load_data
    age_parser = JsonOutputParser(pydantic_object=parser)
    prompt = PromptTemplate(template=query, input_variables=["candidate_data", "custom_prompt", "current_date"], partial_variables={"format_instructions": age_parser.get_format_instructions()})
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=False)
    llm.model_kwargs = {
        "temperature": 0,
    }
    llm_chain = prompt | llm | age_parser
    response = llm_chain.invoke(params)
    return response
    
def infer_location(candidate_data, custom_prompt, current_date, parser = LocationInference):
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

    Format instructions:
    {format_instructions}

    Answer:
    [/INST]

    """
    query = load_data
    location_parser = JsonOutputParser(pydantic_object=parser)
    prompt = PromptTemplate(template=query, input_variables=["candidate_data","custom_prompt", "current_date"], partial_variables={"format_instructions": location_parser.get_format_instructions()})
    params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=False)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = prompt | llm | location_parser
    response = llm_chain.invoke(params)
    return response