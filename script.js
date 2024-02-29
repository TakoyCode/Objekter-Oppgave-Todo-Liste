//Modell
let tasks = [
    {
        description: 'Handle til middag',
        person: "John",
        isDone: true,
        dueDate: "2024-02-13",
        doneDate: "12.2.2024",
    },
    {
        description: 'Lage middag',
        person: "Kåre",
        isDone: false,
        dueDate: "2024-02-13"
    },
    {
        description: 'Spise middag',
        person: "Bob",
        isDone: false,
        dueDate: "2024-02-13"
    },
];

//View
let app = document.getElementById('app');
updateView();
function updateView() {
    let html = /*HTML*/ `
    <table>
        <tr>
            <th>Oppgave</th>
            <th>Person</th>
            <th>Frist</th>
            <th>Gjort</th>
            <th>Gjort Dato</th>
            <th></th>
        </tr>
        ${createRowHtml()}
    </table>
        
    <p>
        <label>Oppgave:</label> <br/>
        <input id="taskDescription" type="text"/> <br/>
        <label>Person:</label> <br/>
        <input id="personDescription" type="text"/> <br/>
        <label>Frist:</label> <br/>
        <input id="dueDateDescription" type="date"/> <br/>
        <button onclick="addTask()">Legg til oppgave</button>
    </p>
        `;

    app.innerHTML = html;
};

function createRowHtml() {
    let rowhtml = "";

    for (let i = 0; i < tasks.length; i++) {
        rowhtml += createHTMLRow(i);
    }
    return rowhtml;
}

function createHTMLRow(i) {
    const task = tasks[i];
    const checkedHtml = task.isDone ? 'checked' : '';

    if (!task.editMode) return /*Html*/ `
    <tr>
        <td>${task.description}</td>
        <td>${task.person}</td>
        <td>${new Date(task.dueDate).toLocaleDateString('no-NO')}</td>
        <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml}></td>
        <td>${task.doneDate ?? ""}</td >
        <td>
            <button onclick="deleteTask(${i})">Slett</button>
            <button onclick="editTask(${i})">Edit</button>
        </td>
    </tr >
    `;

    return /*Html*/ `
    <tr>
        <td><input id="editDescription${i}" type="text" value="${task.description}"/></td>
        <td><input id="editPerson${i}" type="text" value="${task.person}"/></td>
        <td><input id="editDueDate${i}" type="date" value="${task.dueDate}"/></td>
        <td><input onchange="changeIsDone(this, ${i})" type="checkbox" ${checkedHtml}></td>
        <td>${task.doneDate ?? ""}</td >
        
        <td>
            <button onclick="updateTask(${i})">Lagre</button>
        </td>
    </tr >
    `;
}

//Controller

function addTask() {
    let taskDescriptionInput = document.getElementById("taskDescription");
    let personDescriptionInput = document.getElementById("personDescription");
    let dueDateDescriptionInput = document.getElementById("dueDateDescription");

    if (taskDescriptionInput.value == "" || personDescriptionInput.value == "" || dueDateDescriptionInput.value == "") return;
    tasks.push({
        description: taskDescriptionInput.value,
        person: personDescriptionInput.value,
        isDone: false,
        dueDate: dueDateDescriptionInput.value,
    });
    updateView();
};

function updateTask(index) {
    const idDescription = `editDescription${index}`;
    const idPerson = `editPerson${index}`;
    const idDueDate = `editDueDate${index}`;

    const inputTagDescription = document.getElementById(idDescription);
    const inputTagPerson = document.getElementById(idPerson);
    const inputDueDate = document.getElementById(idDueDate);

    tasks[index].description = inputTagDescription.value;
    tasks[index].person = inputTagPerson.value;
    tasks[index].dueDate = inputDueDate.value;

    tasks[index].editMode = false;
    updateView();
}

function editTask(index) {
    tasks[index].editMode = true;
    updateView();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateView();
}

function changeIsDone(checkbox, index) {
    tasks[index].isDone = checkbox.checked;

    tasks[index].doneDate = null;
    if (tasks[index].isDone) {
        let newDate = new Date();
        doneTaskDate = newDate;
        doneTaskDate = newDate.toISOString().substring(0, 10);
        doneTaskDate = new Date(doneTaskDate).toLocaleDateString('no-NO');
        tasks[index].doneDate = doneTaskDate;
    }
    updateView();
}