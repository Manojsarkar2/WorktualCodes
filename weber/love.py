import google.generativeai as genai
import os
import json
from fastapi import FastAPI, Body
from pydantic import BaseModel
import uvicorn


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


@app.post("/generate_project")
def generate_project(request: UserRequest = Body(...)):
    frontend_content = f"""
    You are a code generator.
    Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

    user requirement : {request.requirement}
Build a modern, production-ready, single-folder SPA using only vanilla JavaScript, HTML, and CSS. No frameworks or rendering libraries—use a single script.js for all interactivity.

Requirements:

1. File Structure
- All files in one folder.
- Include: index.html, styles.css, script.js, optional subfolders: views/, components/, assets/, data/.
- Running index.html must fully load the SPA without errors.

2. Routing & Navigation
- Client-side routing (no page reloads).
- Pages: Home, About, Profile, Settings, Contact and add other necessary navbar elements according to users domain need.
- Every pages need to contain details and information that are actual real time and real world websites
- Responsive top navbar with client asking theme and mobile hamburger.
- Navigation via href + JS dynamic content updates.

3. Responsiveness & Layout
- Fully responsive (mobile, tablet, desktop).
- Use Flexbox, Grid, media queries.

4. UI/Styling
- Glowing, gradient, glassmorphism effects.
- Smooth animations and floating gradient/glow background.

5. Interactive Components (Vanilla JS)
- Modal, dropdowns, tabs, accordions, carousel/slider, search filtering, products must have real time names.

6. Forms & Validation
- Login, signup, contact forms with client-side validation.
- Store mock session & form data in localStorage.

7. Theming
- Dark/light mode toggle with persistent state in localStorage.

8. State & Data
- JS modules manage app state, user auth, settings, preferences.
- Lazy load images for performance.

9. Accessibility & Performance
- Semantic HTML, ARIA attributes, keyboard navigation.
- Smooth CSS transitions, minimal JS.
- Optimized load time, lightweight, zero external libraries.

MOST IMPORTANT:
 MAKE IT AS REAL TIME AS POSSIBLE FOR REAL WORLS USAGE


    Error i Dont want to get:

    products.json:1 Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/json". Strict MIME type checking is enforced for module scripts per HTML spec.

    Uncaught SyntaxError: Identifier 'renderView' has already been declared

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

    
    create_project_from_json(result, base_dir="main_13")

    return {"status": "✅ Project generated successfully", "project_structure": result["PROJECT_STRUCTURE"]}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
