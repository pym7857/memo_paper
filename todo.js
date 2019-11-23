const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event){
    const btn = event.target; // 현재 마우스가 클릭한 곳
    const li = btn.parentNode; // <li id="1"> ...
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ // filter
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos; // toDos가 const이면 바꿀 수 없다. let으로 변경!
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // localStorage는 모든것을 string으로 저장
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌"; // meta charset="utf-8" 설정 필요
    delBtn.className = "toDo__button";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = "　" + text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; // 나중에 지울때 어떤 li 인지 알아야하므로
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos); // JSON String -> Object
        parsedToDos.forEach(function(toDo){ // forEach
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();