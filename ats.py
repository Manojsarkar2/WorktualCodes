from dotenv import load_dotenv
import base64
import streamlit as st
import os
import io
import requests
from PIL import Image 
import pdf2image

load_dotenv()

# ---------- VLLM CALL ----------
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

# ---------- BUILD PROMPT WITH PDF ----------
def get_vllm_response(input, pdf_content, prompt):
    # combine input, pdf, and job description into one string
    pdf_text = pdf_content[0]["data"][:500]  # taking first 500 chars of base64
    combined_prompt = f"""
    {input}

    [Resume Extracted Content: {pdf_text}]

    Job Description: {prompt}
    """
    # you can tune these params
    sampling_params = {
        "temperature": 0.6,
        "top_p": 0.95,
        "max_tokens": 1024
    }
    return hit_vllm_model(combined_prompt, sampling_params)

# ---------- PDF SETUP ----------
def input_pdf_setup(uploaded_file):
    if uploaded_file is not None:
        images = pdf2image.convert_from_bytes(uploaded_file.read())
        first_page = images[0]

        img_byte_arr = io.BytesIO()
        first_page.save(img_byte_arr, format='JPEG')
        img_byte_arr = img_byte_arr.getvalue()

        pdf_parts = [
            {
                "mime_type": "image/jpeg",
                "data": base64.b64encode(img_byte_arr).decode()
            }
        ]
        return pdf_parts
    else:
        raise FileNotFoundError("No file uploaded")

# ---------- STREAMLIT APP ----------
st.set_page_config(page_title="ATS Resume Expert")
st.header("ATS Tracking System")
input_text = st.text_area("Job Description: ", key="input")
uploaded_file = st.file_uploader("Upload your resume(PDF)...", type=["pdf"])

if uploaded_file is not None:
    st.write("PDF Uploaded Successfully")

submit1 = st.button("Tell Me About the Resume")
submit3 = st.button("Percentage match")

input_prompt1 = """
You are an experienced Technical Human Resource Manager. 
Review the provided resume against the job description. 
Share professional evaluation, strengths, and weaknesses.
"""

input_prompt3 = """
You are an ATS (Applicant Tracking System) scanner. 
Evaluate the resume against the job description. 
Give percentage match first, then keywords missing, and final thoughts.
"""

if submit1:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_vllm_response(input_prompt1, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")

elif submit3:
    if uploaded_file is not None:
        pdf_content = input_pdf_setup(uploaded_file)
        response = get_vllm_response(input_prompt3, pdf_content, input_text)
        st.subheader("The Response is")
        st.write(response)
    else:
        st.write("Please upload the resume")
