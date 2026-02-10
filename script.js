let applications = JSON.parse(localStorage.getItem("jobApplications")) || [];
let currentFilter = "all";

window.onload = function () {
    document.getElementById("date").valueAsDate = new Date();
    displayApplications();
    updateSummary();
};

document.getElementById("applicationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const newApp = {
        id: Date.now(),
        company: document.getElementById("company").value,
        position: document.getElementById("position").value,
        stage: document.getElementById("stage").value,
        result: document.getElementById("result").value,
        date: document.getElementById("date").value
    };

    applications.push(newApp);
    localStorage.setItem("jobApplications", JSON.stringify(applications));

    alert("Application added successfully!");


    this.reset();
    document.getElementById("date").valueAsDate = new Date();

    displayApplications();
    updateSummary();
});

function displayApplications() {

    const body = document.getElementById("applicationsBody");
    const table = document.getElementById("applicationsTable");
    const empty = document.getElementById("noApplications");

    body.innerHTML = "";

    let filtered = applications;

    if (currentFilter !== "all") {
        filtered = applications.filter(app =>
            app.stage === currentFilter || app.result === currentFilter
        );
    }

    if (filtered.length === 0) {
        table.style.display = "none";
        empty.style.display = "block";
        return;
    }

    table.style.display = "table";
    empty.style.display = "none";

    filtered.forEach(app => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.company}</td>
            <td>${app.position}</td>
            <td>${app.stage}</td>
            <td>${app.result}</td>
            <td>${app.date}</td>
            <td><button class="delete-btn" onclick="deleteApplication(${app.id})">Delete</button></td>
        `;

        body.appendChild(row);
    });
}

function deleteApplication(id) {
    if (confirm("Delete this application?")) {
        applications = applications.filter(app => app.id !== id);
        localStorage.setItem("jobApplications", JSON.stringify(applications));
        displayApplications();
        updateSummary();
    }
}

function updateSummary() {
    document.getElementById("totalCount").textContent = applications.length;
    document.getElementById("interviewCount").textContent =
        applications.filter(app => app.stage === "Interview").length;
    document.getElementById("offerCount").textContent =
        applications.filter(app => app.stage === "Offer").length;
    document.getElementById("rejectedCount").textContent =
        applications.filter(app => app.result === "Rejected").length;
}

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        this.classList.add("active");
        currentFilter = this.getAttribute("data-filter");
        displayApplications();
    });
});
