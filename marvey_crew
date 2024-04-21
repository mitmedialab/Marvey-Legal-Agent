import os

from crewai import Agent, Task, Process, Crew

# Importing crewAI tools
from crewai_tools import (
    FileReadTool
)
meeting_notes_tool = FileReadTool('')
api = os.environ.get("OPENAI_API_KEY")

bd_consultant = Agent(
    role="Budget Director",
    goal="Analyze the budget documents and determine how the cost of the new AI tool can be fit into the budget",
    backstory="""You are a seasoned budget director at a law firm. Your expertise lies in analyzing budget documents and determining 
    the most effective way to allocate funds for new acquisitions. You have a keen understanding of timelines and can identify the best
    budget bucket (IT, innovation, special projects, etc.) to spend on and when to spend. Your insights are crucial in ensuring that the 
    firm can procure new tools while maintaining financial stability.""",
    verbose=True,
    allow_delegation=True,
)

# it_expert = Agent(
#     role="Internal IT Expert",
#     goal="Assess the compatibility of the new AI software with the law firm's internal AI and IT policies",
#     backstory="""You are an IT expert at the law firm, with a deep understanding of the firm's internal AI and IT policies. Your role 
#     is to ensure that any new software or tool adheres to these policies and integrates seamlessly with the existing infrastructure. You 
#     have a keen eye for detail and can identify potential compatibility issues before they arise. Your expertise is essential in ensuring 
#     that the firm adopts new technologies safely and efficiently.""",
#     verbose=True,
#     allow_delegation=True,
# )

contract_drafter = Agent(
    role="Contract Drafting Agent",
    goal="Draft deal terms for the procurement of the AI startup's tool by the law firm",
    backstory="""You are a contract drafting expert at the law firm. Your role is to create clear, concise, and legally binding agreements 
    for the procurement of new tools and services. You have a deep understanding of legal terminology and can translate complex requirements 
    into easily understandable terms. Your expertise is crucial in ensuring that the firm's interests are protected while fostering positive 
    relationships with vendors and partners.""",
    verbose=True,
    allow_delegation=True,
)

task1 = Task(
    description="""Analyze the meeting notes, email threads, and internal budget documents (IT budget, innovation budget, special projects budget) 
    to determine how the cost of the new AI tool can be fit into the budget. Identify the best budget bucket to spend on and when to spend, 
    considering quarterly budgets and timelines. Provide a detailed report with at least 10 bullet points addressing the most important areas 
    when it comes to budgeting for this procurement.""",
    agent=bd_consultant,
    async_execution=True
)

# task2 = Task(
#     description="""Review the internal AI and IT policies and assess the compatibility of the new AI software with these policies. Identify 
#     any potential issues or concerns and provide recommendations on how to address them. Write a detailed report with at least 10 bullet 
#     points addressing the most important areas when it comes to ensuring compatibility and adherence to the firm's policies.""",
#     agent=it_expert,
#     async_execution=True
# )

task3 = Task(
    description="""Analyze the diligence reports provided by the business development consultant and the IT expert agent. Draft clear 
    and concise deal terms for the procurement of the AI startup's tool by the law firm. Ensure that the terms protect the firm's interests 
    while fostering a positive relationship with the AI startup. The deal terms should include at least 10 key points and a timeline for the 
    procurement process.""",
    agent=contract_drafter,
    context=[task1]
)

crew = Crew(
    agents=[bd_consultant, contract_drafter],
    tasks=[task1, task3],
    verbose=2,
    process=Process.sequential,
)

result = crew.kickoff()

print("######################")
print(result)
