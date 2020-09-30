const listsContainer = document.querySelector("[data-lists]")
const listsUserForm = document.querySelector("[data-lists-user-form]")
const listsUserInput = document.querySelector("[data-lists-user-input]")
const deleteBtn = document.querySelector("[data-delete-list-button]")
const todoDisplayContainer = document.querySelector("[data-todo-display-container]")
const todoTitleElement = document.querySelector("[data-todo-title]")
const todoCountElement = document.querySelector("[data-todo-count]")
const todoContainer = document.querySelector("[data-todos]")
const todoTemplate = document.getElementById("todo-template")
const todoUserForm = document.querySelector("[data-todo-form]")
const todoUserInput = document.querySelector("[data-todo-input]")
const todoClearBtn = document.querySelector("[data-clear-completed-todo]")


const LOCAL_STORAGE_LIST_KEY = "task.lists"
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = "task.selectedListId"
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsUserForm.addEventListener("submit", e => {
    e.preventDefault()
    const listName = listsUserInput.value;
    if (listName === null || listName === "") return
    const list = createList(listName)
    listsUserInput.value = null;
    lists.push(list)
    saveAndRender()
})

todoContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "input") {
        const selectedList = lists.find(list => list.id === selectedListId)
        const selctedTodo = selectedList.tasks.find(task => task.id === e.target.id)
        selctedTodo.complete = e.target.checked
        save()
        renderTodosCount(selectedList)
    }
})

todoUserForm.addEventListener("submit", e => {
    e.preventDefault()
    const todoName = todoUserInput.value;
    if (todoName === null || todoName === "") return
    const todo = createTodos(todoName)
    todoUserInput.value = ""
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks.push(todo)
    saveAndRender()
    console.log(lists)

})

listsContainer.addEventListener("click", e => {
    if (e.target.tagName.toLowerCase() === "li") {
        selectedListId = e.target.dataset.listId
        saveAndRender()
    }
})

todoClearBtn.addEventListener("click", e => {
    const selectedList = lists.find(list => list.id === selectedListId)
    selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteBtn.addEventListener("click", e => {
    lists = lists.filter(list => list.id !== selectedListId)
    selectedListId = null
    saveAndRender()
})


function createList(name) {
    return {
        id: Date.now().toString(),
        name: name,
        tasks: []
    }
}

function createTodos(name) {
    return {
        id: Date.now().toString(),
        name: name,
        complete: false
    }
}

function render() {
    clock()
    clearElement(listsContainer)
    renderLists()
    const selectedList = lists.find(list => list.id === selectedListId)
    if (selectedListId === null) {
        todoDisplayContainer.style.display = "none"
    } else {
        todoDisplayContainer.style.display = "";
        todoTitleElement.innerText = selectedList.name;
        renderTodosCount(selectedList)
        clearElement(todoContainer)
        renderTasks(selectedList)
    }
}

function clock() {
    const timeSpan = document.querySelector(".time")
    const date = new Date()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    timeSpan.innerText = `${hour < 10 ? `0${hour}`: hour} : ${minute < 10 ? `0${minute}`: minute} : ${second < 10 ? `0${second}`: second}`
    setTimeout(clock, 1000)
}

function renderTasks(selectedList) {
    selectedList.tasks.forEach(task => {
        const todoElement = document.importNode(todoTemplate.content, true)
        const checkBox = todoElement.querySelector("input")
        checkBox.id = task.id;
        checkBox.checked = task.complete
        const label = todoElement.querySelector("label")
        label.htmlFor = task.id
        label.append(task.name)
        todoContainer.appendChild(todoElement)

    })
}

function renderTodosCount(selectedList) {
    const incompleteTasksCount = selectedList.tasks.filter(task => !task.complete).length
    const taskString = incompleteTasksCount === 1 || incompleteTasksCount === 0 ? "task" : "tasks"
    todoCountElement.innerText = `${incompleteTasksCount} ${taskString} left`
}

function renderLists() {
    lists.forEach(list => {
        const listElement = document.createElement("li")
        listElement.classList.add('left-content-list')
        listElement.dataset.listId = list.id
        listElement.innerText = list.name
        if (list.id === selectedListId) {
            listElement.classList.add("active-list")
        }

        listsContainer.appendChild(listElement)

    })

}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
    localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function saveAndRender() {
    save()
    render()
}

function clearElement(element) {
    console.log(`element.firstChild: ${element.firstChild}`)
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
    console.log(`element.firstChild: ${element.firstChild}`)
}

render()