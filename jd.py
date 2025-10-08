import streamlit as st
import requests
import json
import PyPDF2
import smtplib
from email.mime.text import MIMEText
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

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
 

def ats_score_tfidf(cv_text, jd_text):

    documents = [cv_text, jd_text]

    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    score = similarity[0][0] * 100

    return round(score, 2)



def calculate_similarity(resume_text, job_description):
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


def send_email(sender, password, recipient, subject, body):
    
    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender
    msg["To"] = recipient
    print(msg)
   

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(sender, password)
        server.sendmail(sender, recipient, msg.as_string())


def Pdf_to_CV_extract(user_input):
    temp ="""###system
You are a helpful assistant. your task is find the information from the text which the text is extracted from the resume.


The details you have to collect from the text:

1.NAME
2.EMAIL
3.EXPERIENCE set if work experience text of title is present from the collected text else strictly leave it as empty string do not fill anything
4.SKILLS
5.EDUCATION
6.PROJECTS
7.OBJECTIVE,
8.ACHIEVEMENTS

Return the output strictly in **valid JSON** format with clear keys and properly formatted lists.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")


def create_jd(user_input):
    temp = """### System
You are a professional HR assistant and expert job description (JD) writer. 
Your task is to analyze the provided text and create a *complete and structured job description* (JD) in JSON format.

The JD should be clear, concise, and ready for direct use in a job posting or HR database.

### Instructions:
From the given text, extract and logically infer the following key details (if missing, make reasonable assumptions based on context):

1. JOB_TITLE – The title of the position.
2. DEPARTMENT – The team or department the role belongs to.
3. LOCATION – Work location or type (Remote/Hybrid/On-site).
4. JOB_TYPE – Full-time, Part-time, Contract, Internship, etc.
5. EXPERIENCE_REQUIRED – Range or level of experience needed.
6. EDUCATION – Minimum educational qualification.
7. SKILLS_REQUIRED – Technical and soft skills required.
8. JOB_SUMMARY – A short overview (3–4 lines) describing the purpose of the role.
9. ROLES_AND_RESPONSIBILITIES – A list of 6–10 key responsibilities.
10. QUALIFICATIONS – Key must-have criteria.
11. SALARY_RANGE – If mentioned or inferable.
12. COMPANY_NAME – If provided in the text.
13. BENEFITS – Perks, benefits, or advantages of the role.
14. EMPLOYMENT_MODE – Onsite / Remote / Hybrid.
15. APPLICATION_DEADLINE – If mentioned.
16. CONTACT_INFORMATION – Email, phone, or link to apply.

Return the output strictly in **valid JSON** format with clear keys and properly formatted lists.

### TEXT:
{input}

### Assistant:"""

    sampling_params = {
        "temperature": 0.7,
        "top_p": 0.3,
        "max_tokens": 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")


def Pdf_to_jd_extract(pdf_text):
    temp ="""###system
You are a helpful assistant. your task is find the information from the text which the textis extracted from the jobdescription.

Return the output strictly in **valid JSON** format with clear keys and properly formatted lists.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
    "temperature" : 0.7,
    "top_p" : 0.3,
    "max_tokens" : 4096,

    }

    input_prompts = temp.format(input=pdf_text)
    intent_anse = hit_vllm_model(input_prompts,sampling_params=sampling_params)
    return intent_anse.replace(input_prompts,"")

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
        "temperature" : 0.7, 
        "top_p" : 0.3,
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
    As a helpful CV creator assistant, your task is to make the best CV based on the provided details and rephrase them.
    - give it in human readable format like topic then content in points.


### TEXT: 
{input} 


### Assistant:"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")


def analys_CV2(skills, education):
    user_input = f"""
    
    ### SKILLS:
    {skills}
    
    ### EDUCATION:
    {education}
    """
    temp ="""###system
    As a helpful CV creator assistant, your task is to make the best CV of this fresher resume based on the provided details and rephrase them.
    - give it in readable format like topic then content in points.


### TEXT: 
{input} 


### Assistant:"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")


def analys_CV_1(CV):
    user_input = f"""
    ### Curriculum Vitae:
    {CV}
    
    """
    temp ="""###system
    As a helpful CV creator assistant, Your task is to make best CV by rephrase the details in points.
    the based on the given experience,skill and education and you do if any field is "" then leave it as (not mentioned) wont fill anything, dont put optional on empty.
    
    - give it in readable format like topic then content in points.
   
    
    

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    res = intent_anse.replace(input_prompts, "").replace("(Optional)","")
    # print(f"result : {res}")
    return res

def jd_json(user_input):

    temp ="""###system
You are a helpful assistant. your task is find the information from the text which the text is extracted from the job description.


The details you have to collect from the text:

1.COMPANY_NAME
2.COMPANY_EMAIL
3.JOB_TITLE

Return the output strictly in **valid JSON** format with clear keys and properly formatted lists.

### TEXT: 
{input} 

### Assistant:"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")

def job_recommend(user_input):
    temp = """### System
You are a **professional career recommendation assistant**. 
Your goal is to carefully read the candidate’s resume and recommend the **single most suitable job role** for them. 

### Instructions
- Always output in **valid JSON** format (no extra text, no explanations outside JSON).
- JSON must have exactly **two keys**:
  1. "JOB": A string with the best recommended job title.
  2. "REASONS": A list of 2-4 concise points, speaking directly to the candidate, each point highlighting a **key skill or strength** from their resume that supports the recommendation.
- Keep reasons short and motivating (one line each).
- Do not include markdown, commentary, or system text in the output — only JSON.

### Candidate Resume:
{input}

### Assistant:
"""

    sampling_params = {
        "temperature" : 0.7,
        "top_p" : 0.3,
        "max_tokens" : 4096,
    }

    input_prompts = temp.format(input=user_input)
    intent_anse = hit_vllm_model(input_prompts, sampling_params=sampling_params)
    return intent_anse.replace(input_prompts, "")


# Streamlit UI
st.title("Resume Matcher")

# Sidebar
st.sidebar.title("Upload Files")
cv_file = st.sidebar.file_uploader("Upload CV", type=["pdf"],accept_multiple_files = True)
jd_file = st.sidebar.file_uploader("Upload Job Description", type=["pdf"])

# Main content
if cv_file and jd_file:
    
    flag = int(input(
    "\nEnter your choice:\n"
    "  1 → Use uploaded JD\n"
    "  2 → Create prompted JD\n"
    "Choice: "
))

    if flag ==1:

        pdf_text = pdf_to_text(jd_file)
        JD_data = Pdf_to_jd_extract(pdf_text) # this is in json format str
        try:
            response_dict = json.loads(JD_data) # this is in json format dict
            json.dumps(response_dict),
        except json.JSONDecodeError:
            response_dict = {}

    else:
        jd = """
Job Title: Full Stack Developer
Location: Bangalore, India
Employment Type: Full-time
Experience Required: 2-5 years

Responsibilities:
- Design, develop, and maintain scalable web applications.
- Work on both frontend and backend components.
- Collaborate with designers, product managers, and other developers.
- Write clean, maintainable, and efficient code.
- Implement RESTful APIs and integrate third-party services.
- Ensure applications are optimized for performance and security.

Skills Required:
- Proficiency in JavaScript, HTML, CSS.
- Experience with frontend frameworks like React, Angular, or Vue.
- Backend experience with Node.js, Django, or Spring Boot.
- Database knowledge: MySQL, PostgreSQL, MongoDB.
- Familiarity with cloud services (AWS, Azure, or GCP).
- Version control using Git/GitHub.

Education:
- Bachelor’s degree in Computer Science or related field.

Perks & Benefits:
- Health insurance
- Flexible working hours
- Learning & development budget
- Work from home options
"""

        JD_data = create_jd(jd)

        try:
            response_dict = json.loads(JD_data) # this is in json format dict
            json.dumps(response_dict),
        except json.JSONDecodeError:
            response_dict = {}

   
    for cv in cv_file:
        pdf_text = pdf_to_text(cv)
        cv_data = Pdf_to_CV_extract(pdf_text) # this is in json format str
        # print(f'just printing -> {cv_data}')
       
        try:
         response_dict_1 = json.loads(cv_data)  # this is in json format dict
        except json.JSONDecodeError:
         response_dict_1 = {}

        if not response_dict_1:
            rephrase_cv = ''
        else:
            if response_dict_1.get("EXPERIENCE") !="":
                rephrase_cv = analys_CV(response_dict_1.get("EXPERIENCE"), response_dict_1.get("SKILLS"), response_dict_1.get("EDUCATION"))
                rephrase_cv = rephrase_cv.replace("SKILLS:","\nSKILLS:").replace("EDUCATION:","\nEDUCATION:")
                
            else:
                rephrase_cv = analys_CV2( response_dict_1.get("SKILLS"), response_dict_1.get("EDUCATION"))
                rephrase_cv = rephrase_cv.replace("SKILLS:","\nSKILLS:").replace("EDUCATION:","\nEDUCATION:")
            
       

        st.write("Matching CV:\n", rephrase_cv)
        rephrase_cv_1 = analys_CV_1(cv_data)
        
        st.write("Matching CV_1:\n\n", rephrase_cv_1)


        # Response dict = jd json format
        
        
        # compare_cv_jd_matcher = best cv of (cv_data + jd json (prompted))
        # response_dict_1       = loaded json of cv 
        # rephrase_cv           = only three parameters of cv json (prompted)
        # rephrase_cv_1         = whole cv json (prompted)


        # print('-'*50)
        # print(rephrase_cv_1)
        # res = similarity(best_cv,rephrase_cv_1)
        # print('-'*50)
        # print(res)
      

        compare_cv_jd_matcher=matching_jd_cv(cv_data,response_dict)     

        
        # print(f"response_dict: {response_dict}\n")
        # print('-'*50)
        # print(f"compare_cv_jd_matcher : {compare_cv_jd_matcher}\n")
        # print(f"response_dict_1 : {response_dict_1}\n")
        # print(f"rephrase_cv : {rephrase_cv}\n")
        # print(f"rephrase_cv_1 : {rephrase_cv_1}\n")

        # print(response_dict_1)

        compare_cv_jd_similarity= calculate_similarity(compare_cv_jd_matcher, response_dict )
        st.write(":blue[compare_cv_jd_similarity]", compare_cv_jd_similarity)

        normal_cv_jd_similarity = calculate_similarity(response_dict_1, response_dict)
        st.write(":blue[normal_cv_jd_similarity]", normal_cv_jd_similarity)

        best_cv_jd_similarity = calculate_similarity(rephrase_cv, response_dict)
        st.write(":blue[best_cv_jd_similarity]:", best_cv_jd_similarity)
        
        best_new = calculate_similarity(rephrase_cv_1, response_dict)
        st.write(":blue[best_new]", best_new) 

        name = response_dict_1.get("NAME", "Candidate")
        email = response_dict_1.get("EMAIL", "")
        
        def process_and_send_email(compare_cv_jd_similarity, JD_data, response_dict_1, send_email,cv_data):
            check = float(compare_cv_jd_similarity)

            try:
                jd_json_format = jd_json(JD_data)
                jd_json_format = json.loads(jd_json_format)
            except (ValueError, json.JSONDecodeError, Exception) as e:
                print(f"Error while parsing JD JSON: {e}")
                jd_json_format = {}

               
            
            company_name = jd_json_format.get("COMPANY_NAME", "the company")
            company_email = jd_json_format.get("COMPANY_EMAIL", "N/A")
            job_title = jd_json_format.get("JOB_TITLE", "the position")
            # company_address = jd_json_format.get("COMPANY_ADDRESS", "")

            our_mail = "encovatehr@gmail.com"
            our_passcode = "ijvo dgrc kkxe hduw"

            if check > 800.00:
               
                subject = f"Shortlisted for the Next Round - {job_title} at {company_name}"
                body = (
                    f"Dear {name},\n\n"
                    f"  We are pleased to inf1orm you that you have been shortlisted for the next stage of the recruitment process "
                    f"for the position of {job_title} at {company_name}.\n\n"
                    f"Our recruitment team will be in touch with further details regarding the next steps. "
                    f"If you have any questions or require clarification, please feel free to contact us at {company_email}.\n\n"
                  
                    f"Best regards,\n"
                    f"{company_name} Recruitment Team\n"
                    
                )

                send_email(
                    sender=our_mail,
                    password=our_passcode,
                    recipient='dummy001@gmail.com',
                    subject=subject,
                    body=body
                )
            
            else:
                try:
                    job = job_recommend(cv_data)
                    print(job)
                    jobs = json.loads(job)
                    print(jobs)
                except (ValueError, json.JSONDecodeError, Exception) as e:
                    print(f"Error while parsing JD JSON: {e}")
                    jobs = {}
                
                recommended_jobtitle = jobs.get('JOB')
                recommended_jobcontent = jobs.get('REASONS')
                subject = f"Application update - {job_title} at {company_name}"
                body = (
                        f"Dear {name},\n\n"
                        f"After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.\n\n"
                        f"Recommended job : {recommended_jobtitle}\n\n"
                        f"{recommended_jobcontent}\n\n"
                        f"Best regards,\n"
                        f"{company_name} Recruitment Team\n"
                        )
                
                send_email(
                    sender=our_mail,
                    password=our_passcode,
                    recipient='dummy002@gmail.com',
                    subject=subject,
                    body=body
                )
                

        process_and_send_email(compare_cv_jd_similarity, JD_data, response_dict_1, send_email,cv_data)

        