import os
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv

def summarize_data(candidate_data, custom_prompt):
    #Change openai_api_key
    load_dotenv()
    llm = ChatOpenAI(openai_api_key= os.getenv("OPENAI_API_KEY"), model="gpt-3.5-turbo-16k-0613", temperature=0)
    prompt_template = PromptTemplate(
        input_variables= ["candidate_data", "custom_prompt"],
        template="""
        You are provided with the following data:
        {candidate_data}
        Follow this instruction:
        {custom_prompt}
        Summarize and format the given data to make it look like a Resume.
    """

    # template="""
    #     You are provided with the following data:
    #     {candidate_data}
    #     Use the following instruction as guide:
    #     {custom_prompt}
    #     Summarize and format the given data in tailwind in this format
    #     "
    #     <div className=' no-scrollbar w-[37.5%] bg-[#F5F5F5] flex  p-6 flex-col gap-4 mb-4 overflow-scroll h-[100vh] border-r-2 border-solid border-[#D1D5DB]'>
    #     <h1 className='text-3xl font-bold'>Output</h1>
    #     <p className='text-[#919191]'>Resume information</p>
    #     {/* Personal Information  */}
    #     <div className='text-[#919191]'>
    #         <p className='text-black py-2'>Personal Information</p>
    #         <p>First Name: First name of the resume owner</p>
    #         <p>Last Name: Last name of the resume owner</p>
    #         <p>Phone: Resume owner's phone number</p>
    #         <p>Address: Resume owner's address</p>
    #     </div>
    #     {/* Job History  */} The job history of the resume owner
    #     <div className='text-[#919191]'>
    #         <p className='text-black py-2'>Job History</p>
    #         <WorkDescription
    #             position='Senior Graphic Designer | ABC Design Studio, City, State | [Month/Year] - [Month/Year]'
    #             achievements={['Conceptualized and designed visual materials for diverse projects, including branding, marketing collateral, and digital campaigns.',
    #                             'Mentored junior designers, fostering a collaborative and creative work environment.',
    #                             'Received recognition for outstanding design work in industry publications.']}
    #         />
    #         <WorkDescription 
    #         position='Creative Lead | XYZ Agency, City, State | [Month/Year] - Present'
    #         achievements={['Led a creative team in developing and executing innovative design concepts for various clients, resulting in a 20% increase in client satisfaction.',
    #                        'Collaborated with clients to understand their brand vision and developed creative strategies to meet their objectives.',
    #                         'Spearheaded the redesign of the company website, resulting in a 30% increase in user engagement.']} />

    #         * Add more such as education, certification if relevant to the data provided. Send out a format just like this so i can use your output in a react component.
    #     </div>
    # </div>
    #     "
        
    #     .
    # """
    )
    chain = LLMChain(llm=llm,prompt=prompt_template)
    response = chain.run({"candidate_data":candidate_data, "custom_prompt": custom_prompt})
    return response