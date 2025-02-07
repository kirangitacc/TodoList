let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");
let todoList = []

function getFromStorage() {
    let k = localStorage.getItem('todoList');
    let r = JSON.parse(k);
    if (r === null) {
        todoList = [];
    } else {
        todoList = r;
    }
}

getFromStorage();
let todosCount = todoList.length;

let deleteTodo = (todoId) => {
    let li = document.getElementById(todoId);
    todoItemsContainer.removeChild(li);

    let k = todoList.findIndex((i) => {
        if ('todo' + i.id === todoId) {
            return true;
        }
    });
    todoList.splice(k, 1);
};

let statusChange = (labelId, todoId) => {
    let label = document.getElementById(labelId);
    label.classList.toggle('checked');
    for (let i of todoList) {
        if ('todo' + i.id === todoId) {
            if (i.isChecked === false) {
                i.isChecked = true;
            } else {
                i.isChecked = false;
            }
        }
    }
};


function createAndAppendTodo(todo) {
    let checkboxId = 'checkbox' + todo.id;
    let labelId = 'label' + todo.id;
    let todoId = 'todo' + todo.id;

    let li = document.createElement('li');
    li.classList.add('d-flex', 'flex-row', 'todo-item-container');
    li.id = todoId;
    todoItemsContainer.appendChild(li);

    let i = document.createElement('input');
    i.classList.add('checkbox-input');
    i.id = checkboxId;
    i.checked = todo.isChecked;
    i.type = 'checkbox';
    li.appendChild(i);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    li.appendChild(labelContainer);

    let label = document.createElement('label');
    label.classList.add('checkbox-label');
    label.id = labelId;
    label.textContent = todo.text;
    label.setAttribute('for', checkboxId);

    if (i.checked === true) {
        label.classList.add('checked');
    }

    i.onclick = () => {
        statusChange(labelId, todoId);
    };

    labelContainer.appendChild(label);

    let deleteCon = document.createElement('div');
    deleteCon.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteCon);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-icon', 'far', 'fa-trash-alt');

    deleteIcon.onclick = () => {
        deleteTodo(todoId);
    };
    deleteCon.appendChild(deleteIcon);

}


addTodoButton.onclick = () => {
    let todoInput = document.getElementById("todoUserInput");
    if (todoInput.value === '') {
        alert('Enter valid input');
    } else {
        todosCount += 1;
        let newTodo = {
            id: todosCount,
            text: todoInput.value,
            isChecked: false
        };
        todoInput.value = '';
        todoList.push(newTodo);
        createAndAppendTodo(newTodo);
    }
};

saveTodoButton.onclick = () => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

for (let todo of todoList) {
    createAndAppendTodo(todo);
}