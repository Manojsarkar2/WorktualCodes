import google.generativeai as genai
import os
import json
from fastapi import FastAPI, Body , HTTPException
from pydantic import BaseModel
import logging
import uvicorn
import asyncio
from playwright.async_api import async_playwright
import colorgram




genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")

model = genai.GenerativeModel("gemini-2.5-flash")


app = FastAPI(title="AI Project Generator", version="1.0")

class UserRequest(BaseModel):
    requirement: str

def create_project_from_json(data, base_dir="."):
    print("writting started")
   
    code_files = data.get("CODE", {})
    for file_path, file_content in code_files.items():
        full_path = os.path.join(base_dir, file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        print(full_path)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(file_content)




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

    async def capture(url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto(url, timeout=60000)
            await page.screenshot(path="screenshot.png", full_page=True)
            await browser.close()
    
    await (capture(website_link))
   
    screenshot = 'screenshot.png'

    # --- new improved prompt ---
    frontend_content_palette = f"""
    You are a code generator AI.
    Your job is to analyze the given base64-encoded website screenshot and generate a **complete, production-ready Single Page Application (SPA)** that visually and functionally replicates that screenshot as closely as possible.

    The output must be **ONLY valid JSON** (convertible directly to a Python dict).
    Do not include explanations, markdown, or extra text.

    Screenshot :
    {screenshot}


    ===============================
    🔧 INSTRUCTIONS
    ===============================

    1. **Analyze the Screenshot**
       - Visually extract the website’s layout, UI structure, color palette, font style, and overall theme.
       - Detect page type (e.g., landing page, portfolio, store, company website, AI chatbot, blog, etc.).
       - Understand real-world design context (buttons, forms, cards, navbar, hero section, footer, etc.).
       - Generate realistic, professional, and domain-accurate content and text.

    2. **Goal**
       Build a modern, real-time, responsive single-folder SPA that matches the screenshot’s layout, design, and theme as accurately as possible — while being production-ready and interactive using only:
       - HTML (index.html)
       - CSS (styles.css)
       - JavaScript (script.js)
       - package.json for local development
       No frameworks or libraries are allowed.

    3. **Core Requirements**
       - Fully functional navigation (client-side routing with JS, no reloads)
       - Responsive layout (desktop, tablet, mobile)
       - Semantic and accessible HTML
       - Smooth transitions and animations
       - Realistic, professional text content (not placeholders)
       - Maintain exact alignment, spacing, and color consistency with the screenshot
       - Accurately reconstruct navbar, buttons, cards, modals, etc.
       - Use localStorage for session/form data if login or cart elements exist

    4. **Functionality**
       - If screenshot shows login/signup → build working auth mock pages.
       - If it’s a product website → include product grid, cart, checkout, etc.
       - If it’s a chatbot → make it interactive with local JS logic (no API).
       - If it’s a business or portfolio → make all sections scrollable and responsive with working contact form.
       - If it’s a dashboard → include sidebar, stats, and real-time UI components (mock data allowed).

    5. **Style System**
       - Deduce colors, font, and layout directly from the screenshot.
       - Use CSS Flexbox/Grid for structure.
       - Apply hover, focus, and active states where logical.
       - Keep design pixel-perfect and consistent.

       
    ===============================
    💡 Additional Rules
    ===============================
    - Color and content pattern must be same as the screenshot website
    - Never add markdown, backticks, or comments outside of JSON.
    - Never output image URLs; instead, use placeholders or divs.
    - Must be fully runnable locally with `live-server` or similar.
    - Ensure smooth, responsive, and realistic user experience.
    - Use actual text and structure that fits the screenshot’s design.
  

    ===============================
    🎯 Goal Recap
    ===============================
    From the given screenshot, generate a professional, real-world, domain-accurate, responsive, interactive SPA that visually replicates the design and layout **exactly**.

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
    
    print(raw_output)

    try:
        result = json.loads(raw_output)
        logging.info("✅ JSON successfully parsed.")
    except json.JSONDecodeError as e:
        logging.error(f"JSON Decode Error: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON format")
    
    print(result)
    try:
        create_project_from_json(result, base_dir="main_9")
        return {
            "status": "✅ Project generated successfully",
            "project_structure": result.get("PROJECT_STRUCTURE", {})
        }
    except Exception as e:
        logging.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))









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
        MAKE IT AS REAL WORLD APPLICATION AND PRODUCTION-READY AS POSSIBLE.
        KNOW THE FILE STRCTURE VERY WELL , DO NOT MAKE ANY RENDERING ISSUES MAKE IT SIMPLE AND CLEAR
        If the website have product in nav bar fetch them without failure
        If user ask for chatbot or agentic ai create a interactive high intelligent chatbot website for user
        If user does not give any color preference you have to take one color from color pattern according to the domain
    
    Requirements:


    1. File Structure
    - All files in one folder.
    - Required files: index.html, styles.css, script.js, package.json.
    - Only one html file
    - Include all config files needed to render the website correctly with local development server (e.g., live-server.json, .vscode/settings.json)
    - Optional subfolders if required: views/, components/, images/, data/
    - components should be .js file
    - Running index.html must fully load the SPA without errors when served via a local server.

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
    - script.js render all the files

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

        
        create_project_from_json(result, base_dir="main_8")

        return {"status": "✅ Project generated successfully", "project_structure": result["PROJECT_STRUCTURE"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
