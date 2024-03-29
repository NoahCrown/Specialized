import os
import json
import replicate
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langdetect import detect

def extract_cv(pdf_file):
    load_dotenv()
    pdf_reader = PdfReader(pdf_file)
    text = ""

    for page in pdf_reader.pages:
        text += page.extract_text()

    lang = detect(text)

    cv_query = f"This is a CV containing candidate's information: {text}"

    init_query_translation = '' if lang == 'en' else f'Suppose you are a {lang} to English translator and the document is in {lang} texts, can you translate it so that you can extract the data and read it without giving me an output of translated texts and then'

    candidate_query = '''
        Follow this format and insert the proper information as values. Do not copy the value. If empty, just put 'none' as the value:(Only send me/ return the data and nothing else).
        {{
            "candidate": {{
                "candidateId": 51,
                "address": {{
                    "address1": "The street/block where the candidate resides",
                    "address2": "House number of the candidate",
                    "city": "The city where the candidate resides",
                    "state": "State where the candidate resides"
                }}
                "first_name": "The first name of the candidate in the candidate's information",
                "last_name": "The last name of the candidate in the candidate's information",
                "phone": "Phone number of the candidate",
                "dateOfBirth": "Date of birth of the candidate",
                "certification":"Certification/s of the candidate",
                "ethnicity": "Ethnicity of the candidate",
                "primarySkills": "Skills stated in the candidate's information",
                "educationDegree": "Education degree accomplished by the candidate",
                "comments": None,
                "specialties": "Specialties of the candidate",
                "workHistory": [
                {{
                "startDate": "start month/date of candidate's work",
                "endDate": "end month/date of candidate's work",
                "companyName": "candidate's work company",
                "title": "Candidate's title in the said work",
                "islastJob": "Is this candidate's last job? If so put true if not put false"
                }},
                ( Add more work history if relevant)
                ]
                
            }}
        }}
    '''

    query = cv_query + init_query_translation + candidate_query
    response = replicate.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": "You are a bot that answers in JSON format",
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    return eval(response)