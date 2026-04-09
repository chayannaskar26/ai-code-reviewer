const review_url = "http://127.0.0.1:8000/review";

async function fetchReviewData(data) {
    try {
        const res = await fetch(review_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code: data })
        });

        if (!res.ok) {
            const text = await res.text();
            throw new Error(`Server error (${res.status}): ${text}`);
        }

        return res;
    } catch (error) {
        console.error("Fetch failed:", error);
        throw error;
    }
}

async function submitCode() {
    loaderFunction(true);
    try {
        const code = document.getElementById('code-area').value;

        if (!code.trim()) {
            throw new Error("Code input is empty");
        }

        const response = await fetchReviewData(code.trim());

        let result;
        try {
            result = await response.json();
        } catch (err) {
            throw new Error("Invalid JSON response from server");
        }

        renderCode(result);
    } catch (error) {
        console.error("Error in submitCode:", error);

        alert(error.message || "Something went wrong");
    } finally {
        loaderFunction(false);
        updateRenderedButtons(false);
    }
}

function renderCode(result) {
    const {
        bugs = [],
        performance = [],
        security = [],
        quality = [],
        severity = ""
    } = result || {};
    let finalHtmlOutput = '';

    if (bugs.length > 0) {
        let bugHtml = bugs.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Bugs: </p><ul class="mb-4">${bugHtml.join(' ')}</ul>`;
    }

    if (performance.length > 0) {
        let performanceHtml = performance.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Performance: </p><ul class="mb-4">${performanceHtml.join(' ')}</ul>`;
    }


    if (security.length > 0) {
        let securityHtml = security.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Security: </p><ul class="mb-4">${securityHtml.join(' ')}</ul>`;
    }

    if (quality.length > 0) {
        let qualityHtml = quality.map(ele => `<li class="fs-6">${ele}</li>`);
        finalHtmlOutput += `<p class="fs-5">Quality: </p><ul class="mb-4">${qualityHtml.join(' ')}</ul>`;
    }

    if (severity === "high") {
        finalHtmlOutput += `<p class="fs-5">Severity: <span class="text-danger">High</span></p> `
    } else if (severity === "medium") {
        finalHtmlOutput += `<p class="fs-5">Severity: <span class="text-warning">Medium</span></p> `
    } else if (severity === "low") {
        finalHtmlOutput += `<p class="fs-5">Severity: <span class="text-success">Low</span></p> `
    } else {
        finalHtmlOutput += '';
    }

    document.getElementById('code-bugs').innerHTML = finalHtmlOutput;
}

function updateRenderedButtons(activate) {
    if (!activate) {
        document.getElementById('review-button').classList.add('disabled');
        document.getElementById('reset-button').classList.remove('d-none');
    } else {
        document.getElementById('review-button').classList.remove('disabled');
        document.getElementById('reset-button').classList.add('d-none');
    }
}

function reset() {
    updateRenderedButtons(true);
}

function loaderFunction(activate) {
    if (activate) {
        document.body.classList.add('overflow-hidden');
        document.getElementById('loader-wrapper').classList.remove('d-none');
    } else {
        document.body.classList.remove('overflow-hidden');
        document.getElementById('loader-wrapper').classList.add('d-none');
    }
}