from llm import GptOSS 
import mysql.connector
import json

Table_prompt = """
        You are a SQL Table Finder.

        Your job is to find the table name(s) that match or are most relevant to the user's query.

        User query: {query}

              Table Schema:

            tb_TechSupportTicket(TechSupportTicketId bigint PRIMARY KEY, ServiceProviderCompanyId int, CustomerCompanyId int, TicketSubject varchar(500), TicketSourceId int, TicketStatusId int, IsReopen int, TicketTypeId int, PriorityId int, RequestorId int, AssignedToTeamId int, AssignedToGroupId int, AssignedTo int, ConfidenceScore tinyint, AssignedTo_Prev int, AssignedBy int, TicketChatId int, SessionId varchar(150), TagId text, ChannelTypeId int, ResponseDueDate datetime, ResponsedDate datetime, ResolutionDueDate datetime, ResolvedDate datetime, ClosedDate datetime, ResolveInformDate datetime, SLAconditionId int, IsDeleted tinyint, TicketAssignee tinyint, TicketLayout int, TicketDescription text, RootCause text, Resolution text, Summary text, TicketTagIdName text, TicketMode int, RequesterName text, TicketAssociateCustContact int, MergedWith bigint, isMergedTo int, FilesUpload json, ai_chat json, CreatedBy bigint, CreatedDate datetime, UpdatedBy bigint, UpdatedDate datetime)

            tb_TicketStatus(StatusId int PRIMARY KEY, StatusName varchar(20), IsDefault tinyint, SLATimer int, StatusColor varchar(10), IsActive tinyint, IsDeleted tinyint, OrderNo smallint, CompanyId int, ProductId int, CreatedBy bigint, CreatedDate datetime, UpdatedBy bigint, UpdatedDate datetime, StatusCategoryId int)

            tb_TicketType(TicketTypeId int PRIMARY KEY, CompanyId int, ProductId int, TicketTypeName varchar(50), TicketTypeDescription varchar(255), IsDefault tinyint, IsActive tinyint, IsDeleted tinyint, CreatedBy bigint, CreatedDate datetime, UpdatedBy bigint, UpdatedDate datetime)

            tb_User(UserID bigint PRIMARY KEY, myAccUserId int, UserName varchar(255), emailId varchar(255), directNumber bigint, address varchar(255), routing_profile_id int, report_to_UserID bigint, sipLoginId int, companyId int, domainId int, ext int, isActive tinyint, callTypeId int, inboundCall tinyint, outboundCampaignCall tinyint, roleid tinyint, localization varchar(20), currentSession varchar(100), isVoice tinyint, isVoiceCallTransfer tinyint, isAvailableForVoice tinyint, isChat tinyint, isChatTransfer tinyint, isEmail tinyint, isEmailTransfer tinyint, StatusID int, isSms tinyint, isSocialMedia tinyint, companyName varchar(64), addSkill json, voice int, chat int, email int, sms int, socialMedia int, chatLimit smallint, createdAt datetime, updatedAt datetime, stateTimer varchar(50), AssignedTime datetime, chatFlag tinyint, ProfileImage text, emp_id varchar(20))

            tb_TicketGroup(TicketGroupId int PRIMARY KEY, GroupName varchar(100), GroupDescription varchar(250), IsDeleted tinyint, CompanyId int, ProductId int, IsDefault tinyint, CreatedBy int, CreatedDate datetime, UpdatedBy int, UpdatedDate datetime)

            tb_TicketChat(TicketChatId int PRIMARY KEY, SessionId varchar(150), CompanyId int, ProductId int, RequestedCompanyId int, RequestedProductId int, Title varchar(100), Message json, CreatedDate datetime, UpdatedDate datetime)

            TypeCode(TypeCodeID int PRIMARY KEY, TypeCode varchar(50), TypeCodeName varchar(250), TypeGroupID int, IsActive tinyint, SortOrder int, CreatedAt datetime, UpdatedAt datetime)

            tb_companyDomain(companyId int PRIMARY KEY, domainId bigint, companyName varchar(255), website varchar(250), iscareHome tinyint, industryType varchar(100), isTechSupport tinyint, domain_name varchar(150), video_domain_name varchar(150), createdAt datetime, updatedAt datetime)

        
        Return all the most relevant table names and their schema maybe one or more for getting joins (for example: TypeCode(TypeCodeID int PRIMARY KEY, TypeCode varchar(50), TypeCodeName varchar(250), TypeGroupID int, IsActive tinyint, SortOrder int, CreatedAt datetime, UpdatedAt datetime))
        If unsure, say be more specific what u asked is unrelated to my knowledge.

        """



SQL_QUERY_GENERATION = """
You are an expert SQL Query generator for a Ticketing system using a **MySQL** database.

TASK:
- Convert the given natural language query into a valid SQL SELECT statement (DQL only — no INSERT, UPDATE, DELETE).
- Use **only** the provided schema and columns.
- Use COUNT to get counts and LIMIT for fetch example data, instead of fetching all data.
- Use value count method to get unique counts of values of a column based on the query.

INPUTS:
Available Tables and Columns:
{schema}

DATABASE RULES:
1. Use **MySQL syntax only** — valid functions include:
   - Current date: `CURDATE()`
   - Subtract days: `DATE_SUB(CURDATE(), INTERVAL N DAY)`
   - Extract date: `DATE(column_name)`
2. When joining tables:
   - Only join if a **common key** exists in the schema.
   - If no matching key is found, do not join.
3. Use safe assumptions for missing filters (e.g., last 30 days).
4. End the query with a semicolon.
5. Output only a **MySQL SELECT query**.
6. Do not assume columns that don’t exist.
7. Do not include connection or cursor statements.

OUTPUT FORMAT:

SELECT ... FROM table_name WHERE ...;

User Query: {query}
"""

final_response = """
You are an expert SQL response summarizer who explains results naturally — like speaking to a human, not a developer.

User query: {user_query}

SQL response: {sql_response}

Your task:
1. Read and interpret the SQL response based on the user’s query.
2. Write a short, natural, and meaningful summary (1–2 sentences) as if explaining it to a colleague. Avoid mentioning SQL, queries, or technical terms.
3. Then provide clear, factual reasoning steps that explain how you arrived at that summary — focus on what the data means, not how it was queried.

Output format (strictly follow):
Summary:
<short natural summary>

Reasoning steps:
1. <step 1>
2. <step 2>
3. <step 3>
"""



def table(query):
    llm = GptOSS()
    prompt = Table_prompt.format(query = query)
    response = llm.run(prompt)
    response.strip()
    return response


def generate_sql(schema, user_query):

    llm = GptOSS()
    prompt = SQL_QUERY_GENERATION.format(schema=schema, query=user_query)
    response = llm.run(prompt)
    return response

def final_sql(sql_response, user_query):
    llm = GptOSS()
    prompt = final_response.format(

        sql_response=sql_response,
        user_query=user_query
    )
    response = llm.run(prompt)
    return response



def execute_sql_query(query):

    connection = None
    try:
        connection = mysql.connector.connect(
            host="10.150.3.70",
            database="ccaas2023",
            user="ccaasdev",
            password="ccAAsdev@435"
        )

        cursor = connection.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()

        print("\nQuery Executed Successfully!")
        print(f"Rows fetched: {len(rows)}")


        for row in rows[:10]:
            print(row)

        return rows

    except Exception as e:
        print("SQL Execution Error:", e)
    finally:
        if connection and connection.is_connected():
            cursor.close()
            connection.close()


if __name__ == "__main__":

    while True:
        user_query = input("Query : ")
        schema_description = table(user_query)

        sql_query = generate_sql(schema_description, user_query)

        print("\nGenerated SQL Query:\n", sql_query)

        sql_response = execute_sql_query(sql_query)
        print('\n')
        print(final_sql(user_query,sql_response))
        print('\n')


        
