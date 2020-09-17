class Left {
    constructor(todo) {
        this.todo = todo
    }
}

class Left_Ui {
    static displayTodo() {
        const todos = Left.getTodos();
        todos.forEach(todo => Left_Ui.addTodo(todo))

    }
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
            console.log(el.nextElementSibling.innerHTML)
            Left_Ui.trash(el.nextElementSibling.innerHTML)
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
    static getTodos() {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = []
        } else {
            todos = JSON.stringify(localStorage.getItem("todos"))
        }
        return todos
    }
    static addTodo(todo) {
        const todos = Left_Store.getTodos()
        todos.push(todo)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    static removeTodo() {}
}



document.querySelector(".left-input").addEventListener("submit", e => {
    e.preventDefault()
    const todo = document.querySelector(".left-submit").value
    Left_Ui.addTodo(todo)
    Left_Ui.clearFields()

    Left_Store.addTodo(todo)
})


document.querySelector(".left-content-lists").addEventListener("click", e => {
    Left_Ui.deleteTodo(e.target)

})



class Right {
    constructor(todo) {
        this.todo = todo
    }
}

class Right_Ui {
    static displayTodo() {}
    static addTodo(todo) {
        const ul = document.querySelector(".right-content-lists")
        const li = document.createElement("li")
        li.classList.add("right-content-list")
        li.innerHTML = `
        <span class="far fa-circle delete"></span> 
        <span class="right-todo">${todo}
        <div class="cross-line"></div>
        </span>
        `
        ul.appendChild(li)
    }
    static deleteTodo(el) {
        if (el.classList.contains("delete")) {

        }

    }
    static showAlert() {}
    static clearFields() {
        document.querySelector(".right-submit").value = "";
    }
    static trash(todo) {

    }
}

class Right_Store {

}

document.querySelector(".right-input").addEventListener("submit", function(e) {
    e.preventDefault()
    const todo = document.querySelector(".right-submit").value
    Right_Ui.addTodo(todo)
    Right_Ui.clearFields()
})
document.querySelector(".right-content-lists").addEventListener("click", function(e) {
    Right_Ui.deleteTodo(e.target)
})