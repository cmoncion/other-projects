const taskName = document.querySelector("#time #taskName");
const itTask = document.getElementById("itTask");
const btnAdd = document.getElementById("btn-add");
const form = document.getElementById("form");

const taskList = document.getElementById("task-list");
const tasks = [];

let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

renderTime();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTask();
  } else {
    alert("The field is empty!");
  }
});

function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTask() {
  const html = tasks.map((task) => {
    return `
    <div class="task">
    <div class="name">${task.name}</div>
    <div class="completed">
    <button class="btn-delete" data-delete-id="${task.id}"><i class='bx bx-trash'></i></button>
    ${
      task.completed
        ? `<span class="done">Done</spand>`
        : `<button class="btn-start" data-task-id="${task.id}">Start</button>`
    }</div>
    </div>
    `;
  });

  taskList.innerHTML = html.join("");

  const btnStart = document.querySelectorAll(".task .btn-start");
  const btnDelete = document.querySelectorAll(".task .btn-delete")

  btnStart.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!time) {
        const id = btn.getAttribute("data-task-id");
        startButtonHandler(id);
        btn.textContent = "In progress...";
      }
    });
  });

//   btnDelete.forEach(btn => {
//     btn.addEventListener('click', ()=>{
//       const id = btn.getAttribute("data-delete-id");
//         const findTask = tasks.filter(taskid => taskid.id === id)
        
//         if(findTask){
//           alert("Do you wanna delete this task?")
//           tasks.splice(tasks.indexOf(findTask))
//         }
     
//     })
//   })
}

function startButtonHandler(taskId) {
  time = 5;
  current = taskId;
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  taskName.textContent = tasks[taskIndex].name;
  renderTime();
  timer = setInterval(() => {
    timerHandler(taskId);
  }, 1000);
}

function timerHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTask();
    startBreak();
  }
}

function startBreak() {
  time = 5;
  taskName.textContent = "Break time";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();
  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timer = null;
    taskName.textContent = "";
    renderTask();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const secunds = parseInt(time % 60);
  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    secunds < 10 ? "0" : ""
  }${secunds}`;
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
}
