LANGUAGE_SKILL_BASE_PROMPT = """
You are provided with a candidate json data and a custom prompt. Your job is to infer the candidate's language proficiency in english and japanese using the given candidate's data.
Please follow the JSON format provided below and return only the JSON data.
"""

AGE_BASE_PROMPT = """
your job is to infer the age of the candidate based on the date given to you. you can use his/her birthday, if those are not available you can rely on his/her job history or year of graduation. add a confidence level to see how confident you are with inferring the age data
"""

LOCATION_BASE_PROMPT = """
 i'm gonna give you a candidate's data, your job is to infer the location of that candidate using his/her work experience, phone number area code and ethinicity
"""