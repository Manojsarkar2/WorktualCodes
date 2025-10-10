import google.generativeai as genai
import os
import json

genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")

model = genai.GenerativeModel("gemini-2.0-flash")
value = input("site :")

frontend_content = """
You are a code generator.
Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

user requirement : {value}

Requirements:
Frontend
- Modern, responsive normal HTML + normal CSS.
- Homepage with a search bar to find anime by title, genre, or rating.
- Recommendation feed that suggests anime based on user preferences.
- Anime detail page showing title, poster, description, genre, rating, number of episodes, and streaming links.
- User authentication (sign up, login, logout).
- A dashboard for logged-in users to save favorites, watchlists, and get personalized recommendations.

Output format:
{
  "PROJECT_STRUCTURE": { "root": [ ... ] },
  "CODE": { "file_path": "file content" }
}
"""

response = model.generate_content(
    frontend_content,
    generation_config={
        "max_output_tokens": 90000,
        "temperature": 0.3
    }
)


raw_output = response.text.strip()
if raw_output.startswith("```"):
    raw_output = raw_output.split("```json")[-1].split("```")[0].strip()

try:
    result = json.loads(raw_output)
    print("✅ JSON parsed successfully")
    print(json.dumps(result, indent=2))
except json.JSONDecodeError as e:
    print("❌ JSON decode error:", e)
    print("Raw output:", raw_output)


def create_project_from_json(data, base_dir="."):
    project_structure = data.get("PROJECT_STRUCTURE", {})
    code_files = data.get("CODE", {})

   
    for folder, files in project_structure.items():
        for file_path in files:
            full_path = os.path.join(base_dir, file_path)
            
    
            os.makedirs(os.path.dirname(full_path), exist_ok=True)

          
            if os.path.isdir(full_path):
                continue  


            if file_path not in code_files:
                with open(full_path, "w", encoding="utf-8") as f:
                    if file_path.endswith(".html"):
                        f.write(f"<!-- Placeholder for {file_path} -->")
                    elif file_path.endswith(".js"):
                        f.write(f"// Placeholder for {file_path}")
                    else:
                        f.write("")
                print(f"📂 Created {full_path} (placeholder)")


    for file_path, file_content in code_files.items():
        full_path = os.path.join(base_dir, file_path)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)

      
        if os.path.isdir(full_path):
            continue  

        with open(full_path, "w", encoding="utf-8") as f:
            f.write(file_content)
        print(f"✅ Wrote {full_path}")

create_project_from_json(result, base_dir="anime_app")