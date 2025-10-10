import google.generativeai as genai
import os
import json

genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")

model = genai.GenerativeModel("gemini-2.0-flash")

frontend_content = """
You are a code generator.
Generate ONLY valid JSON. Do not add any explanations, no markdown, no extra text.

Requirements:
Frontend

Modern, responsive normal HTML + normal CSS.

Homepage with a search bar to find anime by title, genre, or rating.

Recommendation feed that suggests anime based on user preferences.

Anime detail page showing title, poster, description, genre, rating, number of episodes, and streaming links.

User authentication (sign up, login, logout).

A dashboard for logged-in users to save favorites, watchlists, and get personalized recommendations.

Folder rule (important):

Use exactly one main folder only. Do NOT create any subfolders.

All coding files (HTML, CSS, JS, assets, etc.) must be placed directly inside that single main folder.

Example: "PROJECT_STRUCTURE": { "anime_app": [ "index.html", "style.css", "script.js", "auth.html", ... ] }

Output format:
{
"PROJECT_STRUCTURE": { "anime_app": [ ALL FILES ] },
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
        root_path = os.path.join(base_dir, folder)
        os.makedirs(root_path, exist_ok=True)

        for file_name in files:
            full_path = os.path.join(root_path, file_name)

       
            if file_name not in code_files:
                with open(full_path, "w", encoding="utf-8") as f:
                    if file_name.endswith(".html"):
                        f.write(f"<!-- Placeholder for {file_name} -->")
                    elif file_name.endswith(".js"):
                        f.write(f"// Placeholder for {file_name}")
                    else:
                        f.write("")
                print(f"📂 Created {full_path} (placeholder)")

    for file_path, file_content in code_files.items():
        file_name = os.path.basename(file_path)
        full_path = os.path.join(base_dir, "anime_app", file_name)

        with open(full_path, "w", encoding="utf-8") as f:
            f.write(file_content)
        print(f"✅ Wrote {full_path}")


create_project_from_json(result, base_dir=".")
