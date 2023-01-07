const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");
//api/vi/tasksからタスクを読み込む
//MongoDBからタスクを読み取る
const ShowTasks = async () => {
    try{
        //自作APIを叩く
        //{data: tasks}という記載はコンソールでデータ属性の情報だけ持ってくるために使う。
        const {data: tasks} = await axios.get("/api/v1/tasks");
        //console.log(tasks);

        //タスクが1つもない時
        if(tasks.length < 1 ){
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return;
        };

        //taskを出力する。
        const AllTasks = tasks.map((task) => {
            //console.log(task);
            //データをそれぞれ取り出す。
            const {completed, _id, name} = task;

            return `<div class="single-task ${completed && "task-completed"}">
            <h5>
                <span><i class ="far fa-check-circle"></i></span>${name}
            </h5>
            <div class="task-links">
                <!--編集リンク-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class ="fas fa-edit"></i>
                </a>
                <!--ゴミ箱リンク-->
                <button type="button" class="delete-btn" data-id = ${_id}>
                    <i class ="fas fa-trash"></i>
                </button>
            </div>
        </div>`;
        })
         .join("");
        console.log(AllTasks);
        tasksDOM.innerHTML = AllTasks;
    }catch(err){
       
    };
    
};
ShowTasks();

//ボタンを押したらタスクを新規作成する
//eventで再リロードを阻止する。
formDOM.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const name = taskInputDOM.value;
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "タスクを追加しました";
    formAlertDOM.classList.add("text-success");  
    
    try{
        await axios.post("/api/v1/tasks", { name: name });
        ShowTasks();
    }catch(err){
        console.log(err);
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML="無効です。もう一度やり直してください。"
        formAlertDOM.classList.remove("text-success");
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none"
    }, 3000);
});

tasksDOM.addEventListener("click",async(event)=>{
    const element = event.target;
    console.log(element.parentElement);
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        console.log(id)
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            ShowTasks();
        } catch (err) {
            console.log(err);
        }
    }
});