const review_url = "http://127.0.0.1:8000/review";

async function fetchReviewData(data) {
    const res = await fetch(review_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ code: data })
    });

    return res;
}

async function submitCode() {
    loaderFunction(true);
    const code = document.getElementById('code-area').value;

    const response = await fetchReviewData(code.trim());
    const result = await response.json();
    renderCode(result);
}

function renderCode(result) {
    console.log('render started');
    const {bugs, performance, security, quality} = result;
    let finalHtmlOutput = '';

    if(bugs.length > 0) {
        let bugHtml = bugs.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Bugs: </p><ul class="mb-4">${bugHtml.join(' ')}</ul>`;
    }

    if(performance.length > 0) {
        let performanceHtml = performance.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Performance: </p><ul class="mb-4">${performanceHtml.join(' ')}</ul>`;
    }


    if(security.length > 0) {
        let securityHtml = security.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Security: </p><ul class="mb-4">${securityHtml.join(' ')}</ul>`;
    }

    if(quality.length > 0) {
        let qualityHtml = quality.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Quality: </p><ul class="mb-4">${qualityHtml.join(' ')}</ul>`;
    }

    document.getElementById('code-bugs').innerHTML = finalHtmlOutput;
    
    loaderFunction(false);
}

function loaderFunction(activate) {
    if(activate) {
        document.body.classList.add('overflow-hidden');
        document.getElementById('loader-wrapper').classList.remove('d-none');
    } else {
        document.body.classList.remove('overflow-hidden');
        document.getElementById('loader-wrapper').classList.add('d-none');
    }
}