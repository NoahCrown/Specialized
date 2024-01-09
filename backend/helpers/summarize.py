import os
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

def summarize_data(candidate_data, custom_prompt):
    #Change openai_api_key
    candidate_data = str(candidate_data)
    load_dotenv()
    llm = ChatOpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"), model="gpt-3.5-turbo-16k-0613", temperature=0)
    prompt_template = PromptTemplate(
        input_variables= ["candidate_data", "custom_prompt"],
        template="""
        You are provided with a candidate json data and a custom prompt. Your job is to follow the instruction from the custom prompt
        to extract selected data from the candidate data and return a json following. Only provide the selected data from the custom prompt and do not send back the other datas  but if the custom prompt is empty provide everything. 
        Follow the json format below and only return the json.

        Data:
        {candidate_data}

        Instruction:
        {custom_prompt}

        JSON Format:
        {{
                {{
                    certification: candidate's ceritification,
                    comments: 'comments about the candidate',
                    dateOfBirth: 'date of birth of the candidate',
                    educationDegree: 'educational degree of the candidate',
                    ethnicity: 'candidate's ethnicity',
                    first_name: 'candidate's first name',
                    id: candidate's id,
                    last_name: 'candidate's last name',
                    phone: 'candidate's phone number',
                    primarySkills: 'candidate's primary skill',
                    specialties: 'candidate's specialities',
                    inferred_age: candidate's inferred age based on year graduated if date of birth is unavailable,
                    inferred_age_ai_confidence: 'confidence of ai on how accurate the inferred age is'
  }}
        }}

        
                
                .
            """
    # template="""
    #     You are provided with the following data:
    #     {candidate_data}
    #     Follow this instruction:
    #     {custom_prompt}
    #     Summarize and format the given data to make it look like a Resume.
    # """

    

    
    )
    chain = LLMChain(llm=llm,prompt=prompt_template)
    response = chain.run({"candidate_data":candidate_data, "custom_prompt": custom_prompt})
    return response