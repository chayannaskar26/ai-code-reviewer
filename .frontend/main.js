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
    // loaderFunction(true);
    // try {
    //     const code = document.getElementById('code-area').value;

    //     if (!code.trim()) {
    //         throw new Error("Code input is empty");
    //     }

    //     const response = await fetchReviewData(code.trim());

    //     let result;
    //     try {
    //         result = await response.json();
    //     } catch (err) {
    //         throw new Error("Invalid JSON response from server");
    //     }
    //     console.log(JSON.stringify(result));
    //     renderCode(result);
    // } catch (error) {
    //     console.error("Error in submitCode:", error);

    //     alert(error.message || "Something went wrong");
    // } finally {
    //     loaderFunction(false);
    //     updateRenderedUI(false);
    // }
    renderCode({});
}

function renderCode(result) {
    // const {
    //     bugs = [],
    //     performance = [],
    //     security = [],
    //     quality = [],
    //     severity = ""
    // } = result || {};

    const {
        bugs = [],
        performance = [],
        security = [],
        quality = [],
        severity = ""
    } = {"bugs":["Shared reference issue in UserService constructor","Removes last element if index is -1 in removeUser function","Accesses undefined user object in getUser method","Objects are converted to [object Object] string in toString method","fetch() does not return a Promise, so the data cannot be resolved","The resolve/reject pattern is not followed in faultyPromise function","There's no way to stop memoryLeak from growing without additional logic or cleanup","Type coercion issue in add function where '1' +2 results in \"12\"","Sorting algorithm incorrect in brokenSort function","Original config object is being mutated in updateConfig function","Crash when called with null/undefined string in getLength function","Error swallowing happening inside nested setTimeout callbacks","Potential for race condition due to asynchronous timing in incrementAsync function","JSON.parse can crash on invalid JSON input","DOM manipulation method updateDOM crashes in Node environment","Infinite loop caused by while(true) in infiniteLoop function","Recursive function does not have a base case leading to stack overflow","findMax function wrongly handles negative numbers and returns incorrect max value","String concatenation in buildString is highly inefficient"],"performance":["slowLoop function is computationally expensive because of nested loops","buildString function concatenates a string n times which is time consuming for large inputs"],"security":["InsecureEval function can lead to code injection"],"quality":["InsecureEval function can lead to code injection"],"severity":"medium"};
    let finalHtmlOutput = '';

    if (bugs.length > 0) {
        let bugHtml = bugs.map(ele => `<li class="fs-6"><span>${ele}</span></li>`).slice(0, 5);
        // finalHtmlOutput += `<p class="fs-5">Bugs: </p><ul class="mb-4">${bugHtml.join(' ')}</ul>`;
        document.getElementById('bug-items').innerHTML = bugHtml.join(' ');
        document.getElementById('bugs-badge').classList.remove('d-none')
        document.getElementById('bugs-badge').innerText = bugs.length;
    } else {
        document.getElementById('bugs-badge').classList.add('d-none')
    }

    if (performance.length > 0) {
        let performanceHtml = performance.map(ele => `<li class="fs-6"><span>${ele}</span></li>`).slice(0, 5);
        // finalHtmlOutput += `<p class="fs-5">Performance: </p><ul class="mb-4">${performanceHtml.join(' ')}</ul>`;
        document.getElementById('performance-items').innerHTML = performanceHtml.join(' ');
        document.getElementById('performance-badge').classList.remove('d-none')
        document.getElementById('performance-badge').innerText = performance.length;
    } else {
        document.getElementById('performance-badge').classList.add('d-none')
    }


    if (security.length > 0) {
        let securityHtml = security.map(ele => `<li class="fs-6"><span>${ele}</span></li>`).slice(0, 5);
        // finalHtmlOutput += `<p class="fs-5">Security: </p><ul class="mb-4">${securityHtml.join(' ')}</ul>`;
        document.getElementById('security-items').innerHTML = securityHtml.join(' ');
        document.getElementById('security-badge').classList.remove('d-none')
        document.getElementById('security-badge').innerText = security.length;
    } else {
        document.getElementById('security-badge').classList.add('d-none')
    }

    if (quality.length > 0) {
        let qualityHtml = quality.map(ele => `<li class="fs-6"><span>${ele}</span></li>`).slice(0, 5);
        // finalHtmlOutput += `<p class="fs-5">Quality: </p><ul class="mb-4">${qualityHtml.join(' ')}</ul>`;
        document.getElementById('quality-items').innerHTML = qualityHtml.join(' ');
        document.getElementById('quality-badge').classList.remove('d-none')
        document.getElementById('quality-badge').innerText = quality.length;
    } else {
        document.getElementById('quality-badge').classList.add('d-none')
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

    // document.getElementById('code-bugs').innerHTML = finalHtmlOutput;
}

function updateRenderedUI(activate) {
    if (!activate) {
        document.getElementById('review-button').classList.add('disabled');
        document.getElementById('reset-button').classList.remove('d-none');
        document.getElementById('code-bugs').classList.remove('d-none');
    } else {
        document.getElementById('review-button').classList.remove('disabled');
        document.getElementById('reset-button').classList.add('d-none');
        document.getElementById('code-bugs').classList.add('d-none');
    }
}

function reset() {
    updateRenderedUI(true);
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