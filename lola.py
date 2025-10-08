from fuzzywuzzy import process
import json
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import time
import re
import requests
import json
from datetime import datetime
from urllib import response
import requests
from typing import List,Dict
from typing import TypedDict,Union
# from intent_prediction import get_intent_from_query
from transformers import AutoModelForTokenClassification, tokenization_utils, AutoTokenizer
from functools import reduce
import pandas as pd
from transformers import pipeline
import re
import geocoder
import requests 
# from rag import get_documents
from datetime import datetime, timedelta
# from groq import Groq
from live_lola_prompt import *
from live_db_file import *
from rich import print
import pytz
# from intend_feb15 import get_lola_intent
from external_api import get_external_context
from intent import get_ecommerce_category
from live_rag import final_context
# from search_name import get_extension
# from intent import get_ecommerce_category
# from qa_lola_prompt_file import *
# from qa_db_file import *



model = AutoModelForTokenClassification.from_pretrained("./model4/")
 
tokenizer = AutoTokenizer.from_pretrained("./model4/")
#model = AutoModelForTokenClassification.from_pretrained("/root/worktual_vllm_streaming_live_2/data/entity_model_dec_22")
#tokenizer = AutoTokenizer.from_pretrained("/root/worktual_vllm_streaming_live_2/data/entity_model_dec_22")

pipe = pipeline("ner", model=model, tokenizer=tokenizer, aggregation_strategy="max")


def extract_sim_count(sentence):
    sentence_cleaned = sentence.replace(' ', '').replace('  ', '').replace('-', '')

    sim_pattern=r'\b[1-9]\b'

    sim_counts = re.findall(sim_pattern, sentence_cleaned, re.IGNORECASE)
    word_to_number = {
        'one': '1',
        'two': '2',
        'three': '3',
        'couple': '2',
        'triple': '3',
    }

    word_pattern = r'\b(?:' + '|'.join(re.escape(word) for word in word_to_number.keys()) + r')\b'

    word_matches = re.findall(word_pattern, sentence, re.IGNORECASE)

    mapped_word_matches = [word_to_number.get(word.lower(), word) for word in word_matches]
    all_numbers = sim_counts + mapped_word_matches

    numbers1 = re.findall(r'\b(?:[5-9]|[1-4][0-9]|50)\b', sentence)  # Updated pattern to match numbers 5-50
    # Mapping from word to number
    words_to_numbers1 = {"five": "5", "ten": "10", "twenty": "20", "thirty": "30", "forty": "40", "fifty": "50"}
    word_pattern1 = r'\b(five|ten|twenty|thirty|forty|fifty)\b(?=\s*SIMs?)'
    words1 = re.findall(word_pattern1, sentence, re.IGNORECASE)
    converted_numbers1 = [words_to_numbers1[word] for word in words1]

    all_numbers1 = numbers1 + converted_numbers1
    numbers_c = re.findall(r'\b(?:[0-9]+)\b', sentence)

    return {"Sim_count": all_numbers, "plan_prices": all_numbers1,"count":numbers_c}

def ent(text):
    entities = []
    # text = input("Enter: ")
    entities.append(extract_sim_count(text))
    response = pipe(f"{text}")  # Assuming `pipe()` function is defined elsewhere
   
    extracted_data = {
        'city': [],
        'postcode': [],
        'country': []
    }
   
    for i in response:
        if i['entity_group'] == 'city':
            extracted_data['city'].append(i['word'])
        elif i['entity_group'] == 'postcode':
            extracted_data['postcode'].append(i['word'])
        elif i['entity_group'] == 'country':
            extracted_data['country'].append(i['word'])
    return (extracted_data)


def get_weather(city_name):
    # Base URL for OpenWeatherMap API
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    api_key="7eca546d1de67193ea0b287226cb6a9f"
   
    # Complete URL
    complete_url = f"{base_url}q={city_name}&appid={api_key}&units=metric"
   
    # Sending the HTTP request
    response = requests.get(complete_url)
   
    # Checking the status code
    if response.status_code == 200:
        # Extracting data in JSON format
        data = response.json()
       
        # Extracting main block
        main = data['main']
        weather = data['weather'][0]
        temperature = main['temp']
        humidity = main['humidity']
        description = weather['description']      
        # # Print weather details
        # print(f"Temperature: {temperature}°C")
        # print(f"Humidity: {humidity}%")
        # print(f"Weather Description: {description.capitalize()}")
        return(f"The current weather is {description} in {city_name}, with a temperature of {temperature}°C and a humidity level of {humidity}%")
    else:
        return(f"Can you please provide the correct name of the city?,{city_name} is not correct")

def get_location_by_ip():
    try:
        # Get location data from IP address
        g = geocoder.ip('me')
       
        # Extract relevant details
        return {
            'ip': g.ip,
            'city': g.city,
            'region': g.state,
            'country': g.country,
            'latitude': g.latlng[0] if g.latlng else None,
            'longitude': g.latlng[1] if g.latlng else None
        }
    except Exception as e:
        return str(e)

def weather_check(user_input):
    result = ent(user_input)
    city = result['city'][0] if result['city'] else None
    country = result['country'][0] if result['country'] else None
    if result['city']:
        final=get_weather(city)  
    elif result['country']:
        final=get_weather(country)
    else:
        location_info = get_location_by_ip()
        city = location_info['city']
        final=get_weather(city)
    print(final)
    return final

class Conversation(TypedDict):
    User: str
    Assistant: str

class Memory():
    def __init__(self, user_name="User : ",ai_name = "Assistant : "):
        self.memory:List[Dict] = []
        self.user_name = user_name
        self.ai_name = ai_name

    def append_conversation(self,conversation:Conversation):
        self.memory.append(conversation)

    def clear_memory(self):
        self.memory = []

    def memory_as_string(self,num_conv:Union[int,None]=None):
        if num_conv == None or num_conv > len(self.memory) or num_conv <= 0:
            num_conv = len(self.memory)
        response_string = ''
        if len(self.memory) == 0:
            return response_string
        for conversation in self.memory[-num_conv:]:
            response_string = response_string +  "\n" + self.user_name + conversation["User"] + "\n"  + self.ai_name + conversation["Assistant"]
        return response_string

class Memory_Buffer(Memory):
    def __init__(self, buffer_size:int,**kwargs):
        super().__init__(**kwargs)
        self.buffer_size = buffer_size

    def append_conversation(self, conversation: Conversation):
        print(len(self.memory))
        if len(self.memory) == self.buffer_size:
            self.memory.pop(0)
        return super().append_conversation(conversation)
   
def get_memory(buffer_size:int=5):
    memory =  Memory_Buffer(buffer_size=buffer_size)
    return memory

#------------------ memory functions -----------------#

class Memorydict:
    memory_dict={}

def create_user_memory(session_id):
    if session_id not in Memorydict.memory_dict:
        Memorydict.memory_dict[session_id] = Memory_Buffer(buffer_size=100)
        return f"created successfully session id is {session_id}"
        
def get_user_memory(session_id):
    return Memorydict.memory_dict[session_id]

def update_history(session_id,user_input,bot_response):
    user_memory = get_user_memory(session_id)
    return user_memory.append_conversation({"User": user_input,"Assistant": bot_response})

def get_history(session_id,num_conv=5):
    user_memory = get_user_memory(session_id)
    return user_memory.memory_as_string(num_conv = num_conv)


class Summary:
    summary_dict={}

def update_summary(session_id,summary):
    Summary.summary_dict[session_id] = summary
    
def get_summary(session_id):
    return Summary.summary_dict[session_id]

#------------------ memory functions -----------------#

import threading

def threaded_task(func, *args, **kwargs):
    thread = threading.Thread(target=func, args=args, kwargs=kwargs)
    thread.start()
    return thread

def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)
        
def calculate_age(birthdate_str):
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    today = datetime.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age 

from datetime import datetime, timedelta
def previous_summary(resident_name,residentId,domain_id):
    # Get the current time
    to_time = datetime.now()
    # Calculate the time 30 minutes earlier
    from_time = to_time - timedelta(minutes=30)
    # Print the results
    from_date=from_time.strftime('%Y-%m-%d %H:%M:%S')
    to_date=to_time.strftime('%Y-%m-%d %H:%M:%S')
    call_sp=get_con(domain_id,residentId,from_date,to_date)
    
    conversation=[]
    for entry in call_sp[0]:
        user=f"user:{entry['residentConversation']}"
        bot=f"assistance:{entry['botConversation']}"
        conversation.append(user)
        conversation.append(bot)
    result=convo_summarys(conversation,resident_name)
    return result
 
def get_final_response(input_text,session_id,login_user_id,domain_id,residentId,resident_name,isDual,number,labels,dateOfBirth,deviceId,p_timeZone):
    # try:
        start = time.perf_counter()
        print("Entering_time-->",datetime.now())
        msg = create_user_memory(session_id)
        query = input_text
        print("query---->", query)
        print("isDual---->",isDual)
        print("device_id---------",deviceId)
        chat_history = get_history(session_id, num_conv=1)
        history = get_history(session_id=session_id).strip()
        timezone = pytz.timezone(p_timeZone)
        # convo_summary=get_history(residentId, num_conv=3)
        # print("summarrrrrrrrrrryyyyyyyyyyyyy",convo_summary)
        # Get current time in the specified time zone
        current_time = datetime.now(timezone) 
        print("1111111111111111",current_time)
        if not query or len(query) <= 1:
            final_data= {
                'bot_respones': "I'm not sure what you're asking. Could you clarify or rephrase your question?",
                'on_date':"",
                'intent': "empty",
                "number": "",
                "entity": "",
                "is_reminder": False
            }    
            # print("final_data******",final_data)
            inference_time = time.perf_counter()-start
            print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
            return final_data 
        if msg == None:
            convo_summary=get_summary(residentId)
            print("previous summaryyy",convo_summary)
            chat_history = get_history(session_id, num_conv=1)
            standalone_query = get_standalone_query(input_text, chat_history)
            user_input = standalone_query.replace("User:", "").replace("User :", "")
            print("standalone_query------------->", user_input)
        else:
            convo_summary=previous_summary(resident_name,residentId,domain_id)
            print("previous summaryyy",convo_summary)
            update_summary(residentId,convo_summary)
            user_input = query
            print("query--->", user_input)
        now_time = current_time
        now_date = current_date = current_time.now().strftime("%Y-%m-%d %A")
        starts = time.perf_counter()
        intent = get_ecommerce_category(user_input)
        # intent = value.split(": ")[1]
        inference_time = time.perf_counter()-starts
        print(f"{inference_time:.3f}s\t{intent},intentintent _TIME") 
        if intent == "make_a_call":
            if isDual == True:
                print("input_arg_isDual--->", isDual)
                contact_details = number  # This should be a list of dictionaries
                print("contact_detailsssss--->",contact_details)
                labels = labels  # This is the list of labels (e.g., ['Mobile', 'Home'])
                print("input_arg_labels--->",labels)
                label_choice = contact_name(user_input).strip()  # Example: user might input 'home' or 'Home'
                print('label_choice_prmpt--->',label_choice)
                best_match, score = process.extractOne(label_choice, labels)
                print(f"Best match: {best_match} (Score: {score})")
                if isinstance(contact_details[0], list):
                    contact_detail = [phone for sublist in contact_details for phone in sublist]
                else:
                    contact_detail = contact_details
                # contact_detail = [phone for sublist in contact_details for phone in sublist]
                # for phone in contact_detail:
                #     phone.pop('id', None) 
                # print('contact_detail--->',contact_detail)
                contact=[]
                lab=[]
                json_file_path = f'ContactData/{residentId}.json' 
                data = load_json(json_file_path)
                contact_names = [contact["name"] for contact in data["contacts"]]
                search_name = name_entity(user_input).strip()
                best_matchs_name = process.extractOne(search_name, contact_names)
                for phone in contact_detail:
                    print(f"{phone['label']}: {phone['number']}")
                    lab.append(phone['label'])  # Append only the label (string)
                    contact.append(phone)
                # print("similarity of label choice & label--->",label_choice,lab)
                best_match, score = process.extractOne(label_choice, lab)
                print(f"Best match: {best_match} (Score: {score})")
                if score > 60:  
                    selected_number = next(phone['number'] for phone in contact if phone['label'] == best_match)
                    # print("selected_number---->",selected_number)
                    num = selected_number.replace("'", "").strip()
                    # print("sending_number---->",num)
                    # print("in_phone---->",phone)
                    # print("contact_detail---->",contact_details)
                    final_data= {
                    'bot_respones': f"calling {best_matchs_name}",
                    'on_date': "",
                    'intent': intent,
                    'number': selected_number,
                    'entity': "",
                    'is_reminder': False,
                    'isCall': True,
                    'isDual': False,
                    'labels': "",  # Adjust as necessary, you can return the label here if needed
                    'deviceId': deviceId
                    }
                    # print("final_data***",final_data)
                    call_log_insert(residentId,2117004,domain_id,best_matchs_name,selected_number)
                    return final_data
                else:
                    response_weather=f"there is no number found with the label '{label_choice}' thank you"
                    response=call_response_prompt(user_input,response_weather,chat_history)
                    threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"there is no number found with the label '{label_choice}' thank you"))
                    threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                    # f"No number found with the label '{label_choice}'."
                    final_data= {
                    'bot_respones': response,
                    'on_date': "",
                    'intent': intent,
                    'number': "",
                    'entity': "",
                    'is_reminder': False,
                    'isCall': False,
                    'isDual':False,
                    "labels":"",
                    'deviceId': deviceId
                    } 
                    # print("final_data***",final_data) 
                    inference_time = time.perf_counter()-start
                    print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                    return final_data       
            json_file_path = f'ContactData/{residentId}.json' 
            data = load_json(json_file_path)
            contact_names = [contact["name"] for contact in data["contacts"]]
            search_name=name_entity(user_input).strip()
            best_match = process.extractOne(search_name, contact_names)
            if best_match:
                best_match_name, score = best_match
                threshold = 70  # Minimum acceptable score
                if score >= threshold:
                    best_match_contact = next(contact for contact in data["contacts"] if contact["name"] == best_match_name)
                    print(f"Best match: {best_match_name} (Score: {score})")
                    phone_numbers = best_match_contact["phoneNumbers"]
                    print("phone_numbers",phone_numbers,"phone_numbers")
                    if len(phone_numbers) == 0:
                        print("enter no number")
                        response_weather=f"{best_match_name} has no phone numbers."
                        response=call_response_prompt(user_input,response_weather,chat_history)
                        threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"{best_match_name} has no phone numbers in the contact."))
                        threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather=f"{best_match_name} has no phone numbers in the contact."))
                        final_data= {
                        'bot_respones': response,
                        'on_date': "",
                        'intent': intent,
                        'number': "",
                        'entity': "",
                        'is_reminder': False,
                        'isCall': False,
                        'isDual':False,
                        'deviceId': deviceId
                        } 
                        # print("final_data***",final_data) 
                        inference_time = time.perf_counter()-start
                        print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                        return final_data       
                    elif len(phone_numbers) == 1:
                        print("enter one number")
                        response_weather=f"calling for {best_match_name}"
                        threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"calling for {best_match_name}"))
                        threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                        final_data= {
                        'bot_respones': f"calling for {best_match_name}",
                        'on_date': "",
                        'intent': intent,
                        'number': f"{phone_numbers[0]['number']}",
                        'entity': "",
                        'is_reminder': False,
                        'isCall': True,
                        'isDual':False,
                        'deviceId': deviceId
                        } 
                        call_log_insert(residentId,2117004,domain_id,best_match_name,phone_numbers[0]['number'])

                        return final_data
                    else:
                        print("entering multiple phone numbers")
                        labels=[]
                        contact_details=[]
                        output_data=[]
                        for phone in phone_numbers:
                            print(f"  {phone['label']}: {phone['number']}")
                            contact_details.append(f"{phone['label']}: {phone['number']}")
                            labels.append({phone['label']})
                        
                        print("labelssss",labels)
                        label = [item.pop() for item in labels]
                        if len(label) > 0:
                            # Create text with values and their indices one by one
                            response_weather = f"{best_match_name} has multiple phone numbers:Which one would you like to call? Please tell the correct one: \n" + "\n\n".join(
                                [f"for the label is {value} or " for index, value in enumerate(label)]
                            )
                        print(contact_details)
                        response=call_response_prompt(user_input,response_weather,chat_history)
                        threaded_task(update_history(session_id=session_id, user_input=input_text,bot_response=f"{best_match_name} has multiple phone numbers:Which one would you like to call? please tell the correct one {label}"))
                        threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))

                        final_data= {
                        'bot_respones': response,
                        'on_date': "",
                        'intent': intent,
                        'number': phone_numbers,
                        'entity': "",
                        'is_reminder': False,
                        'isCall': False,
                        'isDual':True,
                        'labels':[label],
                        'deviceId': deviceId
                        } 
                        print("****",final_data)
                        inference_time = time.perf_counter()-start
                        print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                        return final_data
                else:
                    response_weather=f"No name match found for the name '{search_name}' in the your contact."
                    threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"No name match found for the name '{search_name}'."))
                    threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                    response=call_response_prompt(user_input,response_weather,chat_history)
                    final_data= {
                    'bot_respones': response,
                    'on_date': "",
                    'intent': intent,
                    'number': "",
                    'entity': "",
                    'is_reminder': False,
                    'isCall': False,
                    'isDual':False,
                    'deviceId': deviceId
                    } 
                    # print("final_data***",final_data)
                    inference_time = time.perf_counter()-start
                    print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                    return final_data                   
            else:
                response_weather=f"No match found for the name '{search_name}'."
                response=call_response_prompt(user_input,response_weather,chat_history)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"No match found for the name '{search_name}'."))
                threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                final_data= {
                    'bot_respones': response,
                    'on_date': "",
                    'intent': intent,
                    'number': "",
                    'entity': "",
                    'is_reminder': False,
                    'isCall': False,
                    'isDual':False,
                    'deviceId': deviceId
                    } 
                # print("final_data****",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data
        elif isDual==True:
            print("222222222222222")
            print("input_arg_isDual--->", isDual)
            contact_details = number  # This should be a list of dictionaries
            print("contact_detailsssss--->",contact_details)
            labels = labels  # This is the list of labels (e.g., ['Mobile', 'Home'])
            print("input_arg_labels--->",labels)
            label_choice = contact_name(user_input).strip()  # Example: user might input 'home' or 'Home'
            print('label_choice_prmpt--->',label_choice)
            best_match, score = process.extractOne(label_choice, labels)
            print(f"Best match: {best_match} (Score: {score})")
            if isinstance(contact_details[0], list):
                contact_detail = [phone for sublist in contact_details for phone in sublist]
            else:
                contact_detail = contact_details
            # contact_detail = [phone for sublist in contact_details for phone in sublist]
            # for phone in contact_detail:
            #     phone.pop('id', None) 
            print('contact_detail--->',contact_detail)
            contact=[]
            lab=[]
            for phone in contact_detail:
                print(f"{phone['label']}: {phone['number']}")
                lab.append(phone['label'])  # Append only the label (string)
                contact.append(phone)
            print("similarity of label choice & label--->",label_choice,lab)
            best_match, score = process.extractOne(label_choice, lab)
            print(f"Best match: {best_match} (Score: {score})")
            if score > 60:  
                selected_number = next(phone['number'] for phone in contact if phone['label'] == best_match)
                print("selected_number---->",selected_number)
                num = selected_number.replace("'", "").strip()
                print("sending_number---->",num)
                print("in_phone---->",phone)
                print("contact_detail---->",contact_details)
                final_data= {
                'bot_respones': f"calling {best_match}",
                'on_date': "",
                'intent': intent,
                'number': selected_number,
                'entity': "",
                'is_reminder': False,
                'isCall': True,
                'isDual': False,
                'labels': "",  # Adjust as necessary, you can return the label here if needed
                'deviceId': deviceId
                }
                # print("final_data***",final_data)
                call_log_insert(residentId,2117004,domain_id,best_match,selected_number)
                return final_data
            else:
                response_weather=f"there is no number found with the label '{label_choice}' thank you"
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=f"there is no number found with the label '{label_choice}' thank you"))
                threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                response=call_response_prompt(user_input,response_weather,chat_history)
                final_data= {
                'bot_respones': response,
                'on_date': "",
                'intent': intent,
                'number': "",
                'entity': "",
                'is_reminder': False,
                'isCall': False,
                'isDual':False,
                "labels":"",
                'deviceId': deviceId
                } 
                return final_data 
        elif intent == "check_weather":
            try:
                response_weather = weather_check(query)
                response=weather_response_prompt(user_input,response_weather,chat_history)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_weather))
                threaded_task(conversation_insert(domain_id,residentId,user_input,response_weather))
                final_data= {'bot_respones': response,'on_date': "", 'intent': intent,"number": "","entity": "", "is_reminder": False,'isDual':False,'deviceId': deviceId}
                # print("final_data***",final_data) 
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data 
            except KeyError:
                bot_responses_1 = "I'm not sure what you're asking. Could you clarify or rephrase your question?"
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=bot_responses_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input,bot_responses_1))
                final_data= {'bot_respones': bot_responses_1,'on_date': "", 'intent': intent,"number": "", "entity": "","is_reminder": False,'isDual':False,'deviceId': deviceId}
                # print("final_data***",final_data) 
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data 
        elif intent == "reminder_intent":
            text = remainder_message(user_input).strip()
            print("remainder_message-->",text)
            timezone = pytz.timezone(p_timeZone)
            # Get current time in the specified time zone
            current_time = datetime.now(timezone)   
            print("11111111111111",current_time)
            # now = current_time.now()
            # print("222222222",now)
            current_date = current_time.now().date()
            print("222222222",current_date)
            formatted_date = current_time.strftime("%Y-%m-%d")
            extracted_info = date_time_entity(query, current_time)
            print("extracted_info-->", extracted_info)
            pattern = r"'(\w+)':\s*'([^']*)'"
            matches = re.findall(pattern, extracted_info)
            print("matches-->",matches)
            if not matches:
                print("matchesmatches")
                current_date = current_time.now().date()
                formatted_date = current_time.strftime("%Y-%m-%d")
                message = remainder_message(user_input).strip()
                title = extract_key_reminder(user_input).strip()
                current_time = current_time.now()
                current_hour = current_time.hour
                current_minutes = current_time.minute
                key_value_pairs = {
                    "hour": current_time.strftime("%I"),  # Hour in 12-hour format
                    "minutes": current_time.strftime("%M")  # Minutes
                }
                times = json.dumps([f'{key_value_pairs["hour"]}:{key_value_pairs["minutes"]}'])
                rmd = reminder_response_prompt(user_input,history)
                response_1=rmd.replace("(set_reminder)", "")
                match = re.search(r"\((.*?)\)", response_1)
                if match:
                    keyword = match.group(1)
                    print(keyword)  # Output: set_reminder
                    key = keyword                    
                else:
                    key = None
                if key == "set_reminder":
                    insert_sp = reminder_insert(None, residentId, title, message, formatted_date, formatted_date, domain_id, times,login_user_id,p_timeZone)
                else:
                    print("wwwwwwwwww")
                # insert_sp = reminder_insert(None, residentId, title, message, formatted_date, formatted_date, domain_id, times,login_user_id,p_timeZone)
                now = datetime.now()
                # context,details=final_context(domain_id,residentId,user_input)
                standalone_query_context=intent_context(user_input)
                standalone_query_context=standalone_query_context.strip()
                if "external" in standalone_query_context:
                    standalone_query_context == "external context"
                else:
                    standalone_query_context == "context"
                if standalone_query_context == "context":
                    # context = context
                    context,details=final_context(domain_id,residentId,user_input)
                    external_context=""
                elif standalone_query_context == "external context":
                    external_context=get_external_context(user_input,n_result=2)
                    context=""
                else:
                    print("-----------------------------------error in contexty and external context")
                age=calculate_age(dateOfBirth)
                # response_1 = response_prompt(query,user_input,external_context, context, history, resident_name, details,now_time,now_date,age,convo_summary)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input, response_1))
                final_data= {'bot_respones': response_1,'on_date':formatted_date,'intent': intent, "number": "", "entity": key_value_pairs, "is_reminder": True,'deviceId': deviceId}
                # print("final_data***",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data

            key_value_pairs = dict(matches)
            print("key_value_pairs---->",key_value_pairs)
            if not key_value_pairs.get('hour'):      
                print("hourhourhour")
                # now = current_time.now()
                current_date = current_time.now().date()
                formatted_date = current_time.strftime("%Y-%m-%d")
                message = remainder_message(user_input).strip()
                title = extract_key_reminder(user_input).strip()
                current_time = current_time.now()
                current_hour = current_time.hour
                current_minutes = current_time.minute
                key_value_pairs = {
                    "hour": current_time.strftime("%I"),  # Hour in 12-hour format
                    "minutes": current_time.strftime("%M")  # Minutes
                }
                times = json.dumps([f'{key_value_pairs["hour"]}:{key_value_pairs["minutes"]}'])
                rmd=reminder_response_prompt(user_input,history)
                response_1=rmd.replace("(set_reminder)", "")
                match = re.search(r"\((.*?)\)", rmd)
                if match:
                    keyword = match.group(1)
                    print(keyword)  # Output: set_reminder
                    key = keyword                    
                else:
                    key = None
                if key == "set_reminder":
                    insert_sp = reminder_insert(None, residentId, title, message, formatted_date, formatted_date, domain_id, times,login_user_id,p_timeZone)
                else:
                    print("wwwwwwwwww")
                print("newwwwwwwwwwwwwwww----->new_response",rmd)
                # insert_sp = reminder_insert(None,residentId, title, message, formatted_date, formatted_date, domain_id, times,login_user_id,p_timeZone)
                now = current_time.now()
                # con = {
                #     "domain_id": domain_id,
                #     "residentId": residentId,
                #     "user_query": user_input
                # }
                # context,details = requests.post("http://46.43.144.145:7085/context", json=con).json()
                # print("allergy details---->",details)
                # print("contextcontext----------->",context)
                standalone_query_context=intent_context(user_input)
                standalone_query_context=standalone_query_context.strip()
                if "external" in standalone_query_context:
                    standalone_query_context == "external context"
                else:
                    standalone_query_context == "context"
                if standalone_query_context == "context":
                    context,details=final_context(domain_id,residentId,user_input)

                    external_context=""
                    # print("context---->",context)
                elif standalone_query_context == "external context":
                    external_context=get_external_context(user_input,n_result=2)
                    context=""
                    details=""
                else:
                    context,details=final_context(domain_id,residentId,user_input)
                    external_context=""
                age=calculate_age(dateOfBirth)
                # response_1 = response_prompt(query,user_input,external_context, context, history, resident_name, details,now_time,now_date,age,convo_summary)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input, response_1))
                final_data= {'bot_respones': response_1,'on_date':formatted_date,'intent': intent, "number": "", "entity": key_value_pairs, "is_reminder": True,'deviceId': deviceId}
                # print("final_data***",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data
            if not key_value_pairs.get('date'):
                print("datedatedatedate")
                current_date = current_time.now().date()
                formatted_date = current_time.strftime("%Y-%m-%d")
                message = text
                title = extract_key_reminder(user_input).strip()
                times = json.dumps([f'{key_value_pairs["hour"]}:{key_value_pairs["minutes"]}'])
                print(times,"times")
                rmd=reminder_response_prompt(user_input,history)
                print("newwwwwwwwwwwwwwww----->new_response",rmd)
                response_1=rmd.replace("(set_reminder)", "")
                match = re.search(r"\((.*?)\)", rmd)
                if match:
                    keyword = match.group(1)
                    print(keyword)  # Output: set_reminder 
                    key = keyword                    
                else:
                    key = None
                if key == "set_reminder":
                    insert_sp = reminder_insert(None, residentId, title, message, formatted_date, formatted_date, domain_id, times,login_user_id,p_timeZone)
                else:
                    print("wwwwwwwwww")
                # insert_sp = reminder_insert(None, residentId, title, message, formatted_date, formatted_date, domain_id, times, login_user_id,p_timeZone) 
                standalone_query_context=intent_context(user_input)
                standalone_query_context=standalone_query_context.strip()
                if "external" in standalone_query_context:
                    standalone_query_context == "external context"
                else:
                    standalone_query_context == "context"
                if standalone_query_context == "context":
                    context,details=final_context(domain_id,residentId,user_input)
                    external_context=""
                elif standalone_query_context == "external context":
                    external_context=get_external_context(user_input,n_result=2)
                    context=""
                    details=""
                else:
                    context,details=final_context(domain_id,residentId,user_input)       
                    external_context=""
                    # print("context---->",context)   
                age=calculate_age(dateOfBirth)
                # response_1 = response_prompt(query,user_input,external_context, context, history, resident_name, details,now_time,now_date,age,convo_summary)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input,response_1))
                final_data= {'bot_respones': response_1,'on_date':formatted_date,'intent': intent, "number": "", "entity": key_value_pairs, "is_reminder": True,'deviceId': deviceId}
                print("***final_data",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data
            else:
                print("elseeeeeeeeeee")
                current_date = current_time.now().date()
                formatted_date = current_time.strftime("%Y-%m-%d")
                message = text
                title = extract_key_reminder(user_input).strip()
                times = json.dumps([f'{key_value_pairs["hour"]}:{key_value_pairs["minutes"]}'])
                rmd=reminder_response_prompt(user_input,history)
                print("newwwwwwwwwwwwwwww----->new_response",rmd)
                response_1=rmd.replace("(set_reminder)", "")
                match = re.search(r"\((.*?)\)", rmd)
                if match:
                    keyword = match.group(1)
                    print(keyword)  # Output: set_remindernewwwwwwwwwwwwwwww-----
                    key = keyword                    
                else:
                    key = None
                if key == "set_reminder":
                    insert_sp = reminder_insert(None, residentId, title, message, key_value_pairs["date"], key_value_pairs["date"], domain_id, times,login_user_id,p_timeZone)
                else:
                    print("wwwwwwwwww")
                    # insert_sp = reminder_insert(None, residentId, title, message, key_value_pairs["date"], key_value_pairs["date"], domain_id, times,login_user_id,p_timeZone)
                # insert_sp = reminder_insert(None, residentId, title, message, key_value_pairs["date"], key_value_pairs["date"],domain_id, times,login_user_id,p_timeZone)
                now = current_time.now()
                # con = {
                #     "domain_id": domain_id,
                #     "residentId": residentId,
                #     "user_query": user_input
                # }
                # context,details = requests.post("http://46.43.144.145:7085/context", json=con).json()
                
                # context,details=final_context(domain_id,residentId,user_input)       
                # print("allergy details---->",details)
                standalone_query_context=intent_context(user_input)
                standalone_query_context=standalone_query_context.strip()
                if "external" in standalone_query_context:
                    standalone_query_context == "external context"
                else:
                    standalone_query_context == "context"
                if standalone_query_context == "context":
                    context,details=final_context(domain_id,residentId,user_input)       

                    external_context=""
                    # print("context---->",context)
                elif standalone_query_context == "external context":
                    external_context=get_external_context(user_input,n_result=2)
                    context=""
                    details=""
                    
                    # print("external_context---->",context)
                else:
                    context,details=final_context(domain_id,residentId,user_input)       
                    external_context=""
                    # print("context---->",context)   
                age=calculate_age(dateOfBirth)
                # response_1 = response_prompt(query,user_input,external_context, context, history, resident_name, details,now_time,now_date,age,convo_summary)
                # print("response--->", response_1)
                print(f"[blue]{response_1}[/blue]")  # Name in blue
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input, response_1))
                final_data= {'bot_respones': response_1,'on_date':formatted_date,'intent': intent, "number": "", "entity": key_value_pairs, "is_reminder": True,'deviceId': deviceId}
                # print("final_data***",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data
        else:
            try:
                resident_name = resident_name
                resident_id = residentId
                now = current_time.now()
                # context = get_documents(user_input, resident_id)
                # print(context)
                standalone_query_context=intent_context(user_input)
                standalone_query_context=standalone_query_context.strip()
                # con = {
                # "domain_id": domain_id,
                # "residentId": residentId,
                # "user_query": user_input
                # }
                # context,details = requests.post("http://46.43.144.145:7085/context", json=con).json()
                # context,details=final_context(domain_id,residentId,user_input)       
                # print("allergy details---->",details)
                if "external" in standalone_query_context:
                    standalone_query_context == "external context"
                else:
                    standalone_query_context == "context"
                # standalone_query_context=standalone_query_context.strip()
                if standalone_query_context == "context":
                    context,details=final_context(domain_id,residentId,user_input) 
                    context = context
                    external_context=""
                elif standalone_query_context == "external context":
                    external_context=get_external_context(user_input,n_result=2)
                    context=""
                    details=""
                else:
                    print("-----------------------------------error in contexty and external context")
                    context,details=final_context(domain_id,residentId,user_input) 
                    external_context=""
                    # context=""
                age=calculate_age(dateOfBirth)
                response_1 = response_prompt(query,user_input,external_context, context, history, resident_name, details,now_time,now_date,age,convo_summary)
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=response_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input, response_1))
                final_data= {'bot_respones': response_1,'on_date':"", 'intent': intent,"number":"", "entity": "","is_reminder": False,'deviceId': deviceId}
                # print("final_data***",final_data)
                inference_time = time.perf_counter()-start
                print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return final_data
            except KeyError:
                bot_responses_1 = "I'm not sure what you're asking. Could you clarify or rephrase your question?"
                threaded_task(update_history(session_id=session_id, user_input=input_text, bot_response=bot_responses_1))
                threaded_task(conversation_insert(domain_id,residentId,user_input, bot_responses_1))
                inference_time = time.perf_counter()-start
                # print(f"{inference_time:.3f}s\t{final_data},LLM _TIME") 
                return {'bot_respones': bot_responses_1,'on_date':"", 'intent': intent,"number": "", "entity": "", "is_reminder": False,'deviceId': deviceId}
    # except Exception as e:
    #     print("main Exception error", e)
    #     bot_responses_1 = "I'm not sure what you're asking. Could you clarify or rephrase your question?"
    #     update_history(session_id=session_id, user_input=input_text, bot_response=bot_responses_1)
    #     inference_time = time.perf_counter()-start
    #     print(f"{inference_time:.3f}s\t{bot_responses_1},LLM _TIME") 
    #     return {'bot_respones': bot_responses_1,'on_date':"",'intent': "error","number": "", "entity": "", "is_reminder": False,'deviceId': deviceId}
        
# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=7796)