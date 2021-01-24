//add a button that removes all books from the list and local storage
//add the local storage feature to the es5 version too

// Create Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// Crate UI class
class UI {
    // Add book to list function
    addBookToList(book) {
        // Get the book list
        const bookList = document.querySelector("#book-list");
        // Create tr element
        const row = document.createElement("tr");
        // Insert cols in the innerHTML. create more tds
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `;
        //make a for list that makes the id 1, 2, etc
        bookList.appendChild(row);
    }

    //show alert function
    showAlert(message, className) {
        //create div
        const alertDiv = document.createElement("div");
        //get the heading
        const heading = document.getElementById("heading");
        //add the classes
        alertDiv.className = `alert ${className}`;
        //append the message
        alertDiv.appendChild(document.createTextNode(message));
        // add the div after
        heading.after(alertDiv);
        //set the timeout
        setTimeout(function () {
            document.querySelector(".alert").remove();
        }, 1000);
    }

    // create delete Book function
    deleteBook(target) {
        if (target.classList.contains("delete")) {
            target.parentElement.parentElement.remove();
        }
    }

    // create clear Fields function
    clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("ISBN").value = "";
    }
}

// Local Storage class
class Store {
    //create get books function
    static getBooks() {
        let books;

        //do the usual checking in local storage and getting the item, remember to return the array
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;
    }

    //create display books function
    static displayBooks() {
        const books = Store.getBooks();

        //loop and add every book to the list
        books.forEach(function (book) {
            const ui = new UI();

            ui.addBookToList(book);
        });
    }

    // create add book to local storage function
    static addBookToLocalStorage(book) {
        const books = Store.getBooks();

        //push the book
        books.push(book);

        //set the item
        localStorage.setItem("books", JSON.stringify(books));
    }

    //create remove book from local storage function
    static removeBookFromLocalStorage(isbn) {
        const books = Store.getBooks();

        //loop through every books and check
        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        //set item to local storage
        localStorage.setItem("books", JSON.stringify(books));
    }
}

// DOM Load Event (event when the page loads)
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Event Listener for submit
document.getElementById("book-form").addEventListener("submit", function (e) {
    // get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("ISBN").value;

    // Instantiate a book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // validation, the alert that goes when I don't fill the form
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields!", "error");
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Add to local Storage
        Store.addBookToLocalStorage(book);

        //show alert
        ui.showAlert("Book added!", "success");
        // Clear fields
        ui.clearFields();
    }

    //prevent default
    e.preventDefault();
});

//add event listener for the book list
document.getElementById("book-list").addEventListener("click", function (e) {
    const ui = new UI();

    //delete book on the target
    ui.deleteBook(e.target);

    //remove from local storage, careful at the argument, get the isbn based on the target
    Store.removeBookFromLocalStorage(
        e.target.parentElement.previousElementSibling.textContent
    );

    //show alert
    ui.showAlert("Book removed!", "success");

    //prevent default
    e.preventDefault();
});
