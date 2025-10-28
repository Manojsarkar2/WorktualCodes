from llm import GptOSS 

query = input("Query: ")

prompt = """
    Your are sql query generator
    
    user query:
    {query}
"""
llm = GptOSS()
pro = prompt.format(query = query)
response = llm.run(pro)

print(response)