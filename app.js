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
    // Instantiate a book
    const book = new Book(title, author, isbn);
    // Instantiate UI
    const ui = new UI();
    // Add book to list
    ui.addBookToList(book);
    // Clear fields
    ui.clearFields();

    e.preventDefault();
});
