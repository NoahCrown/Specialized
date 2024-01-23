import os
import replicate
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langdetect import detect

def extract_cv(pdf_file):
    load_dotenv()
    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    pdf_reader = PdfReader(pdf_file)
    text = ""

    for page in pdf_reader.pages:
        text += page.extract_text()

    lang = detect(text)

    cv_query = f"This is a CV containing candidate's information: {text}"

    init_query_translation = '' if lang == 'en' else f'Suppose you are a {lang} to English translator and the document is in {lang} texts, can you translate it so that you can extract the data and read it without giving me an output of translated texts and then'

    candidate_query = '''
        Follow this format and insert the proper information as values. 
        Do not copy the example values given to you. If you cannot find the value, just put 'None' as the value and don't put the example value provided in the example json:(Only send me/ return the data and nothing else).
        Be accurate with the data. For example, in the address don't put in the address if it is not totally clear for you to identify. Just put "None" as the value, if so.
        Do not put "null" as the value. Remember to put in "None" if the value is missing.
            {
                "candidateId": 51,
                "address": {
                    "address1": (The candidate's street/block where the candidate resides),
                    "address2": (The candidate's house number),
                    "city": (The candidate's city where he/she resides),
                    "state": (The State the candidate resides)
                }
                "first_name": "The first name of the candidate in the candidate's information",
                "last_name": "The last name of the candidate in the candidate's information",
                "phone": "Phone number of the candidate",
                "dateOfBirth": "Date of birth of the candidate",
                "certification":"Certification/s of the candidate",
                "ethnicity": "Ethnicity of the candidate",
                "primarySkills": "Skills stated in the candidate's information separated by comma per skill",
                "educationDegree": "Education degree accomplished by the candidate",
                "comments": None,
                "specialties": "Specialties of the candidate",
                "workHistory": [
                {
                "startDate": "start month/date of candidate's work",
                "endDate": "end month/date of candidate's work",
                "companyName": "candidate's work company",
                "title": "Candidate's title in the said work",
                "islastJob": "Is this candidate's last job? If so put True if not put False"
                }
                ]
        }

        Again, do not copy and paste the values. If you cannot find or undentify the value or keys just put the value as None.
    '''

    query = cv_query + init_query_translation + candidate_query
    response = api.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": "You are a bot that answers in JSON format",
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    return eval(response)