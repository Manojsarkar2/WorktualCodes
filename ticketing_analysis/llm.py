from openai import OpenAI
class GptOSS:
    def __init__(
        self,
        url="http://173.234.75.166:8002/v1",
        api_key="",
        model="gpt-oss-120b",
        temperature=0.1,
        max_output_tokens=8092
    ):
       
        self.client = OpenAI(base_url=url, api_key=api_key)
        self.model = model
        self.temperature = temperature
        self.max_output_tokens = max_output_tokens

    def run(self, prompt, reasoning_effort="low"):
        
        try:
            response = self.client.responses.create(
                model=self.model,
                input=prompt,
                reasoning={"effort": reasoning_effort},
                temperature=self.temperature,
                max_output_tokens=self.max_output_tokens,
            )
            return response.output_text.strip()
        except Exception as e:
            return f"Error: {str(e)}"