import requests

def hit_hf_space(prompt):
    url = "https://huggingface-projects--tiny-llama.hf.space/run/predict"
    payload = {"data": [prompt]}
    response = requests.post(url, json=payload)
    return response.json()

print(hit_hf_space("Hello Hugging Face"))
