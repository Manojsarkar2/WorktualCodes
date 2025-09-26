import streamlit as st
import requests
import json
import PyPDF2
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def pdf_to_text(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ''
    for page_num in range(len(pdf_reader.pages)):
        page = pdf_reader.pages[page_num]
        text += page.extract_text()
    return text
    
def flatten_json(json_obj):
    """
    Recursively flatten a nested JSON object.
    """
    flattened = {}
    if isinstance(json_obj, dict):
        for key, value in json_obj.items():
            if isinstance(value, dict):
                flattened.update(flatten_json(value))
            elif isinstance(value, list):
                for i, item in enumerate(value):
                    if isinstance(item, dict):
                        flattened.update(flatten_json(item))
                    else:
                        flattened[f"{key}_{i}"] = str(item)  # Convert non-dict items to strings
            else:
                flattened[key] = str(value)  # Convert non-dict items to strings
    else:
        flattened = {'text': str(json_obj)}  # Assuming the input is a single text string
    return flattened
 
def calculate_similarity(job_description, resume_text):
    # Assuming job_description and resume_text are dictionaries with 'content' key containing the actual text
    job_text = " ".join(flatten_json(job_description).values())
    resume_text = " ".join(flatten_json(resume_text).values())
    cv = CountVectorizer()
    content = [job_text, resume_text]
    matrix = cv.fit_transform(content)
    similarity_matrix = cosine_similarity(matrix)
    match_percentage = similarity_matrix[0][1] * 100
    match_percentage = round(match_percentage, 2)
    return match_percentage

def hit_vllm_model(prompt, sampling_params):
    url = "http://46.43.144.145:8056/generate"
    payload = {
        "prompt": prompt,
        "stream": False
    }
    payload.update(sampling_params)  
    response = requests.post(url=url, json=payload)
    response_data = response.json()
    output = response_data["text"][0]
    return output

def Pdf_to_CV_extract(user_input):
    temp ="""###system
You are a helpful assistant. your task is find the information from the text which the text is extracted from the resume.
Return the output in JSON format to parse the details.

The details you have to collect from the text:

1.NAME
2.EMAIL
3.EXPERIENCE
4.SKILLS
5.EDUCATION
6.PROJECTS
7.OBJECTIVE
8.ACHIEVEMENTS

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.1,
        "top_p" : 0.95,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")

def analys_CV(experience, skills, education):
    user_input = f"""
    ### EXPERIENCE:
    {experience}
    
    ### SKILLS:
    {skills}
    
    ### EDUCATION:
    {education}
    """
    temp ="""###system
    As a helpful CV creator assistant, Your task is to make a best CV based on the provided details of the user's details and make a rephrase.
  

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.4,
        "top_p" : 0.95,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")

def Pdf_to_jd_extract(pdf_text):
    temp ="""###system
You are a helpful assistant. your task is find the information from the text which the text is extracted from the jobdescription.
Return the output in JSON format to parse the details.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
    "temperature" : 0.4,
    "top_p" : 0.95,
    "max_tokens" : 4096,

    }

    input_prompts = temp.format(input=pdf_text)

    intent_anse = hit_vllm_model(input_prompts,sampling_params=sampling_params)
    return intent_anse.replace(input_prompts,"")
 
def analys_CV_1(CV):
    user_input = f"""
    ### WORK_EXPERIENCE:
    {CV}
    
    """
    temp ="""###system
    As a helpful CV creator assistant, Your task is to make best CV by rephrase
    the based on the given experience,skill and education.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.4,
        "top_p" : 0.95,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")

def matching_jd_cv(CV,JD):
    user_input = f"""  
    ### Curriculum Vitae:
    {CV}
    
    ### job description:
    {JD}

    """
    temp ="""###system
You are a helpful assistant. Your task is to create a perfect CV by analyzing the given job description (JD). Tailor the resume to best fit the requirements and qualifications outlined in the job description.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.4, 
        "top_p" : 0.95,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")

# Streamlit UI
st.title("Resume Matcher")

# Sidebar
st.sidebar.title("Upload Files")
cv_file = st.sidebar.file_uploader("Upload CV", type=["pdf"])
jd_file = st.sidebar.file_uploader("Upload Job Description", type=["pdf"])

# Main content
if cv_file and jd_file:
    pdf_text = pdf_to_text(cv_file)
    cv_data = Pdf_to_CV_extract(pdf_text)
    try:
     response_dict_1 = json.loads(cv_data)
    except json.JSONDecodeError:
     response_dict_1 = {}

    pdf_text = pdf_to_text(jd_file)
    JD_data = Pdf_to_jd_extract(pdf_text)
    try:
     response_dict = json.loads(JD_data)
     json.dumps(response_dict),
    except json.JSONDecodeError:
     response_dict = {}
 
    rephrase_cv = analys_CV(response_dict_1.get("EXPERIENCE"), response_dict_1.get("SKILLS"), response_dict_1.get("EDUCATION"))
    st.write("Matching CV:", rephrase_cv)
    rephrase_cv_1 = analys_CV_1(cv_data)
    st.write("Matching CV_1:", rephrase_cv_1)

    compare_cv_jd_matcher=matching_jd_cv(cv_data,response_dict)   

    compare_cv_jd_similarity= calculate_similarity(response_dict, compare_cv_jd_matcher)
    st.write(":blue[compare_cv_jd_similarity]", compare_cv_jd_similarity)

    normal_cv_jd_similarity = calculate_similarity(response_dict_1, response_dict)
    st.write(":blue[normal_cv_jd_similarity]", normal_cv_jd_similarity)

    best_cv_jd_similarity = calculate_similarity(rephrase_cv, response_dict)
    st.write(":blue[best_cv_jd_similarity]:", best_cv_jd_similarity)
    
    best_new = calculate_similarity(rephrase_cv_1, response_dict)
    st.write(":blue[best_new]", best_new)