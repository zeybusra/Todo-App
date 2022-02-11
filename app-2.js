// VALUE
let addTodoButton = $("#addTodoButton");
let addProgButton = $("#addProgButton");
let addDoneButton = $("#addDoneButton");

const editClearGroup = `
<a class="itemA" href="#">
    <i onclick="editTodo(this)" style="color: black" class="editIcon fas fa-edit px-3"></i>
    <i onclick="clearTodo(this)" style="color: black" class="exitIcon fas fa-times"></i>
</a>
`

let alertAlreadyAdd = `
<div class="dangerAlert alert alert-danger mt-3" role="alert">
                        This todo already added.
                    </div> `
// $(".dangerAlert").delay(1500).fadeOut("slow");


let alertSuccess = `
<div class="successAlert alert alert-success mt-3" role="alert">
            Todo item added successfully.
        </div>
 `
// $(".successAlert").delay(1500).fadeOut("slow");


let alertClear = `<div class="successAlertDelete alert alert-success mt-3" role="alert">
    Todo item is deleted
</div>`
// successAlertDelete.delay(1500).fadeOut("slow");


let alertClearAll = `<div class="successAlertDeleteAll alert alert-success mt-3" role="alert">
            All todo items deleted.
        </div>`
// successAlertDeleteAll.delay(1500).fadeOut("slow");


//FUNCTIONS
addTodoButton.click(function addTodo(e) {

    let alertTodo = $("#alertTodo")

    e.preventDefault();
    let liElements = document.querySelectorAll(".list-group-item");
    let todoInput = document.getElementById("TodoInput");

    for (let i = 0; i < liElements.length; i++) {
        if (liElements[i].dataset.text === todoInput.value) {

            alertTodo.append(alertAlreadyAdd);
            $(".dangerAlert").delay(1500).fadeOut("slow");
            return
        } else {
        }
    }

    $(`
               <li data-text="` + todoInput.value + `" style="border: 1px solid black" class="todoLiElement list-group-item d-flex justify-content-between mt-1">` + todoInput.value + `
                     ` + editClearGroup + `
                </li>
            `).appendTo('#ulElement');

    alertTodo.append(alertSuccess);
    $(".successAlert").delay(1500).fadeOut("slow");

    addTodoToStorage(todoInput.value);
    todoInput.value = ("");

    function addTodoToStorage(newTodo) {
        let todos = getTodosFromStorage("todos");

        if (todos.includes(newTodo)) {
        } else {
            todos.push(newTodo);
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }
})

//Add Progress

addProgButton.click(function addProgress(e) {
    let alertProgress = $("#alertProgress")

    e.preventDefault();
    let liElements = document.querySelectorAll(".list-group-item");
    let TodoInputProg = document.getElementById("TodoInputProg");

    for (let i = 0; i < liElements.length; i++) {
        if (liElements[i].dataset.text === TodoInputProg.value) {

            alertProgress.append(alertAlreadyAdd);
            $(".dangerAlert").delay(1500).fadeOut("slow");
            return
        } else {
        }
    }

    $(`
               <li data-text="` + TodoInputProg.value + `" style="border: 1px solid black" class="progressLiElement mt-1 list-group-item d-flex justify-content-between">` + TodoInputProg.value + `
                     ` + editClearGroup + `
                </li>
            `).appendTo('#ulElementProgress');

    alertProgress.append(alertSuccess);
    $(".successAlert").delay(1500).fadeOut("slow");

    addTodoToStorage(TodoInputProg.value);
    TodoInputProg.value = ("");

    function addTodoToStorage(newTodo) {
        let progress = getTodosFromStorage("progress");

        if (progress.includes(newTodo)) {
        } else {
            progress.push(newTodo);
        }
        localStorage.setItem("progress", JSON.stringify(progress));
    }
})


//Add Done

addDoneButton.click(function addDone(e) {

    let alertDone = $("#alertDone")

    e.preventDefault();
    let liElements = document.querySelectorAll(".list-group-item");
    let TodoInputDone = document.getElementById("TodoInputDone");

    for (let i = 0; i < liElements.length; i++) {
        if (liElements[i].dataset.text === TodoInputDone.value) {

            $("#alertDone").append(alertAlreadyAdd);
            $(".dangerAlert").delay(1500).fadeOut("slow");

            return
        } else {
        }
    }

    $(`
               <li data-text="` + TodoInputDone.value + `" style="border: 1px solid black" class="doneLiElement mt-1 list-group-item d-flex justify-content-between">` + TodoInputDone.value + `
                     ` + editClearGroup + `
                </li>
            `).appendTo('#ulElementDone');

    alertDone.append(alertSuccess);
    $(".successAlert").delay(1500).fadeOut("slow");


    addTodoToStorage(TodoInputDone.value);
    TodoInputDone.value = ("");

    function addTodoToStorage(newTodo) {
        let done = getTodosFromStorage("done");

        if (done.includes(newTodo)) {
        } else {
            done.push(newTodo);
        }
        localStorage.setItem("done", JSON.stringify(done));
    }
})

//GET FROM LOCAL STORAGE
function getTodosFromStorage(e) {

    let todos;

    if (localStorage.getItem(e) === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem(e));
    }
    return todos;
}


//CLEAR TO DO
function clearTodo(e) {

    if (e.parentElement.parentElement.classList.contains("todoLiElement")) {

        e.parentElement.parentElement.remove();

        $("#alertTodo").append(alertClear);
        $(".successAlertDelete").delay(1500).fadeOut("slow");

        let todos = getTodosFromStorage("todos");
        for (let i = 0; i < todos.length; i++) {

            if (e.parentElement.parentElement.dataset.text === todos[i]) {
                todos.splice(i, 1);
                break;
            } else {
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    if (e.parentElement.parentElement.classList.contains("progressLiElement")) {

        e.parentElement.parentElement.remove();

        $("#alertProgress").append(alertClear);
        $(".successAlertDelete").delay(1500).fadeOut("slow");

        let progress = getTodosFromStorage("progress");
        for (let i = 0; i < progress.length; i++) {

            if (e.parentElement.parentElement.dataset.text === progress[i]) {
                progress.splice(i, 1);
                break;
            } else {
            }
        }
        localStorage.setItem("progress", JSON.stringify(progress));
    }

    if (e.parentElement.parentElement.classList.contains("doneLiElement")) {

        e.parentElement.parentElement.remove();

        $("#alertDone").append(alertClear);
        $(".successAlertDelete").delay(1500).fadeOut("slow");

        let done = getTodosFromStorage("done");
        for (let i = 0; i < done.length; i++) {

            if (e.parentElement.parentElement.dataset.text === done[i]) {
                done.splice(i, 1);
                break;
            } else {
            }
        }
        localStorage.setItem("done", JSON.stringify(done));
    }
}


//CLEAR ALL TODOS

$("#todoDeleteAll").click(function clearAll() {
    let ulElement = $("#ulElement");
    ulElement.text("");

    $(".allListedTodos").append(alertClearAll);
    $(".successAlertDeleteAll").delay(1500).fadeOut("slow");

    localStorage.clear();
    localStorage.removeItem('todos');
})

//CLEAR ALL PROGRESS
$("#todoDeleteProgress").click(function clearAllProgress() {
    let ulElementProgress = $("#ulElementProgress");
    ulElementProgress.text("");

    $("#alertProgress").append(alertClearAll);
    $(".successAlertDeleteAll").delay(1500).fadeOut("slow");

    localStorage.removeItem('progress');
})


//CLEAR ALL DONE
$("#todoDeleteDone").click(function clearAllDone() {
    let ulElementDone = $("#ulElementDone");
    ulElementDone.text("");

    $("#alertDone").append(alertClearAll);
    $(".successAlertDeleteAll").delay(1500).fadeOut("slow");

    localStorage.removeItem('done');
})


//LOAD PAGE

$(document).ready(function loadPage() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let progress = JSON.parse(localStorage.getItem("progress"));
    let done = JSON.parse(localStorage.getItem("done"));

    for (let i = 0; i < todos.length; i++) {
        $(`
           <li data-text="` + todos[i] + `" style="border: 1px solid black" class="todoLiElement mt-1 list-group-item d-flex justify-content-between">` + todos[i] + `
                 ` + editClearGroup + `
            </li>`).appendTo('#ulElement');
    }

    for (let i = 0; i < progress.length; i++) {
        $(`
           <li data-text="` + progress[i] + `" style="border: 1px solid black" class="progressLiElement mt-1 list-group-item d-flex justify-content-between">` + progress[i] + `
                 ` + editClearGroup + `
            </li>`).appendTo('#ulElementProgress');
    }

    for (let i = 0; i < done.length; i++) {
        $(`
           <li data-text="` + done[i] + `" style="border: 1px solid black" class="doneLiElement mt-1 list-group-item d-flex justify-content-between">` + done[i] + `
                 ` + editClearGroup + `
            </li>`).appendTo('#ulElementDone');
    }
})

//EDIT TODOS
function editTodo(e) {
    let editableTodo = e.parentElement.parentElement;
    // console.log(editableTodo)
    let cleanEditableTodo = editableTodo.dataset.text;
    // console.log(cleanEditableTodo)

    // let todos = getTodosFromStorage("todos");
    // let progress = getTodosFromStorage("progress");
    // // let done = getTodosFromStorage("done");
    //
    // for (let i = 0; i < todos.length; i++) {
    //
    //     if (cleanEditableTodo === todos[i]) {
    //         todos.splice(i, 1);
    //         break;
    //     } else {
    //     }
    // }
    // localStorage.setItem("todos", JSON.stringify(todos));
    //
    //
    // for (let i = 0; i < progress.length; i++) {
    //
    //     if (cleanEditableTodo === progress[i]) {
    //         progress.splice(i, 1);
    //         break;
    //     } else {
    //     }
    // }
    // localStorage.setItem("progress", JSON.stringify(progress));


    editableTodo.innerHTML = `
               <input id="TodoInputEdit" type="text" class="addTodo form-control" value="` + e.parentElement.parentElement.dataset.text + `"
           aria-label="todo" required>
           <div class="input-group-append">
           <button onclick="saveEdit(this)" id="editButton" type="submit" class="btn btn-outline-success"><i class="checkInput fas fa-check"></i>
            </button>
        </div>
            `;
}



//SAVE EDIT

function saveEdit(e) {
    // editTodo(e);
    // console.log(e.parentElement.offsetParent);
    // let yy = $(".doneLiElement");
    // console.log(yy.parents());

    let newValue = e.parentElement.previousElementSibling.value
    console.log(newValue);

    e.parentElement.parentElement.dataset.text = newValue
    e.parentElement.parentElement.innerHTML = newValue + editClearGroup

    // console.log(newValue);

    addTodoToStorage(newValue);

    let xx;

    if (xx === todos[i]) {

        let todos = getTodosFromStorage("todos");

        if (todos.includes(newValue)) {
        } else {
            todos.push(newValue);
        }
        localStorage.setItem("todos", JSON.stringify(todos));

    }
    if (xx === progress[i]) {


        let progress = getTodosFromStorage("progress");

        if (progress.includes(newValue)) {
        } else {
            progress.push(newValue);
        }
        localStorage.setItem("progress", JSON.stringify(progress));

    } else {

        let done = getTodosFromStorage("done");

        if (done.includes(newValue)) {
        } else {
            done.push(newValue);
        }
        localStorage.setItem("done", JSON.stringify(done));
    }


}



