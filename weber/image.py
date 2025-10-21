import requests

HF_TOKEN = "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"
API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip2-opt-2.7b"
headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def query_blip2(image_path: str, question: str = None):
    with open(image_path, "rb") as f:
        files = {"image": f}
        data = {"question": question} if question else {}

        response = requests.post(API_URL, headers=headers, files=files, data=data)

    if response.status_code != 200:
        raise Exception(f"Request failed: {response.status_code}, {response.text}")
    return response.json()

if __name__ == "__main__":
    resp = query_blip2("z.png", question="What is the navbar background color?")
    print("Response:", resp)
