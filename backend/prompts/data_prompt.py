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

{
    address: {
      city: 'New Preciousmouth',
      country: 'Mayotte',
      street: '337 Hintz Unions Apt. 294'
    },
    certification: 'bogisich.com',
    education_history: { date_graduated: '2000-08-10 10:15:28.000000', school: 'Montana' },
    email: null,
    fullname: 'May Wiza',
    id: 1,
    job_history: {
      company: 'Dare-Stiedemann',
      date_entered: '2021-12-16 21:27:27.000000',
      date_retired: '2004-02-07 10:17:48.000000',
      'job position': 'Project Manager'
    },
    phone: '+7057457943930'
  }

your job is to infer the age of the candidate based on the date given to you. you can use his/her job history, year of graduation, or birthday to infer his/her age. add a confidence level to see how confident you are with inferring the age data

only return a json file like this
{
"Age": ( insert inferred age here ),
"confidence: ( insert confidence level here from 1 -5, 1 being the lowest)
}
"""