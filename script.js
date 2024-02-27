const myLibrary = [];
const mainTable = document.getElementById('mainTable');
const addBookForm = document.getElementById("addBook");

function Book(name, author, pages, read)  {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        //"The Hobbit by J.R.R. Tolkien, 295 pages, not read yet"
        return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read === true ? 'read.' : 'not read yet.'}`;
    }
}

// function populateBookList(){
//     myLibrary.forEach((book, index) => {
//         let theRow = document.createElement('tr');
//         theRow.innerHTML = `
//             <td>${book.name}</td>
//             <td>${book.author}</td>
//             <td>${book.pages}</td>
//             <td><input type="checkbox" data-book-id="${index}" ${book.read === true ? 'checked' : ''}></td>
//             <td><a href="#" data-book-id="${index}">Delete</a></td>
//         `;
//         mainTable.appendChild(theRow);
//     });
// }


function addBookToLibrary(bookInput) {
    myLibrary.push(bookInput);
    // Newest book is automatically the object at the end of the array.
    // Its position is used as its ID.
    let newestBookId = myLibrary.length - 1;
    let newestBook = myLibrary[newestBookId];
    let theRow = document.createElement('tr');
    theRow.innerHTML = `
        <td>${newestBook.name}</td>
        <td>${newestBook.author}</td>
        <td>${newestBook.pages}</td>
        <td><input type="checkbox" data-book-id="${newestBookId}" ${newestBook.read === true ? 'checked' : ''}></td>
        <td><a href="#" data-book-id="${newestBookId}">Delete</a></td>
    `;
    mainTable.appendChild(theRow);
}

mainTable.addEventListener('click', function(event) {
    // If deleted, row is removed and object removed from array.
    // However, its former position is empty to preserve positions
    // of subsequent books.
    if (event.target.tagName === 'A') {
        event.preventDefault();
        let row = event.target.closest('tr');
        let bookId = event.target.dataset.bookId;
        delete myLibrary[bookId];
        row.remove();
        console.log(myLibrary);
    }
    if (event.target.tagName === 'INPUT') {
        let bookId = event.target.dataset.bookId;
        myLibrary[bookId].read = !myLibrary[bookId].read;
        console.log(myLibrary[bookId].read);
    }
});

addBookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let checkBox = Boolean(formData.get('read'));
    let theBook = new Book(
        formData.get('title'), 
        formData.get('author'), 
        formData.get('pages'), 
        checkBox
    );
    addBookToLibrary(theBook);
    addBookForm.reset();
});



// Test Data
const lotr = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const harryPotter = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 320, true);
const pridePrejudice = new Book('Pride and Prejudice', 'Jane Austen', 279, true);
const greatGatsby = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
const toKillAMockingbird = new Book('To Kill a Mockingbird', 'Harper Lee', 281, true);
const catch22 = new Book('Catch-22', 'Joseph Heller', 453, false);
const catcherInTheRye = new Book('The Catcher in the Rye', 'J.D. Salinger', 224, true);
const lordOfTheFlies = new Book('Lord of the Flies', 'William Golding', 224, false);
const warAndPeace = new Book('War and Peace', 'Leo Tolstoy', 1225, true);

addBookToLibrary(lotr);
addBookToLibrary(harryPotter);
addBookToLibrary(pridePrejudice);
addBookToLibrary(greatGatsby);
addBookToLibrary(toKillAMockingbird);
addBookToLibrary(catch22);
addBookToLibrary(catcherInTheRye);
addBookToLibrary(lordOfTheFlies);
addBookToLibrary(warAndPeace);