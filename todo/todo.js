class Left {
    constructor(todo) {
        this.todo = todo
    }
}

class Left_Ui {
    static displayTodo() {}
    static addTodo(todo) {

        const ul = document.querySelector(".left-content-lists")
        const li = document.createElement("li")
        li.classList.add("left-content-list")
        li.innerHTML = `
          
            <span class="far fa-circle delete"></span>
     
            <span class="left-todo">${todo}</span>
        `
        ul.appendChild(li)


    }
    static deleteTodo(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.remove()

        }

    }
    static showAlert() {}
    static clearFields() {
        document.querySelector(".left-submit").value = "";
    }
    static trash(todo) {
        const ul = document.querySelector(".trash-content-lists")
        const li = document.createElement("li")
        li.classList.add("trash-content-list")
        li.innerHTML = `
          
            <span class="far fa-circle delete"></span>
     
            <span class="trash-todo">${todo}</span>
        `
        ul.appendChild(li)

    }
}

class Left_Store {

}



document.querySelector(".left-input").addEventListener("submit", e => {
    e.preventDefault()
    const todo = document.querySelector(".left-submit").value
    Left_Ui.addTodo(todo)
    Left_Ui.clearFields()
})


document.querySelector(".left-content-lists").addEventListener("click", e => {
    Left_Ui.deleteTodo(e.target)
})



class Right {
    constructor(todo) {
        this.todo = todo
    }
}