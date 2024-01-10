LANGUAGE_SKILLS_PROMPT = """
You are provided with a candidate json data and a custom prompt. Your job is to follow the instruction from the custom prompt
to extract selected data from the candidate data and return a json following. Only provide the selected data from the custom prompt and do not send back the other datas  but if the custom prompt is empty provide everything. 
Follow the json format below and only return the json.

Data:
{candidate_data}

Instruction:
{custom_prompt}

JSON Format:
{{
        personal_info:{{
            'first_name': candidate's first name,
            'last_name;:candidate's last name,
            'phone_num':candidate's phone number,
            'address':candidate's address
        }},
        job_history:{{
            'position':candidate's position at job,
            'summary':[candidate's achievements in the said job],
        }},
        certificates:{{
            'title':title of the certificate,
            'website:website of the certificate,
        }},
        education:{{
            'university':candidate's university,
            'year_graduated:candidate's year of graduation,
            'course':candidate's course
        }}
}}

"""
AGE_INFERENCE_PROMPT = """
you are given this json data

Data:
{candidate_data}

your job is to infer the age of the candidate based on the date given to you. you can use his/her birthday, if those are not available you can rely on his/her job history or year of graduation. add a confidence level to see how confident you are with inferring the age data

only return The JSON File with the format below nothing else

{{
"Age": ( insert inferred age here ),
"confidence: ( insert confidence level here from 1 -5, 1 being the lowest)
}}
"""