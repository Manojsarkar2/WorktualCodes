import google.generativeai as genai


genai.configure(api_key="AIzaSyDFoxfl1B4zqAPEkEO1eLHov6MZ_qn5nJQ")  
model = genai.GenerativeModel("gemini-2.0-flash")

query = input("Query: ")

Table_prompt = f"""
        You are a SQL Table Finder.

        Your job is to find the table name(s) that match or are most relevant to the user's query.

        User query: "{query}"

        Database reference:
        SELECT * FROM tb_TechSupportTicket WHERE TechSupportTicketId = 3654;        -- Ticket Table
        SELECT * FROM tb_TicketStatus WHERE StatusId = 1221;
        SELECT * FROM tb_TicketType WHERE TicketTypeId = 13649;
        SELECT * FROM tb_User WHERE UserID = 11769;                                 -- AllUsers (Admin/Agent/Resolver)
        SELECT * FROM tb_TicketGroup WHERE TicketGroupId = 716;                     -- Department
        SELECT * FROM tb_TicketChat WHERE TicketChatId = 880;
        SELECT * FROM TypeCode WHERE TypeCodeID = 2003009;                          -- Priority, Channel
        SELECT * FROM tb_companyDomain WHERE companyId = 19920;                     -- Company (Customer/Tech Support)

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

response = model.generate_content(prompt)

print("\nPredicted Table Name:")
print(response.text.strip())
