const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const deadlineInput = document.getElementById("deadline");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addTaskBtn.addEventListener("click", addTask);

function addTask(){

const text = taskInput.value.trim();

if(text === "") return;

const task = {
id: Date.now(),
text: text,
completed: false,
deadline: deadlineInput.value
};

tasks.push(task);

saveTasks();
renderTasks();

taskInput.value="";
deadlineInput.value="";

}

function renderTasks(){

taskList.innerHTML="";

tasks.forEach(task => {

const li = document.createElement("li");

if(task.completed)
li.classList.add("completed");
li.innerHTML = `
<div>

<span onclick="toggleTask(${task.id})">${task.text}</span>

<br>

<small>Due: ${task.deadline ? new Date(task.deadline).toLocaleString() : "No deadline"}</small>

<br>

<small id="countdown-${task.id}" class="countdown"></small>

</div>

<div class="actions">

<button class="edit" onclick="editTask(${task.id})">Edit</button>
<button class="delete" onclick="deleteTask(${task.id})">Delete</button>

</div>
`;
taskList.appendChild(li);

});

}

function toggleTask(id){

tasks = tasks.map(task =>
task.id === id ? {...task, completed: !task.completed} : task
);

saveTasks();
renderTasks();

}

function editTask(id){

const task = tasks.find(t => t.id === id);

const newText = prompt("Edit your task", task.text);

if(newText !== null){
task.text = newText;
saveTasks();
renderTasks();
}

}

function deleteTask(id){

tasks = tasks.filter(task => task.id !== id);

saveTasks();
renderTasks();

}

function saveTasks(){

localStorage.setItem("tasks", JSON.stringify(tasks));

}

function checkReminders(){

const now = new Date().getTime();

tasks.forEach(task => {

if(!task.deadline || task.completed) return;

const deadlineTime = new Date(task.deadline).getTime();
const timeLeft = deadlineTime - now;

if(timeLeft <= 1800000 && timeLeft > 1740000){
alert(`⏳ Reminder: Only 30 minutes left to finish "${task.text}"`);
}

});

}

setInterval(checkReminders, 60000);
function updateCountdowns(){

const now = new Date().getTime();

tasks.forEach(task => {

if(!task.deadline || task.completed) return;

const deadlineTime = new Date(task.deadline).getTime();

const timeLeft = deadlineTime - now;

const countdownElement = document.getElementById(`countdown-${task.id}`);

if(!countdownElement) return;

if(timeLeft <= 0){
countdownElement.innerText = "⛔ Deadline passed";
return;
}

const hours = Math.floor(timeLeft / (1000 * 60 * 60));
const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

countdownElement.innerText = `⏳ ${hours}h ${minutes}m remaining`;

});

}
setInterval(updateCountdowns, 1000);
const sparkleContainer = document.querySelector(".sparkles");

for(let i=0;i<25;i++){

const sparkle = document.createElement("span");

sparkle.style.left = Math.random()*100 + "vw";
sparkle.style.animationDuration = (5 + Math.random()*5) + "s";

sparkleContainer.appendChild(sparkle);

}