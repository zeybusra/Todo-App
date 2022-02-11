// VALUE

const editClearGroup = `
<a class="itemA" href="#">
    <i onclick="editTodo(this)" style="color: black" class="fas fa-edit px-3"></i>
    <i onclick="clearTodo(this)" style="color: black" class="fas fa-times"></i>
</a>
`
$(".addForm").on('submit', addTodo)

function addTodo(e) {

    e.preventDefault();

    let input = e.target.children[0].children[0];

    addLiElement(input.value, input.dataset.type)

    addTodoToStorage(input.value, input.dataset.type);

    input.value = "";

// ALERT
    createAlert(input.dataset.type, "Todo item added successfully.", "success");

}

//ADD TO LOCAL STORAGE
function addTodoToStorage(newTodo, todoType) {
    let todos = getTodosFromStorage(todoType);

    if (todos.includes(newTodo)) {
    } else {
        todos.push(newTodo);
    }
    localStorage.setItem(todoType, JSON.stringify(todos));
}

//GET FROM LOCAL STORAGE
function getTodosFromStorage(e) {

    let items;

    if (localStorage.getItem(e) === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem(e));
    }
    return items;
}


//LOAD PAGE

$(document).ready(function loadPage() {

    let todo = getTodosFromStorage("todo");
    let progress = getTodosFromStorage("progress");
    let done = getTodosFromStorage("done");

    for (let i = 0; i < todo.length; i++) {
        addLiElement(todo[i], "todo");
    }

    for (let i = 0; i < progress.length; i++) {
        addLiElement(progress[i], "progress");
    }

    for (let i = 0; i < done.length; i++) {
        addLiElement(done[i], "done");
    }

})

//ADD LiELEMENT
function addLiElement(value, type) {
    $(`
       <li data-text="` + value + `" style="border: 1px solid black" class="list-group-item d-flex justify-content-between mt-1">` + value + `
             ` + editClearGroup + `
       </li>
    `).appendTo("#ulElement" + type);
}


//CLEAR TO DO
function clearTodo(e) {

    let liElement = e.parentElement.parentElement;
    let todoType = liElement.parentElement.dataset.type;

    removeItemFromLocal(todoType, liElement.dataset.text);

    //ALERT
    createAlert(todoType, "This todo is deleted", "warning");

    liElement.remove();
}


//CLEAR ALL TODOS

$(".clearAll").on("click", function clearAll(e) {
    console.log(e);
    console.log(e.target);
    let type;

    if (e.target.tagName === "I") {
        console.log(e.target.parentElement.dataset.type);
        type = e.target.parentElement.dataset.type;

    } else {
        type = e.target.dataset.type;
    }

    let ulElement = $("#ulElement" + type);
    ulElement.text("");

    createAlert(type, "All todos are removed.", "warning")

    localStorage.removeItem(type);
})


function createAlert(type, alertMessage, alertType) {
    $("#alert" + type).append(`
        <div class="alert alert-` + alertType + ` mt-3" role="alert">
            ` + alertMessage + `
        </div>
        `);
    $(".alert").delay(1500).fadeOut("slow");
}


//EDIT TODOS
function editTodo(e) {
    let editableTodo = e.parentElement.parentElement;

    editableTodo.innerHTML = `
        <form class="editForm" style="width: 100%;">
            <div class="input-group">
                <input type="text" class="form-control" value="` + editableTodo.dataset.text + `" required>
                <button type="submit" class="btn btn-outline-success">
                    <i class="checkInput fas fa-check"></i>
                </button>
            </div>
        </form>
        `;
    $(".editForm").on("submit", saveEdit);
}

function saveEdit(e) {
    e.preventDefault();

    let input = e.target.children[0].children[0];
    let liElement = input.parentElement.parentElement.parentElement;
    let ulElement = liElement.parentElement;
    let todoType = ulElement.dataset.type

    removeItemFromLocal(todoType, liElement.dataset.text);

    addTodoToStorage(input.value, todoType);

    createAlert(todoType, "Todo is updated successfully.", "success");

    liElement.dataset.text = input.value
    liElement.innerHTML = input.value + editClearGroup

    // addLiElement(input.value, todoType);
    // liElement.remove()
}

function removeItemFromLocal(todoType, removeItem) {

    let localArray = getTodosFromStorage(todoType);
    for (let i = 0; i < localArray.length; i++) {

        if (removeItem === localArray[i]) {
            localArray.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(todoType, JSON.stringify(localArray));
}
