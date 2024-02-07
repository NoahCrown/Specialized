import os
from langchain_community.llms.deepinfra import DeepInfra
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from dotenv import load_dotenv
import fitz
import json
from PyPDF2 import PdfReader
from langdetect import detect

def parse_json_with_autofix(json_str):
    try:
        return eval(json_str)
    except Exception as e:
        if "Expecting ',' delimiter" in str(e) or "Expecting ']' delimiter" in str(e) or "SyntaxError(\"'\{\' was never closed)\"":
            try:
                fixed_json_str = json_str.rstrip() + '}'
                return eval(fixed_json_str)
            except Exception as e:
                raise ValueError("Could not fix JSON string") from e
        else:
            raise

def extract_cv(pdf_file):
    load_dotenv()
    os.environ["DEEPINFRA_API_TOKEN"] = os.getenv('DEEPINFRA_API_TOKEN')
    # pdf_reader = PdfReader(pdf_file)
    # text = ""

    # for page in pdf_reader.pages:
    #     text += page.extract_text()
    doc = fitz.open(pdf_file)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()

    lang = detect(text)

    init_query_translation = '' if lang == 'en' else f'Suppose you are a {lang} to English translator and the document is in {lang} texts, can you translate it so that you can extract the data and read it without giving me an output of translated texts and then'

    candidate_query = """
        <<SYS>>
        You are a bot who is professional at extracting candidate data from a candidate's resume.
        <<SYS>>
        [INST]
        This is a CV containing candidate's information: {text}
        Follow this format and insert the proper information as values. 
        Do not copy the example values given to you. If you cannot find the value, just put 'None' as the value and don't put the example value provided in the example json:(Only send me/ return the data list and nothing else).
        Be accurate with the data. For example, in the address don't put in the address if it is not totally clear for you to identify. Just put "None" as the value, if so.
        You should return a valid dictionary following the format below. Remember to plug in the datas as value.
            
            {{
                'certifications': '(Certification of the candidate)',
                'comments': '(Comments about the candidate)',
                'dateOfBirth': '(Date of birth of the candidate according to the cv. Do not infer the data. just put in what you see in the cv/resume)',
                'educationDegree': '(Education Degree of the candidate)',
                'email': '(Email of the candidate)',
                'ethnicity': '(Ethnicity of the candidate)',
                'firstName': '(First name of the candidate)',
                'id': (Give an id to the user example is 334560, do not copy the id),
                'lastName': '(Last name of the candidate)',
                'phone': '(Phone number of the candidate)',
                'primarySkills': {{ 'data': [ '(Primary Skills of the candidate)' ], 'total': (Total primary skills of the candidate) }},
                'secondarySkills': {{ 'data': [ '(Secondary Skills of the candidate)' ], 'total': (Total secondary skills of the candidate) }},
                'skillSet': (SkillSets of the candidate),
                'specialties': {{ 'data': [ '(Specialties of the candidate)' ], 'total': (Total specialties of the candidate) }}
            }}
        Again, do not copy and paste the values. If you cannot find or undentify the value or keys just put the value as None.
        [/INST]
    """

    query = init_query_translation + candidate_query
    prompt = PromptTemplate(template=query, input_variables=["text"])
    llm = DeepInfra(model_id = "meta-llama/Llama-2-70b-chat-hf", verbose=True)
    llm.model_kwargs = {
        "temperature": 0
    }
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response_candidate = llm_chain.run(text)
    json_start = response_candidate.find('{')
    json_end = response_candidate.rfind('}') + 1

    response = response_candidate[json_start:json_end]
    print(eval(response))

    # response = parse_json_with_autofix(response)

    workhistory_query = """
        <<SYS>>
        You are a bot who is professional at extracting candidate's work history data from a candidate's resume.
        <<SYS>>
        
        [INST]
        This is a CV containing candidate's information: {text}
        Follow this format and insert the proper information as values. 
        Do not copy the example values given to you. If you cannot find the value, just put 'None' as the value and don't put the example value provided in the example json:(Only send me/ return the data list and nothing else).
        Be accurate with the data. For example, in the address don't put in the address if it is not totally clear for you to identify. Just put None as the value, if so.
        You should return a valid dictionary following the format below. Remember to plug in the datas as value. Remember to put all of the work history available.
            
            {{"workHistory": [{{
                                'comments': '(insert here candidate's work description)',
                                'companyName': '(insert here candidate's company name of the work in candidate's work history)',
                                'endDate': (insert here end date of work experience in epoch timestamp),
                                'id': (insert here the candidate's work experience ID),
                                'isLastJob': '(insert here Is this candidate's last job if yes True, if not False)',
                                'jobOrder': None,
                                'startDate': '(insert here Start date of work history the candidate work's history )',
                                'title': '(insert here the candidate's work title in his last job)'}}]}}
        Again, do not copy and paste the values. If you cannot find or undentify the value or keys just put the value as None.
        [/INST]

    """

    workhistory_query = init_query_translation + workhistory_query
    prompt = PromptTemplate(template=workhistory_query, input_variables=["text"])
    llm_chain = LLMChain(prompt=prompt, llm=llm)
    response_workhistory = llm_chain.run(text)
    json_start = response_workhistory.find('{')
    json_end = response_workhistory.rfind('}') + 1

    response = response_workhistory[json_start:json_end]
    print(response_workhistory)
    print(eval(response))

    # response = parse_json_with_autofix(response)

    response = [response_candidate, response_workhistory]

    return response