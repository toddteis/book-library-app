const display = document.querySelector('.display');

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
    let result = myLibrary;
    return result;
}

// Test: add one book manually to the page.
let tableRow = document.createElement('tr');
let tbTitle = document.createElement('td');
tbTitle.textContent = 'The Hobbit';
tableRow.append(tbTitle);
let tbAuthor = document.createElement('td');
tbAuthor.textContent = 'Tolkien';
tableRow.append(tbAuthor);
let tbCategory = document.createElement('td');
tbCategory.textContent = 'Fantasy';
tableRow.append(tbCategory);
let tbPages = document.createElement('td');
tbPages.textContent = 1000;
tableRow.append(tbPages);
let tbReadStatus = document.createElement('td');
tbReadStatus.textContent = 'no';
tableRow.append(tbReadStatus);
let tbReview = document.createElement('td');
tbReview.textContent = 'no';
tableRow.append(tbReview);
console.log(tableRow);
display.append(tableRow);


function createHtmlPage() {
    let arr = getAllBooksFromLibrary();
    for (let i = 0; i < arr.length; i++) {
        let arr2 = Object.values(arr[i]);
        for (let j = 0; j < arr2.length; j++) {
            // console.log(arr2[j]);
        }
    }
}

addBookToLibrary("The Hobbit", "Tolkien", "Fantasy", 1000, "no", "n/a");
addBookToLibrary("The Murder", "Smith", "Non fiction", 128, "yes", "4", );
// console.log(getAllBooksFromLibrary());
createHtmlPage();