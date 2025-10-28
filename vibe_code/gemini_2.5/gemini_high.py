import colorgram
import re
import os
import json
import logging
import uvicorn
import asyncio
from playwright.async_api import async_playwright
from fastapi import FastAPI, Body , HTTPException
from pydantic import BaseModel
import google.generativeai as genai


genai.configure(api_key="AIzaSyAxxUoVPdlW-5qbbYpNhEb48wVzDS3CfJM")

model = genai.GenerativeModel("gemini-2.5-flash")

file = 'main_41'

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

    return 


async def figma(figma_link):

#     prompt = f"""
# You are a professional Figma design generator.
# Your task is to create a structured Figma design blueprint from the user’s text requirement.

# 🧩 Output Format (MUST be valid JSON only — no explanations, markdown, or text outside JSON):
# {{
#   "DESIGN_OVERVIEW": "A summary of the visual direction and design intent.",
#   "COLOR_PALETTE": {{
#     "primary": "#HEXCODE",
#     "secondary": "#HEXCODE",
#     "background": "#HEXCODE",
#     "accent": "#HEXCODE"
#   }},
#   "TYPOGRAPHY": {{
#     "heading_font": "Font Name",
#     "body_font": "Font Name"
#   }},
#   "LAYOUT": {{
#     "pages": [
#       {{
#         "name": "Home",
#         "sections": [
#           {{
#             "name": "Hero Section",
#             "elements": [
#               {{"type": "heading", "content": "Text here"}},
#               {{"type": "button", "label": "Get Started"}}
#             ]
#           }},
#           {{
#             "name": "Features Section",
#             "elements": [
#               {{"type": "card", "count": 3}},
#               {{"type": "image", "placement": "left"}}
#             ]
#           }}
#         ]
#       }}
#     ]
#   }},
#   "FIGMA_INSTRUCTIONS": "Describe how this layout should be built in Figma — frames, auto layout, alignment, spacing, and component usage."
# }}

# 🔹 Rules:
# - Return ONLY valid JSON that can be parsed directly.
# - Do NOT include markdown, code fences, or explanations.
# - The structure must clearly describe how to create the design in Figma.
# - Reflect ALL details mentioned by the user.

# User Requirement: {figma_link}
# """

#     response = model.generate_content(
#         prompt,
#         generation_config={"max_output_tokens": 20000, "temperature": 0.4}
#     )

#     raw_output = response.text.strip()
#     if raw_output.startswith("```"):
#         raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

#     try:
#         figma_json = json.loads(raw_output)
#     except json.JSONDecodeError as e:
#         raise HTTPException(status_code=500, detail=f"Invalid JSON output: {e}")


    # frontend_content = f"""
    # You are a professional frontend code generator. Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text. The JSON output will be parsed directly into a dictionary by the caller — it must be strictly valid JSON (double quotes, escaped characters where needed).

    # HIGH-LEVEL GOAL:
    # User provided a Figma JSON object in the variable `figma_json`. Produce a modern, production-ready, single-folder SPA that reproduces the Figma page exactly (visual fidelity and behavior), using only vanilla HTML, CSS, and ES modules (no frameworks, no bundlers). The project must be modular (components, views, utils), behave like a real-world application (routing, state/store, mock API, forms, accessible modals, search/pagination where applicable), and run without a build step (open index.html from a local dev server such as live-server or lite-server).

    # INPUT:
    # user input figma json : {figma_json}

    # Website Behaviour:
    #     - website should render easily without any issues
    #     - Create a full functionality website using the figma 
    #     - Everything should be functional like how real world application works
    #     - Going to sub pages, buttons, link these kind of things should have to work like real world applicaation.
    #     - Render the website without any failure

    # VERY IMPORTANT ERROR I DO NOT WANT TO GET:
    # - Rendering issues 
    # - DO NOT MAKE ANY RENDERING ISSUES
    # - Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.(data/products.json:1 )
    # - 404 Error

    # Deliverable:  
    #     Output format:
    #     {{
    #     "PROJECT_STRUCTURE": {{ "root": [ ... ] }},
    #     "CODE": {{ "file_path": "file content" }}
    #     }}
    #     """

    frontend_content = f"""
    You are a professional frontend code generator. Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text. The JSON output will be parsed directly into a dictionary by the caller — it must be strictly valid JSON (double quotes, escaped characters where needed).

    Important Goal:
        generate a 100 perecent valid json that would be used as json.loads()
        Build the website exactly like the figma
        Structure, content, navbar everything should look like figma
        Every components should work like a real world website
    
    File Structure
    - All files in one folder.
    - Required files: index.html, styles.css, script.js, package.json.
    - Only one html file
    - Include all config files needed to render the website correctly with local development server (e.g., live-server.json, .vscode/settings.json)
    - Optional subfolders if required: views/, components/, images/, data/

    INPUT:
    user input figma_link : {figma_link}

    Deliverable:  
        Output format:
        {{
        "PROJECT_STRUCTURE": {{ "root": [ ... ] }},
        "CODE": {{ "file_path": "file content" }}
        }}
        """

    

    response = model.generate_content(
            frontend_content,

        )
 
    raw_output = response.text.strip()
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```json")[-1].split("```")[0].strip()



    print(f"raw_output----------> {raw_output}")

    try:
        result = json.loads(raw_output)
    except json.JSONDecodeError as e:
        return {"error": "JSON decode error", "details": str(e), "raw_output": raw_output}

        

    try:
        create_project_from_json(result, base_dir=file)
        return {
            "status": "✅ Project generated successfully",
            "project_structure": result.get("PROJECT_STRUCTURE", {})
        }
    except Exception as e:
        logging.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


    
    

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



    async def capture_dom(url):
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()

            print(f"Visiting: {url}")
            await page.goto(url, timeout=60000, wait_until="networkidle")

            dom_data = await page.evaluate(
                """() => {
                    function serialize(node) {
                        if (node.nodeType === Node.TEXT_NODE) {
                            const text = node.textContent.replace(/\\s+/g, ' ').trim();
                            return text ? { tag: null, text } : null;
                        }
                        if (node.nodeType !== Node.ELEMENT_NODE) return null;

                        // Skip unwanted tags
                        if (['script', 'style', 'meta', 'link', 'noscript'].includes(node.tagName.toLowerCase())) return null;

                        const obj = {
                            tag: node.tagName.toLowerCase(),
                            text: null,
                            attributes: {},
                            children: []
                        };

                        // Capture attributes
                        for (const attr of node.attributes) {
                            obj.attributes[attr.name] = attr.value;
                        }

                        // Capture single text node
                        if (node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE) {
                            const text = node.childNodes[0].textContent.replace(/\\s+/g, ' ').trim();
                            if (text) obj.text = text;
                            return obj;
                        }

                        // Recursively serialize children
                        for (const child of node.childNodes) {
                            const c = serialize(child);
                            if (c) obj.children.push(c);
                        }

                        return obj;
                    }

                    return serialize(document.documentElement || document.body);
                }"""
            )

            # Save essential DOM snapshot
            with open("dom_snapshot.json", "w", encoding="utf-8") as f:
                json.dump(dom_data, f, indent=2, ensure_ascii=False)

            await browser.close()
            print("✅ Essential DOM structure captured successfully.")
            return dom_data


 

    def limit_dom(node, max_depth=3, max_children=5, depth=0):
        # If it's a text-only node (tag is None)
        if node.get("tag") is None:
            return {"tag": None, "text": node.get("text")}

        # Skip unwanted tags
        if node["tag"] in ["script", "style", "meta", "link"]:
            return None

        # Stop at max depth
        if depth >= max_depth:
            return {"tag": node["tag"], "text": node.get("text")}

        # Limit children
        children = []
        for child in node.get("children", [])[:max_children]:
            limited_child = limit_dom(child, max_depth, max_children, depth + 1)
            if limited_child:
                children.append(limited_child)

        result = {"tag": node["tag"], "text": node.get("text")}
        if children:
            result["children"] = children

        return result

        
    dom_data = await capture_dom(website_link)

    limited_dom = limit_dom(dom_data, max_depth=2, max_children=2)

    dom_json_str = json.dumps(limited_dom, indent=2, ensure_ascii=False)

    frontend_content_palette = f"""
        You are a code generator AI.
        Your job is to analyze the given **DOM structure of a website homepage** and generate a **complete, production-ready Single Page Application (SPA)** that visually and functionally replicates it as closely as possible.

        The output must be **ONLY valid JSON** (convertible directly to a Python dict).
        Do not include explanations, markdown, or extra text.
        A normal website not react

        DOM structure:
        {dom_json_str}

        create a {website_link} website with the strcture of given dom json

        Deliverable:  
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
    except json.JSONDecodeError as e:
        return {"error": "JSON decode error", "details": str(e), "raw_output": raw_output}

    try:
        create_project_from_json(result, base_dir=file)
        return {
                "status": "✅ Project generated successfully",
                "project_structure": result.get("PROJECT_STRUCTURE", {})
            }
    except Exception as e:
        logging.error(f"Error creating project: {e}")
        raise HTTPException(status_code=500, detail=str(e))


async def sentence_prompt(user_query):
    frontend_content = f"""
        You are a code generator.
        Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

        Important NOte (Generate ONLY valid JSON to convert into dict)

        If the user provides any referral website name or website link, extract the template detail of that webpage and create a website template based on the website from that information.
        
        user requirement : {user_query}
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

        )

    raw_output = response.text.strip()
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

    # raw_output = raw_output.replace("\r", "").replace("\x00", "")
    print('-'*100,end='\n\n')
    print(raw_output,end='\n\n')
    print('-'*100,end='\n\n')
    

    try:
        result = json.loads(raw_output)
    except json.JSONDecodeError as e:
        return {"error": "JSON decode error", "details": str(e), "raw_output": raw_output}



    try:
        create_project_from_json(result, base_dir=file)
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
    
    if 'www.figma.com' in value:
       print("Figma_Link")
       result = await figma(value)
    elif 'https' in value:
        print("Website_Link")
        result = await get_link(value)
    else:
        print("Normal_Query")
        result = await sentence_prompt(value)

    return result
        

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
