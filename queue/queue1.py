import google.generativeai as genai
import json
import mysql.connector

genai.configure(api_key="AIzaSyDxisQsGZW_T5xwMstrowF0-p7yX7H_LEQ")
model = genai.GenerativeModel("gemini-2.5-flash")


#For inserting in DB
def ccaas_call_update_callMap_sourceid_details(bt_number,domain_id):
    # p_sourceId varchar(255),#number
    # p_domainId int,
    # p_callFlowId varchar(255)#null
    p_sourceId=bt_number
    p_domainId=domain_id
    p_callFlowId=None
    
    connection = None
    cursor = None
    try:
        connection = mysql.connector.connect(
            host='10.150.0.176',
            database='ccaas_ai',
            user='ccaasdev',  
            password='ccAAsdev@435'
        )
        cursor = connection.cursor(dictionary=True)
        cursor.callproc(
            "ccaas_call_update_callMap_sourceid_details",[p_sourceId, p_domainId, p_callFlowId]
        )

        result = [result.fetchall() for result in cursor.stored_results()]
        connection.commit()
        return result

    except Exception as e:
        print(f"EXCEPTION IN ccaas_call_update_callMap_sourceid_details DB Error : {e}")
    finally:
        if cursor:
            cursor.close()
        if connection:
            connection.close()
            
            
            
#To get the details for the DB
def ur_myaccount_get_main_number(extension,domain_id, Ord_Id):
    
    connection = None
    cursor = None
    try:
        connection = mysql.connector.connect(
            # host='10.150.0.176',
            host="10.150.0.53",
            database='unifiedring',
            user='JAVAteam',  
            password='JAVAteam@123'
        )
        cursor = connection.cursor(dictionary=True)
        res = cursor.callproc(
            "ur_myaccount_get_main_number",[extension,domain_id, Ord_Id]
        )

        final_result = [result.fetchall() for result in cursor.stored_results()]

        return final_result

    except Exception as e:
        print(f"EXCEPTION IN DB Error : {e}") 



flow_prompt = """
        You are a detail collector assistant.

        Collect the following details from the user:
        1. id
        2. name
        3. description (optional) -> if user skip set it as null
        4. domainId
        5. settingAudio -> set as null(do not ask to user)
        6. announcement :
                        type -> set 0 (do not ask)
                        text to speech -> ask text(sentence)

                        announcement_value -> choose either one [no announcement,queue number announcement, queue wait time announcement, offers and promotions announcement]
                        if no announcement is selected there is no need to collect voicemail, callback, frequency otherwise collect them.
                        voicemail -> 0 or 1
                        callback -> 0 or 1
                        frequency -> int between 1 to 60
        7.  maximum callers :
                            type -> Either No Limit or Set Max. Caller limit
                            limitResponseType -> set 0 (do not ask)
                            queueLimit -> only if type is Set Max. Caller limit ask a int otherwise leave it as 0,
                            overFlowQueueName -> ask a name for overflow queue eg(default queue, snowflake queue),
                            overFlowQueue -> set 0 (do not ask)
        8. maximumWaitTime :
                            type -> Either keep waiting or not waiting
                            maxWaitTime -> if type is keep waiting ask maxwaitTime or set it as 0
                            fallBackQueue -> 0 or 1
                            file -> just assign {}
                            timeElapsed -> 0 or 1
                            timeElapsedvalue -> assign ""
                            fallBackQueueName -> ask the fallBack Queue name
                            filename -> ask the file name
        
        9. outbound_call_status → if positive, set as true
        10. OutboundCallerId (optional)
        11. outBoundNumber → ask this only if outbound_call_status = true
        12. maxCallHandlingTimeMM -> should be convert to seconds
        13. callWrapUpTime -> should be convert to seconds
         
        
        
        
        
        

        Flow instructions:
        - Ask one missing detail at a time in a conversational tone.
        - Once all required details are collected, return ONLY valid JSON.
        - Optional fields can be empty if the user skips them.
        - Conditional fields like outBoundNumber should only appear if outbound_call_status = true.
        - JSON format must be like this sample payload:

        Strict rule:
        If the user leave the mandatory feild as empty one or any irrelevant answer, polity ask them again to giive valid one
        If the user name is not an actual name ask again politly
        If all the madatory feild is collected just give the payload response, no need for additional text like (I have collected all the details. Here is the JSON payload:)

        payload:
        {
        "id": "2632",
        "name": "John Doe",
        "description": "Sales department",
        "domainId": "7179",
        "settingAudio": "",
        "announcement": "",
        "maximumCallers": {
            "type":"No Limit",
            "limitResponseType":0,
            "queueLimit":0,
            "overFlowQueueName":"",
            "overFlowQueue":0
            },
        "maximumWaitTime": {
            "type":"Keep Waiting",
            "maxWaitTime":0,
            "fallBackQueue":0,
            "file":{},
            "timeElapsed":0,
            "timeElapsedValue":"",
            "fallBackQueueName":"",
            "fileName":""
            },
        "outbound_call_status": true,
        "OutboundCallerId": "+1234567890",
        "outBoundNumber": "+0987654321",
        "maxCallHandlingTimeMM": 210,
        "callWrapUpTime": 50,
        
        }
        """

chat = model.start_chat(history=[])
print("Assistant_outside:", chat.send_message(flow_prompt).text)

collected_json = None

while True:
    user_input = input("You: ").strip()
    if not user_input:
        print("Please enter a valid response.")
        continue

    response = chat.send_message(user_input)
    bot_reply = response.text.strip()
    print("Assistant:", bot_reply)

    if bot_reply.startswith("```json") and bot_reply.endswith("```") :
        try:
            json_text = bot_reply.replace("```json", "").replace("```", "").strip()
            collected_json = json.loads(json_text)
            print("\n✅ Sample Payload Collected:")
            print(json.dumps(collected_json, indent=2))
            
            with open("collected_payload.json", "w") as f:
                json.dump(collected_json, f, indent=2)
            
            print("\n✅ Payload saved to collected_payload.json")
            break
        except json.JSONDecodeError:
            print("⚠️ JSON invalid, continue conversation...")
f = """

{
"type":"No Limit",
"limitResponseType":0,
"queueLimit":0,
"overFlowQueueName":"",
"overFlowQueue":0
}',

{
"type":"Keep Waiting",
"maxWaitTime":0,
"fallBackQueue":0,
"file":{},
"timeElapsed":0,
"timeElapsedValue":"",
"fallBackQueueName":"",
"fileName":""
},

"""