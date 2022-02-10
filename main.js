let myLibrary = [];

function Book(title, author, category, pages, readStatus, review) {
    this.title = title
    this.author = author
    this.category = category
    this.pages = pages
    this.readStatus = readStatus
    this.review = review
}

function addBookToLibrary(title, author, category, pages, readStatus, review) {
    const myBook = Object.create(Book);
    myBook.title = title;
    myBook.author = author;
    myBook.category = category;
    myBook.pages = pages;
    myBook.readStatus = readStatus;
    myBook.review = review;
    myLibrary.push(myBook);
}

function getAllBooksFromLibrary() {
    //returns all books from the libaray
}

addBookToLibrary("the hobbit", "tolkien", "Fantasy", 1000, "no", "n/a");
addBookToLibrary("the Murder", "Smith", "Non fiction", 128, "yes", "4", );
console.log(myLibrary);