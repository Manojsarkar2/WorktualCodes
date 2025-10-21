import os
import json
from fastapi import FastAPI, Body, HTTPException
from pydantic import BaseModel
import uvicorn
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")
model = genai.GenerativeModel("gemini-2.5-flash")

app = FastAPI(title="AI Figma Design Generator", version="1.0")

class UserRequest(BaseModel):
    requirement: str


def create_project_from_json(data, base_dir="."):
   
    code_files = data.get("CODE", {})
    for file_path, file_content in code_files.items():
        full_path = os.path.join(base_dir, file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        print(full_path)
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(file_content)



@app.post("/generate_figma")
async def generate_figma(request: UserRequest = Body(...)):
   

    prompt = f"""
You are a professional Figma design generator.
Your task is to create a structured Figma design blueprint from the user’s text requirement.

🧩 Output Format (MUST be valid JSON only — no explanations, markdown, or text outside JSON):
{{
  "DESIGN_OVERVIEW": "A summary of the visual direction and design intent.",
  "COLOR_PALETTE": {{
    "primary": "#HEXCODE",
    "secondary": "#HEXCODE",
    "background": "#HEXCODE",
    "accent": "#HEXCODE"
  }},
  "TYPOGRAPHY": {{
    "heading_font": "Font Name",
    "body_font": "Font Name"
  }},
  "LAYOUT": {{
    "pages": [
      {{
        "name": "Home",
        "sections": [
          {{
            "name": "Hero Section",
            "elements": [
              {{"type": "heading", "content": "Text here"}},
              {{"type": "button", "label": "Get Started"}}
            ]
          }},
          {{
            "name": "Features Section",
            "elements": [
              {{"type": "card", "count": 3}},
              {{"type": "image", "placement": "left"}}
            ]
          }}
        ]
      }}
    ]
  }},
  "FIGMA_INSTRUCTIONS": "Describe how this layout should be built in Figma — frames, auto layout, alignment, spacing, and component usage."
}}

🔹 Rules:
- Return ONLY valid JSON that can be parsed directly.
- Do NOT include markdown, code fences, or explanations.
- The structure must clearly describe how to create the design in Figma.
- Reflect ALL details mentioned by the user.

User Requirement: {request.requirement}
"""

    response = model.generate_content(
        prompt,
        generation_config={"max_output_tokens": 20000, "temperature": 0.4}
    )

    raw_output = response.text.strip()
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

    try:
        figma_json = json.loads(raw_output)
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Invalid JSON output: {e}")


    frontend_content = f"""
You are a professional frontend code generator. Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text. The JSON output will be parsed directly into a dictionary by the caller — it must be strictly valid JSON (double quotes, escaped characters where needed).

HIGH-LEVEL GOAL:
User provided a Figma JSON object in the variable `figma_json`. Produce a modern, production-ready, single-folder SPA that reproduces the Figma page exactly (visual fidelity and behavior), using only vanilla HTML, CSS, and ES modules (no frameworks, no bundlers). The project must be modular (components, views, utils), behave like a real-world application (routing, state/store, mock API, forms, accessible modals, search/pagination where applicable), and run without a build step (open index.html from a local dev server such as live-server or lite-server).

INPUT:
user input figma json : {figma_json}

Website Behaviour:
    - Create a full functionality website using the figma 
    - Everything should be functional like how real world application works
    - Going to sub pages, buttons, link these kind of things should have to work like real world applicaation.
    - Render the website without any failure

VERY IMPORTANT ERROR I DO NOT WANT TO GET:
- Rendering issues 
- DO NOT MAKE ANY RENDERING ISSUES
- Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.(data/products.json:1 )
- 404 Error

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

        
    create_project_from_json(result, base_dir="main_3")

    return {"status": "✅ Project generated successfully", "project_structure": result["PROJECT_STRUCTURE"]}
    


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
