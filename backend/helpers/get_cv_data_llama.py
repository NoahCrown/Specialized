import os
import replicate
from dotenv import load_dotenv
import fitz
from PyPDF2 import PdfReader
from langdetect import detect

def extract_cv(pdf_file):
    load_dotenv()
    api = replicate.Client(api_token=os.environ["REPLICATE_API_TOKEN"])
    # pdf_reader = PdfReader(pdf_file)
    # text = ""

    # for page in pdf_reader.pages:
    #     text += page.extract_text()
    temp_path = '/Specialized/backend/temp.pdf'
    doc = fitz.open(temp_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()

    lang = detect(text)

    cv_query = f"This is a CV containing candidate's information: {text}"

    init_query_translation = '' if lang == 'en' else f'Suppose you are a {lang} to English translator and the document is in {lang} texts, can you translate it so that you can extract the data and read it without giving me an output of translated texts and then'

    candidate_query = '''
        Follow this format and insert the proper information as values. 
        Do not copy the example values given to you. If you cannot find the value, just put 'None' as the value and don't put the example value provided in the example json:(Only send me/ return the data list and nothing else).
        Be accurate with the data. For example, in the address don't put in the address if it is not totally clear for you to identify. Just put "None" as the value, if so.
        You should return a list of dictionary. Remember to plug in the datas as value.
        Please return only the JSON data
            
                [{
                'certifications': '(Certification of the candidate)',
                'comments': '(Comments about the candidate)',
                'dateOfBirth': '(Date of birth of the candidate according to the cv. Do not infer the data. just put in what you see in the cv/resume)',
                'educationDegree': (Education Degree of the candidate),
                'email': '(Email of the candidate)',
                'ethnicity': '(Ethnicity of the candidate)',
                'firstName': '(First name of the candidate)',
                'id': (Give an id to the user example is 334560, do not copy the id),
                'lastName': '(Last name of the candidate)',
                'phone': '(Phone number of the candidate)',
                'primarySkills': { 'data': [ (Primary Skills of the candidate) ], 'total': (Total primary skills of the candidate) },
                'secondarySkills': { 'data': [ (Secondary Skills of the candidate) ], 'total': (Total secondary skills of the candidate) },
                'skillSet': (SkillSets of the candidate),
                'specialties': { 'data': [ (Specialties of the candidate) ], 'total': (Total secondary skills of the candidate)}
                },
                {
                'comments': '(Comments about the work history)',
                'companyName': '(Company name of the work in candidate's work history)',
                'endDate': (end date of work experience in epoch timestamp),
                'id': (Work experience ID),
                'isLastJob': '(Is this candidate's last job if yes True, if not False)',
                'jobOrder': None,
                'startDate': '(Start date of work history the candidate work's history )',
                'title': '(candidate's work title in his last job)'
                }]
            

        Again, do not copy and paste the values. If you cannot find or undentify the value or keys just put the value as None.
    '''

    query = cv_query + init_query_translation + candidate_query
    response = api.run("meta/llama-2-70b-chat",
                input={
                    "prompt": query,
                    "system_prompt": "You are a bot that answers or returns data in JSON format",
                    "max_new_tokens": 4060,
                    "temperature": 0.01
                    }
            )
    response = ''.join(response)
    json_start = response.find('[')
    json_end = response.rfind(']') + 1

    response = response[json_start:json_end]
    return eval(response)