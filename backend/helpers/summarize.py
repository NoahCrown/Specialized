from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain

def summarize_data(candidate_data):
    #Change openai_api_key
    llm = ChatOpenAI(openai_api_key="...", model="gpt-3.5-turbo-16k-0613", temperature=0)
    prompt_template = PromptTemplate(
        input_variables= ["candidate_data"],
        template="""
        You are provided with the following data:
        {candidate_data}

        Summarize and format the given data to make it look like a Resume.
    """
    )
    chain = LLMChain(llm=llm,prompt=prompt_template)
    response = chain.run({"candidate_data":candidate_data})
    return response
