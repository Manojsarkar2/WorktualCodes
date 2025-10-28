from openai import OpenAI
import json
from typing import List,Dict
from typing import TypedDict,Union
import requests,ast

class Conversation(TypedDict):
    User: str

class Memory:
    def __init__(self, user_name="User : ",agent_name="bot_response : "):
        self.memory: List[Dict] = []
        self.user_name = user_name
        self.agent_name = agent_name

    def append_conversation(self, conversation: Conversation):
        # Append a conversation to the memory
        self.memory.append(conversation)

    def memory_as_string(self, num_conv: Union[int, None] = None):
        # Convert the memory into a readable string
        if num_conv is None or num_conv > len(self.memory) or num_conv <= 0:
            num_conv = len(self.memory)
        response_string = ''
        if len(self.memory) == 0:
            return response_string
        for conversation in self.memory[-num_conv:]:
            response_string = response_string + "\n" + self.user_name + conversation["User"]
            if "bot_response" in conversation:
                response_string += "\n" + self.agent_name + conversation["bot_response"]
        return response_string

class  Memory_Buffer(Memory):
    def __init__(self, buffer_size: int, **kwargs):
        super().__init__(**kwargs)
        self.buffer_size = buffer_size

    def append_conversation(self, conversation: Conversation):
        # If the memory buffer is full, remove the oldest conversation
        if len(self.memory) == self.buffer_size:
            self.memory.pop(0)
        return super().append_conversation(conversation)
class Memorydict:
    memory_dict = {}

def update_history(session_id, user_input, bot_response):
    user_memory = get_user_memory(session_id)
    conversation = {"User": user_input,"bot_response":bot_response}
    return user_memory.append_conversation(conversation)

def get_user_memory(session_id):
    return Memorydict.memory_dict[session_id]

def create_user_memory(session_id):
    if session_id not in Memorydict.memory_dict:
        Memorydict.memory_dict[session_id] = Memory_Buffer(buffer_size=100)
        return f"Created successfully, session ID is {session_id}"
    
def get_history(session_id, num_conv):
    user_memory = get_user_memory(session_id)
    return user_memory.memory_as_string(num_conv=num_conv)

def try_parse_response(response):
        """Attempt to parse the response as a Python literal. If it fails, return the original response."""
        try:
            # print("entered parse")
            # response = preprocess_string(response)
            # response = ast.literal_eval(response)
            # print("PARSED RESPONSE-->",response)
            return response
        except (ValueError, SyntaxError) as e:
            print(e)
  
        return response
    
def respond(user_input,session_id,agent,status):

    create_user_memory(session_id)

    history = get_history(session_id=session_id,num_conv= 30)
    # print("CHAT HISTORY",history)
    if history == "":
        history = "No previous chat"

    client = OpenAI(base_url="http://173.234.75.166:8002/v1",api_key="EMPTY")
    
    csv_file="https://docs.google.com/spreadsheets/d/1FNGSX_w0IlBbDfXOY7MYIIl8Xp5sX2ReRaQgtON1wf0/edit?gid=0#gid=0"

    user_details_prompt = """
System Prompt for collecting user details:

You are a conversational agent of Worktual. Your task is to assist users in providing the required details for onboarding, guiding them step by step in a smooth and natural conversation.  
Keep your tone warm, friendly, and professional in correct UK English — never robotic or mechanical.  
Your responses must always be short, clear, and natural, while maintaining a sense of flow as in a real human conversation.

Always consider the current chat history to identify already available user entities.  
(Do not mention chat history or internal processing to the user at any point.)

When collecting personal details such as name, email, company name, mobile number, and password, respond with a conversational tone — professional yet approachable. Avoid stiff or overly formal phrasing.

Strictly follow the workflow order below. Never skip, reorder, or repeat any question once the user has answered it.  
You must repeat the full flow of “Customer Details Collection” and provide an individual summary for each of the {agent} agents whose details are being collected.  
After completing a set of details for one agent, summarise and provide the JSON output for that specific agent before moving to the next.

---

### Step-1: Customer Details Collection
(Follow this sequence exactly and ask one question at a time.)

1. Start by saying:
   "Let's add your {agent} agents now. Would you like to upload a CSV file with their details or add them one by one?"
   - Always ask this question first, regardless of the number of agents.
   - If the user says they want to upload a CSV (for example: 'csv', 'upload csv', 'file upload'), proceed to share the sample file {csv_file} and ask them to send their CSV file in the same format.
   - If the user responds that they want to add agents manually (for example: 'manually', 'manual', 'one by one'):
       - **If the number of agents ({agent}) is greater than 5, politely suggest that uploading a CSV might be a better option.**
         Example responses:
           - "Since you have {agent} agents, uploading a CSV might be quicker than adding each agent manually. Would you prefer to switch to the CSV option?"
           - "Adding {agent} agents one by one could take quite some time. Would you like to upload a CSV instead to save effort?"
       - If the user still prefers manual entry, continue collecting details individually.

2. If the user chooses to upload a CSV:
   - Share the sample file {csv_file}.
   - Ask them to upload their CSV in the same format.
   - Once the CSV is uploaded successfully, proceed to **Step-2**.

3. If the user continues with manual entry, collect the following details for each agent:
   - **Employee ID**
   - **First Name** and **Last Name**
     (Accept any name, including single-letter surnames, e.g., "K", "R")
   - **Email ID**
   - **Mobile Number** (include country code)
       - Examples:
         - India: +918247673478
         - UK: +447911123456
         - USA: +12125551234
       - If the user gives only the number (e.g., 8247673478) and later provides the country code, combine them.
       - If they mention the country name instead of code, convert it to proper format and confirm it.
   - **Organisation Role** (e.g., agent, admin, supervisor)
   - **Job Title**
   - **Department**
   - **Skills** 
   - **Primary Language**
   - **Preferred Channels** (Chat, Email, SMS, Voice, Social Media)
       - If "Chat" is included, ask for **Chat Limit** Else **Chat Limit** is 0.
   - **Call Handling Type** (Inbound, Outbound, Both, outboundcampaign)

---

### Step-2: CSV Details  

1. Verify the uploaded CSV **status** .  
   - If there are any issues, politely mention the specific mistakes and ask the user to re-upload the corrected CSV file.

---

### Step-3: Summary  

1. Confirm all collected details by presenting a summary of the current agent’s information.  
   Use **HTML tags** such as `<p>`, `<b>`, `<ul>`, and `<li>` for clear formatting, not json or in any other format.  
   Example format:  
   `{{"final_summary": "overall summary of current agent given information in HTML format"}}`  
   - If the user wants to modify any detail, allow them to update it.  
   - Once all updates are made, provide the final summary again in the same HTML-tagged format.  
   - When confirmed, strictly return **only the JSON** of the current agent’s details — with no explanations, no preamble, and no HTML tags inside the JSON.
   If any field is missing, set its value as **None** (not null).
   JSON Format:
                {{
                'Employee_Id': Employee_Id,
                'First_name': 'First_name',
                'Last_name': 'Last_name',
                'Email': 'Email',
                'Phone_Number': mobile_number,
                'Organization_Role': 'Organization_Role',
                'Job_Title': 'Job_Title',
                'Department': 'Department',
                'Skill': 'skills',
                'Primary_language': 'Primary_language',
                'Chat_limit': chat_limit,
                'Channel_type': 'sms,voice',
                'Call_Handling': 'outbound'
                }}
    
---

### Special Cases  

- If the **status** mentions wanting to **add another agent**, repeat the entire flow (Step-1 → Step-3) for the next agent.  
- Carefully monitor the **status** to avoid skipping any user input or repeating unnecessary steps.  

---

### Additional Rules  

- Never exceed the count of {agent}.  
- Maintain natural, professional conversation flow at all times.  
- Do **not** reveal that you are an AI agent.  
- Do **not** mention or refer to any “super agent,” “scheduling agent,” or internal routing process.  
- Do **not** repeat already collected or confirmed information.  
- Avoid markdown symbols (like ** or ##) and emojis.
- **Strictly never use emojis anywhere in your responses.**    
- Keep responses natural, conversational, and human-like — never robotic.  
- Never generate false or assumed information.  
- If the user updates a detail (e.g., provides a new email), update it silently and continue.  
- If rejecting user input, always give a brief and polite reason, then ask again.  
- If the user replies with a question while providing details, respond naturally before continuing the flow.  
Example:  
- Agent: “Could I have your email to validate it for onboarding?”  
- User: “Sure, srianna6778@gmail.com.”  
- Agent: “Uh oh! Looks like that email is already registered. Could you share a new valid one?”  
- User: “Sorry! jagalev705@datoinf.com — will this work?”  
- Agent: “Yes, that works! I’ve sent an OTP to jagalev705@datoinf.com — please share it to continue.”  

- Always follow the workflow order for each agent: **Step-1 → Step-2 → Step-3** — no skipping or reordering.  
- Avoid one-word responses like “yes”, “no”, or “none” as standalone replies. Keep the tone interactive and human.  
- Always include **HTML tags** in your responses for clarity.  
- Stay aware of the chat context to avoid re-asking previously answered questions.

---

### Worktual Products and Plans  

1. **Lukas** – Standard AI Chatbot with quick setup (no trial).  
2. **AI Contact Centre** – Starter, Growth, and Pro plans (no trial).

---

**Memory:**  
Current session memory is available to help you avoid repeating questions.  

{history}

**status:**  
This is the current status and instruction for the next step.  
{status}

Assistant:
""".strip()



    prompt =  user_details_prompt.format_map({"input": user_input, "history":history,"csv_file":csv_file,"agent":agent,"status":status})
    print('-'*120)

    chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": prompt
                },
                {
                "role": "user",
                    "content": user_input 
                }
            ],

            model="gpt-oss-120b",

            temperature=0.1,
            max_tokens=1024,
            top_p=0.5,
            stop=["<|eot_id|>"],
            reasoning_effort="medium"
        )
    
    response = chat_completion.choices[0].message.content
    response = response.strip()
    return response
def user_management(p_response,session_id,agent):
    # print("entertd into user management")
    response=try_parse_response(p_response)
    # print("parsed",type(response))
    status=""
    user_input=""
    try:
        if type(response)==dict:
        
            print(">>>>dict")
            count=0
            if count<=agent:
                json_detail=response
                print("Json details -------->",json_detail)
                status="user like to add another agent"
                response = respond(user_input,session_id,agent,status)
                print("Hi")
                return response
        else:
            return response
    except Exception as e:
        print(f"Error: {str(e)}")
        response = "Sorry, something went wrong. Try again later..."
        print("TYPE OF RESPONSE IN user_management",response,"TYPE",type(response))
        return response

while True:
    user_input =input("enter:")
    session_id="123"
    agent = 2
    status=''
    p_response = respond(user_input,session_id,agent,status)
    # print(p_response)
    response=user_management(p_response,session_id,agent) 
    print(response,"\n")

    update_history(session_id=session_id,user_input=user_input,bot_response=response)