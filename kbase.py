from playwright.sync_api import sync_playwright
import requests


def hit_vllm_model(prompt, sampling_params):
    url = "http://46.43.144.145:8056/generate"
    payload = {
        "prompt": prompt,
        "stream": False
    }
    payload.update(sampling_params)  
    response = requests.post(url=url, json=payload)
    response_data = response.json()
    output = response_data["text"][0]
    return output.replace(prompt,"")


def make_prompt(text):
    return f"""
    ###system
    You are a helpful text summarizer.  
    Your task is to take the given raw text and summarize the whole text.
 

### TEXT: 
{text} 


### Assistant:"""

def extract_text(url):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        text = page.evaluate("() => document.body.innerText")
        browser.close()
        return text

def summarize(url):
    text = extract_text(url)
    prompt = make_prompt(text)
    sampling_params = {
        "temperature" : 0.6,
        "top_p" : 0.95,
        "max_tokens":1024,
   
        
        
    }
    summary = hit_vllm_model(prompt,sampling_params)
    print("\n================ SUMMARY ================\n")
    print(summary)
    print("\n=========================================\n")

if __name__ == "__main__":
    summarize("https://en.wikipedia.org/wiki/Indian_History_and_Culture_Society")
