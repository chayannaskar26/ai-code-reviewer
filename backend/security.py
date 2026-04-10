from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate

llm = OllamaLLM(model="deepseek-coder:6.7b")

template = """
    Analyze the following code for security vulnerabilities.

    Focus on:
    - Injection risks
    - Unsafe deserialization
    - Secrets exposure
    - Authentication/authorization flaws

    For each issue:
    1. Explain the vulnerability
    2. Show exploitation scenario
    3. Suggest fix
    4. Map to OWASP Top 10

    Code:
    {code}
"""

prompt_template = PromptTemplate(
    input_variables=["code"],
    template=template
)

main_chain = prompt_template | llm

def review_code(code: str):

    result = main_chain.invoke(code)

    return result