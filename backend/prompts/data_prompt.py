LANGUAGE_SKILLS_PROMPT = """
You are provided with a candidate json data and a custom prompt. Your job is to infer the candidate's language proficiency in english and japanese using the given candidate's data
Return only the JSON File

Data:
{candidate_data}

Instruction:
{custom_prompt}

JSON Format:
]
{{"Language": English,
"enProficiency": ( insert here how proficient the candidate is in english ranging from None/Basic/Conversational/Business/Fluent/Native)),
"confidence: ( insert confidence level here from 1 -5, 1 being the lowest),
}},
{{"Language": Japanese,
"enProficiency": ( insert here how proficient the candidate is in japanese ranging from None/Basic/Conversational/Business/Fluent/Native)),
"confidence: ( insert confidence level here from 1 -5, 1 being the lowest),
}},
]


"""
AGE_INFERENCE_PROMPT = """
you are given this json data

Data:
{candidate_data}

your job is to infer the age of the candidate based on the date given to you. you can use his/her birthday, if those are not available you can rely on his/her job history or year of graduation. add a confidence level to see how confident you are with inferring the age data
I'll also provide you a date, give me the age of the candidate base of this date.
only return The JSON File with the format below nothing else

Current Date:
{current_date}

{{
"Age": ( insert inferred age here ),
"confidence: ( insert confidence level here from 1 -5, 1 being the lowest)
}}
"""