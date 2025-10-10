import streamlit as st
import requests
import zipfile
import io
import json

BACKEND_URL = "http://127.0.0.1:8000"

st.set_page_config(page_title="Universal AI App Builder", layout="wide")
st.title("Universal AI App Builder")
st.markdown(
    "Type your app idea below and generate a full-stack project dynamically."
)

prompt = st.text_area(
    "Enter your app idea:", 
    "generate a simple resume website", 
    height=120
)

if st.button("Generate App"):
    if not prompt.strip():
        st.warning("Please enter a valid prompt.")
    else:
        with st.spinner("Generating project files dynamically..."):
            try:
                response = requests.post(
                    f"{BACKEND_URL}/generate/",
                    json={"prompt": prompt},
                    timeout=60  # Avoid long hanging requests
                )

                if response.status_code == 200:
                    project = response.json().get("files", {})

                    if not project:
                        st.warning("No files were generated. Try a different prompt.")
                    else:
                        st.success("Project generated successfully!")

                        # Display all generated files
                        for filename, content in project.items():
                            st.subheader(filename)
                            # Detect language for code highlighting
                            if filename.endswith(".py"):
                                lang = "python"
                            elif filename.endswith(".html"):
                                lang = "html"
                            elif filename.endswith(".css"):
                                lang = "css"
                            elif filename.endswith(".js"):
                                lang = "javascript"
                            else:
                                lang = None
                            st.code(content, language=lang)

                        zip_buffer = io.BytesIO()
                        with zipfile.ZipFile(zip_buffer, "w") as zip_file:
                            for filename, content in project.items():
                                zip_file.writestr(filename, content)

                        st.download_button(
                            label="Download Project as ZIP",
                            data=zip_buffer.getvalue(),
                            file_name="generated_project.zip",
                            mime="application/zip"
                        )

                        # Live preview for HTML file if exists
                        html_file = next((v for k, v in project.items() if k.endswith("index.html")), None)
                        if html_file:
                            st.subheader("Live Preview")
                            st.components.v1.html(html_file, height=500, scrolling=True)

                else:
                    st.error(f"Error from backend: {response.text}")

            except requests.exceptions.Timeout:
                st.error("Request timed out. The AI model may be busy. Try again.")
            except Exception as e:
                st.error(f"Unexpected error: {str(e)}")