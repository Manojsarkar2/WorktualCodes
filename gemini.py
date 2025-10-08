import google.generativeai as genai
import os

genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")

model = genai.GenerativeModel("gemini-2.0-flash")

frontend_content = """
Frontend
- Modern, responsive UI using React + Tailwind CSS.
- Homepage with a search bar to find anime by title, genre, or rating.
- Recommendation feed that suggests anime based on user preferences.
- Anime detail page showing title, poster, description, genre, rating, number of episodes, and streaming links.
- User authentication (sign up, login, logout).
- A dashboard for logged-in users to save favorites, watchlists, and get personalized recommendations.

OUTPUT FORMAT
1:PROJECT STRUCTURE
2.NEED CODING FOR EVERY CODING FILE IN THE PROJECT STRUCTURE 

RULES
1:dont use **
2:dont need explanation just file path and code enough
"""

response = model.generate_content(
    f"You are a professional front-end developer. Convert this plan into implementation advice:\n\n{frontend_content}",
    generation_config={
        "max_output_tokens": 90000,
        "temperature": 0.3
    }
)

# Print model’s reply
print(response.text)
