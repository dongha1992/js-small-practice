//Book class : represents a book

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI Class

class UI {
    static displayBooks() {



        const books = Store.getBooks();
        books.forEach(book => UI.addBookToList(book))


    }
    static addBookToList(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement("div")
        row.classList.add("table-row")
        row.innerHTML = `
       
        <div class="table-cell" id="book-title">${book.title}</div>
        <div class="table-cell" id="book-author">${book.author}</div>
        <div class="table-cell" id="book-isbn">${book.isbn}</div>
        <div class="table-cell"><a href="#" class="btn delete">X</a></div>
  
        `
        list.appendChild(row)
    }
    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove()
        }
    }
    static showAlert(text, className, show) {
        const div = document.createElement("div")
        const spanExclamation = document.createElement("i")

        spanExclamation.className = "fas fa-exclamation-circle"
        div.appendChild(document.createTextNode(text))
        div.appendChild(spanExclamation)

        div.className = `alert alert-${className}`
        div.classList.add("show")
        const container = document.querySelector(".container")
        const form = document.querySelector("#book-form")
        const h1 = document.querySelector("h1")
        container.insertBefore(div, h1)

        setTimeout(function() {
            div.classList.add("hide")
            div.classList.remove("show")
        }, 1000)


    }
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
}

//store class : handless storage

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }

        return books
    }
    static addBook(book) {
        const books = Store.getBooks()
        books.push(book)
        console.log(books)
        localStorage.setItem("books", JSON.stringify(books))
    }
    static removeBook(isbn) {
        const books = Store.getBooks()
        books.forEach((book, index) => {
            console.log(book)
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books))
    }
}
//event: display books
document.addEventListener("DOMContentLoaded", UI.displayBooks)


//event: add a book

document.querySelector("#book-form").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.querySelector("#title").value
    const author = document.querySelector("#author").value
    const isbn = document.querySelector("#isbn").value

    //validate
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert
        UI.showAlert("error", 'danger', "show")
    } else {
        //instatiate book
        const book = new Book(title, author, isbn) // ?

        //Add Book to UI
        UI.addBookToList(book)

        //add book to store
        Store.addBook(book)
            //show success message 
        UI.showAlert("book added", "success", "show")
            //clear field
        UI.clearFields()
    }


})

//event : remove a book

document.querySelector("#book-list").addEventListener("click", e => {
    UI.deleteBook(e.target)

    //remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    UI.showAlert("book removed", "success", "show")
})