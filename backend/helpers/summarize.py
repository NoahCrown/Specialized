import os
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from prompts.data_prompt import LANGUAGE_SKILLS_PROMPT, AGE_INFERENCE_PROMPT

def summarize_data(candidate_data, custom_prompt, infer_data):
    #Change openai_api_key
    candidate_data = str(candidate_data)
    load_dotenv()
    llm = ChatOpenAI(openai_api_key= os.getenv("OPENAI_API_KEY"), model="gpt-3.5-turbo-16k-0613", temperature=0)
    if infer_data == "age":
        infer_template = AGE_INFERENCE_PROMPT
    elif infer_data == "languageSkills":
        infer_template = LANGUAGE_SKILLS_PROMPT
    prompt_template = PromptTemplate(
        input_variables= ["candidate_data", "custom_prompt"],
        template= infer_template
    )
    chain = LLMChain(llm=llm,prompt=prompt_template)
    response = chain.run({"candidate_data":candidate_data, "custom_prompt": custom_prompt})
    return response