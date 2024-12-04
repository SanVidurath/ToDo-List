// window.alert("yo!");
const inputText = document.getElementById("inputTask");
const addBtn = document.getElementById("addBtn");
const toDoTasks = document.getElementById("toDoList");
const finishedTasks = document.getElementById("finishedList");

let doneTasksList = [];
let toDoTasksList = [];
let count = 1;

let task = {};

function addTask() {
  if (inputText.value !== "") {
    task={
      taskId : count,
      taskName: inputText.value,
      completed : false
    }
    toDoTasksList.push(task);
    setTask();
    inputText.value = "";
    count++;
    
  } else {
    window.alert("Please enter a task");
  }
}

addBtn.addEventListener("click", addTask);

function setTask(){
  toDoTasks.innerHTML="";
  toDoTasksList.forEach((task)=>
    toDoTasks.innerHTML += `
    <li class="list-group-item">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="Enter task"
                      id="taskCheckBox${task.taskId}"
                    />
                    <label class="form-check-label" for="taskCheckBox${task.taskId}" id="createTask">
                      ${task.taskName}
                    </label>
                  </div>
                </li>
    `
  )
  ;
}

toDoTasks.addEventListener("change", function(event){
  if(event.target.type === 'checkbox' && event.target.checked){
    const taskId = event.target.id.replace('taskCheckBox', '');
    const task = toDoTasksList.find(task=>task.taskId===Number(taskId))
    if (task) {
      task.completed = true;
      doneTasksList.push(task);
      toDoTasksList = toDoTasksList.filter(task => task.taskId !== Number(taskId));
      setTask();
      setFinishedTasks();
    }
    
  }
})

function setFinishedTasks() {
  finishedTasks.innerHTML = '';
  doneTasksList.forEach((task) => {
    finishedTasks.innerHTML += `
    <li class="list-group-item">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" checked disabled />
        <label class="form-check-label" for="taskCheckBox${task.taskId}">
          ${task.taskName}
        </label>
      </div>
    </li>
    `;
  });
}