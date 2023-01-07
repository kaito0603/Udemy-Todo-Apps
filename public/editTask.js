const taskEditIdDOM = document.querySelector(".task-edit-id");
const taskEditNameDOM = document.querySelector(".task-edit-name");
const taskEditFormDOM = document.querySelector(".single-task-form");
const taskEditFormAlertDOM = document.querySelector(".form-alert");
const taskEditFormCompletedDOM = document.querySelector(".task-edit-completed");



const params = window.location.search;
const id = new URLSearchParams(params).get("id");
console.log(id)

const ShowTask = async () =>{
    try {
        const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
        const {_id, completed, name} = task; 
        taskEditIdDOM.textContent = _id;
        taskEditNameDOM.value = name;
        if(completed){
            taskEditFormCompletedDOM.checked =true;
        }

    } catch (error) {
        console.log(error);

    }
};
ShowTask();

//タスクの編集
taskEditFormDOM.addEventListener ( "submit", async (e) =>{
    e.preventDefault();
  
    try {
        const taskName = taskEditNameDOM.value;
        taskCompleted = taskEditFormCompletedDOM.checked;
        const{data: task }= await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        taskEditFormAlertDOM.style.display = "block";
        taskEditFormAlertDOM.textContent= "編集に成功しました";
        taskEditFormAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err);
    };
    setTimeout(() => {
        taskEditFormAlertDOM.style.display = "none"
    }, 3000);
});