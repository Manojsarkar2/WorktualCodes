import requests

def hit_vllm_model(prompt):
    url = "http://46.43.144.145:8056/generate"
    payload = {
        "prompt": prompt,
        "stream": False
    }
    
    response = requests.post(url=url, json=payload)
    response_data = response.json()
    output = response_data["text"][0]
    return output

print(hit_vllm_model("national bird of india?"))