// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function (book) {
    // Get the book list
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement("tr");
    // Insert cols in the innerHTML. create more tds
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete">X</a></td>
    `;

    list.appendChild(row);
};

UI.prototype.showAlert = function (message, className) {
    const div = document.createElement("div");
    const heading = document.querySelector("#heading");

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    heading.after(div);

    setTimeout(function () {
        document.querySelector(".alert").remove();
    }, 2000);
};

UI.prototype.deleteBook = function (target) {
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
    }
};

// Clear Fields Function
UI.prototype.clearFields = function () {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("ISBN").value = "";
};

// Event Listener for submit
document.getElementById("book-form").addEventListener("submit", function (e) {
    // get form values
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("ISBN").value;
    // validation, the alert that goes when I don't fill the form
    // Instantiate a book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI();
    if (title === "" || author === "" || isbn === "") {
        ui.showAlert("Please fill in all fields", "error");
    } else {
        // Add book to list
        ui.addBookToList(book);
        // Clear fields
        ui.clearFields();

        ui.showAlert("Book added to the list", "success");

        e.preventDefault();
    }
});

document.querySelector("#book-list").addEventListener("click", function (e) {
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert("Book deleted from the list", "success");

    e.preventDefault();
});
