let applications = [];


if (localStorage.getItem("applications")) {
    applications = JSON.parse(localStorage.getItem("applications"));
}

const form = document.getElementById("applicationForm");
const list = document.getElementById("applicationList");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const application = {
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        stage: document.getElementById("stage").value,
        result: document.getElementById("result").value,
        date: document.getElementById("date").value
    };

    applications.push(application);
    localStorage.setItem("applications", JSON.stringify(applications));

    form.reset();
    displayApplications();
});

function displayApplications() {
    list.innerHTML = "";

    applications.forEach((app, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.role}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td><button onclick="deleteApplication(${index})">Delete</button></td>
        `;

        list.appendChild(row);
    });

    updateSummary();
}

function deleteApplication(index) {
    applications.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(applications));
    displayApplications();
}

function updateSummary() {
    document.getElementById("total").innerText = applications.length;

    let interviewCount = 0;
    let offerCount = 0;
    let rejectionCount = 0;

    applications.forEach(app => {
        if (app.stage === "Interview") interviewCount++;
        if (app.stage === "Offer") offerCount++;
        if (app.stage === "Rejected") rejectionCount++;
    });

    document.getElementById("interviews").innerText = interviewCount;
    document.getElementById("offers").innerText = offerCount;
    document.getElementById("rejections").innerText = rejectionCount;
}


displayApplications();
