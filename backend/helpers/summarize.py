import os
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from prompts.data_prompt import LANGUAGE_SKILLS_PROMPT, AGE_INFERENCE_PROMPT, CURRENT_LOCATION_INFERENCE_PROMPT
import datetime


def summarize_data(candidate_data, custom_prompt, infer_data):
    #Change openai_api_key
    candidate_data = str(candidate_data)
    load_dotenv()
    llm = ChatOpenAI(openai_api_key= os.getenv("OPENAI_API_KEY"), model="gpt-3.5-turbo-16k-0613", temperature=0)
    current_date = datetime.date.today()

    if infer_data == "age":
        infer_template = AGE_INFERENCE_PROMPT
        infer_var = ["candidate_data", "custom_prompt", 'current_date']
        params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    elif infer_data == "languageSkills":
        infer_template = LANGUAGE_SKILLS_PROMPT
        infer_var = ["candidate_data", "custom_prompt"]
        params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt}
    elif infer_data == "location":
        infer_template = CURRENT_LOCATION_INFERENCE_PROMPT
        infer_var = ["candidate_data", "custom_prompt", 'current_date']
        params = {"candidate_data":candidate_data, "custom_prompt": custom_prompt, "current_date": current_date}
    prompt_template = PromptTemplate(
        input_variables= infer_var,
        template= infer_template
    )
    chain = LLMChain(llm=llm,prompt=prompt_template)
    response = chain.run(params)
    return eval(response)