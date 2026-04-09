from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnableLambda
import json
import re

llm = OllamaLLM(model="deepseek-coder:6.7b")

template = """
    You are a senior software engineer doing a code review.

    Analyze the following code and provide:
    1. Bugs
    2. Performance issues
    3. Code quality improvements
    4. Security concerns
    5. Severity of the issues low, medium or high based on bugs, performance, quality and security issues.
    
    Rules:
    - Output ONLY valid JSON.
    - No explanations, no comments, no markdown.
    - Ensure proper quoting and no trailing commas.

    Return output in JSON format:
    {{
        "bugs": ["string"],
        "performance": ["string"],
        "security": ["string"],
        "quality": ["string"],
        "severity": "low|medium|high"
    }}

    If unsure, return an empty valid JSON structure.

    Code:
    {code}
"""

prompt_template = PromptTemplate(
    input_variables=["code"],
    template=template
)

def extract_json(text: str):
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if match:
        return json.loads(match.group())
    raise ValueError("No JSON found")

json_extractor = RunnableLambda(extract_json)

main_chain = prompt_template | llm | json_extractor

def review_code(code: str):

    result = main_chain.invoke(code)

    return result