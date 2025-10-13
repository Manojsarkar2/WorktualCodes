import google.generativeai as genai
import os
import json
from fastapi import FastAPI, Body
from pydantic import BaseModel
import uvicorn
import asyncio
from playwright.async_api import async_playwright
import colorgram




genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")

model = genai.GenerativeModel("gemini-2.0-flash")

app = FastAPI(title="AI Project Generator", version="1.0")

class UserRequest(BaseModel):
    requirement: str

def create_project_from_json(data, base_dir="."):
    project_structure = data.get("PROJECT_STRUCTURE", {})
    code_files = data.get("CODE", {})

    def process_structure(structure, current_path):
        if isinstance(structure, dict):
            for folder, sub in structure.items():
                new_path = os.path.join(current_path, folder)
                os.makedirs(new_path, exist_ok=True)
                process_structure(sub, new_path)
        elif isinstance(structure, list):
            for file in structure:
                full_path = os.path.join(current_path, file)
                os.makedirs(os.path.dirname(full_path), exist_ok=True)

                if os.path.isdir(full_path):
                    continue

                if file not in code_files:
                    with open(full_path, "w", encoding="utf-8") as f:
                        if file.endswith(".html"):
                            f.write(f"<!-- Placeholder for {file} -->")
                        elif file.endswith(".js"):
                            f.write(f"// Placeholder for {file}")
                        else:
                            f.write("")
                    print(f"📂 Created {full_path} (placeholder)")

    process_structure(project_structure, base_dir)

    for file_path, file_content in code_files.items():
        full_path = os.path.join(base_dir, file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

        if os.path.exists(full_path):
            print(f"⚠️ Overwriting {full_path}")

        with open(full_path, "w", encoding="utf-8") as f:
            f.write(file_content)
        print(f"✅ Wrote {full_path}")


import json

async def get_link(value):
  
    prompt = f"""
    You are a Link extractor from text.
    Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.
    Your job is to take the link from the text and format it as a JSON key-value dict.

    LINK:
    {value}

    Deliverable:
    Output format:
    
      "LINK": "extracted link" 
    
    """

    
    link_response = model.generate_content(
        prompt,
        generation_config={"max_output_tokens": 300, "temperature": 0.3}
    )

    link_raw_output = link_response.text.strip()
    
   
   
    if link_raw_output.startswith("```"):
        link_raw_output = link_raw_output.replace("```json",'').replace('```','')

    try:
        link_result = json.loads(link_raw_output)

    except json.JSONDecodeError as e:
        return {
            "error": "JSON decode error",
            "details": str(e),
            "raw_output": link_raw_output
        }
    

    website_link = link_result.get('LINK')

    print(website_link)

    async def capture_and_extract(url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url, timeout=60000)
            await page.screenshot(path="website_screenshot.png", full_page=True)

        
            body_styles = await page.evaluate("""
                () => {
                    const styles = window.getComputedStyle(document.body);
                    return [
                        styles.backgroundColor || '',
                        styles.color || '',
                        styles.fontFamily || ''
                    ];
                }
            """)

            await browser.close()
            return body_styles


    body_styles = await capture_and_extract(website_link)

    frontend_content_palette = f"""
    You are a code generator.
    Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

    Important NOte (Generate ONLY valid JSON to convert into dict)

    user requirement : {value}
    body_backgroundcolor : {body_styles[0]}
    body_color : {body_styles[1]}
    body_font_family : {body_styles[2]}
    

Build a modern, production-ready, single-folder SPA using only vanilla JavaScript, HTML, and CSS. No frameworks or rendering libraries—use a single script.js for all interactivity.


MOST IMPORTANT:
    MAKE IT AS REAL TIME AS POSSIBLE FOR REAL WORLS USAGE
    If user ask for chatbot or agentic ai create a interactive high intelligent chatbot website for user
    If user does not give any color preference you have to take one color from color pattern according to the domain
Requirements:

1. File Structure
- All files in one folder no sub folders.
- Include: index.html, styles.css, script.js and all sub html file linked via href.
- Running index.html must fully load the SPA without errors.
- do not create any extra folder inside main folder

2. Routing & Navigation
- Be more domain specific
- Client-side routing (no page reloads).
- Pages: Home, Contact and add other necessary navbar elements according to users domain need and they have their own html file.
- Social media websites do not have product and cart option in nav bar
- Every pages need to contain details and information that are actual real time and real world websites
- Responsive top navbar with client asking theme and mobile hamburger.
- do not create any image url or anything related to image.
- Navigation via href + JS dynamic content updates.


3. Responsiveness & Layout
- Be more domain specific
- Fully responsive (mobile, tablet, desktop).
- Use Flexbox, Grid, media queries.
- Make home page as professional real time based on the domain user give 

4. Interactive Components (Vanilla JS)
- Modal, dropdowns, tabs, accordions, carousel/slider, search filtering, products must have real time names.

5. Forms & Validation
- Login, signup, contact forms with client-side validation.
- Store mock session & form data in localStorage.

6. State & Data
- JS modules manage app state, user auth, settings, preferences.
- Lazy load images for performance.

7. Accessibility & Performance
- Semantic HTML, ARIA attributes, keyboard navigation.
- Smooth CSS transitions, minimal JS.
- Optimized load time, lightweight, zero external libraries.

8. Style & Alignment
-Ensure every element and tag is perfectly aligned, visually balanced, and styled with elegance and consistency.
-Focus on clean layouts, proper spacing, responsive scaling, and cohesive visual hierarchy.
-The overall design should look refined, professional, and aesthetically pleasing across all screen sizes.

If any chance there a product navbar element put the products in div tag also create cart in navbar and make them work like a real-world application checkout everything


Deliverable:  
    Output format:
    {{
      "PROJECT_STRUCTURE": {{ "root": [ ... ] }},
      "CODE": {{ "file_path": "file content" }}
    }}
    """

    response = model.generate_content(
        frontend_content_palette,
        generation_config={"max_output_tokens": 30000, "temperature": 0.3}
    )

    raw_output = response.text.strip()
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

    try:
        result = json.loads(raw_output)
    except json.JSONDecodeError as e:
        return {"error": "JSON decode error", "details": str(e), "raw_output": raw_output}

    
    create_project_from_json(result, base_dir="main_37")

    return {"status": "✅ Project generated successfully", "project_structure": result["PROJECT_STRUCTURE"]}



@app.post("/generate_project")
async def generate_project(request: UserRequest = Body(...)):
    value = request.requirement
    
    if 'https' in value:
       print('*'*50)
       await get_link(value)
   
    else:

        frontend_content = f"""
        You are a code generator.
        Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

        Important NOte (Generate ONLY valid JSON to convert into dict)

        If the user provides any referral website name or website link, extract the template detail of that webpage and create a website template based on the website from that information.
        
        user requirement : {request.requirement}
    Build a modern, production-ready, single-folder SPA using only vanilla JavaScript, HTML, and CSS. No frameworks or rendering libraries—use a single script.js for all interactivity.


    MOST IMPORTANT:
        MAKE IT AS REAL TIME AS POSSIBLE FOR REAL WORLS USAGE
        If user ask for chatbot or agentic ai create a interactive high intelligent chatbot website for user
        If user does not give any color preference you have to take one color from color pattern according to the domain
    Requirements:

    1. File Structure
    - All files in one folder no sub folders.
    - Include: index.html, styles.css, script.js and all sub html file linked via href.
    - Running index.html must fully load the SPA without errors.
    - do not create any extra folder inside main folder.

    2. Routing & Navigation
    - Be more domain specific
    - Client-side routing (no page reloads).
    - Pages: Home, Contact and add other necessary navbar elements according to users domain need and they have their own html file.
    - Every pages need to contain details and information that are actual real time and real world websites
    - Responsive top navbar with client asking theme and mobile hamburger.
    - do not create any image url or anything related to image.
    - Navigation via href + JS dynamic content updates.


    3. Responsiveness & Layout
    - Be more domain specific
    - Fully responsive (mobile, tablet, desktop).
    - Use Flexbox, Grid, media queries.
    - Make home page as professional real time based on the domain user give 


    4. UI/Styling
    - Keep the design elegant, minimal, and professional.
    - Use subtle gradients, clean layouts, and balanced whitespace.
    - pick color pattern according to the domain and need.
    - Avoid heavy glowing or flashy effects; focus on clarity and readability.
    - Apply smooth, minimal animations only where necessary (e.g., hover, button clicks).
    - Ensure a modern and consistent style with a professional color palette and typography.
    - Design must be fully responsive and look polished across desktop, tablet, and mobile.

    5. Interactive Components (Vanilla JS)
    - Modal, dropdowns, tabs, accordions, carousel/slider, search filtering, products must have real time names.

    6. Forms & Validation
    - Login, signup, contact forms with client-side validation.
    - Store mock session & form data in localStorage.


    7. State & Data
    - JS modules manage app state, user auth, settings, preferences.
    - Lazy load images for performance.

    8. Accessibility & Performance
    - Semantic HTML, ARIA attributes, keyboard navigation.
    - Smooth CSS transitions, minimal JS.
    - Optimized load time, lightweight, zero external libraries.

    If any chance there a product navbar element put the products in div tag also create cart in navbar and make them work like a real-world application checkout everything


    Deliverable:  
        Output format:
        {{
        "PROJECT_STRUCTURE": {{ "root": [ ... ] }},
        "CODE": {{ "file_path": "file content" }}
        }}
        """

        response = model.generate_content(
            frontend_content,
            generation_config={"max_output_tokens": 30000, "temperature": 0.3}
        )

        raw_output = response.text.strip()
        if raw_output.startswith("```"):
            raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

        try:
            result = json.loads(raw_output)
        except json.JSONDecodeError as e:
            return {"error": "JSON decode error", "details": str(e), "raw_output": raw_output}

        
        create_project_from_json(result, base_dir="main_37")

        return {"status": "✅ Project generated successfully", "project_structure": result["PROJECT_STRUCTURE"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
