import axios from 'axios'

export default async function LLMConnection(codeString) {
    const review_url = "http://localhost:8000/review";

    let result = {};
    await axios.post(review_url, { code: codeString })
        .then(res => { result = res.data })
        .catch(err => console.error(err));

    return result;
}