from google import genai

client = genai.Client(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ") 

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents="Explain AI in simple words"
)

print(response.text)
