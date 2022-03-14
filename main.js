const display = document.querySelector('.display');
const form = document.getElementById('new-book');
const addABook = document.getElementById('btn-add-book');

console.log(addABook);

let myLibrary = [];

addBookToLibrary("The Hobbit", "Tolkien", "Fantasy", 1000, "no", "n/a");
addBookToLibrary("The Murder", "Smith", "Non fiction", 128, "yes", "4", );

addABook.addEventListener('click', () => {
    if(form.style.display === 'none') {
        form.style.display = 'flex';
    } else {
        form.style.display = 'none';
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();  // stop form from submitting

    // do some validation

    // add to the library
    addBookToLibrary(
        form.title.value,
        form.author.value,
        form.category.value,
        form.pages.value,
        form.haveread.value,
        form.review.value,
    )
    
    // reset form
    document.forms[0].reset();

    // recreate table in UI
    createTable();
})



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

function createTable() {
    display.innerHTML="";
    let allBooks = getAllBooksFromLibrary();
    for (let i = 0; i < allBooks.length; i++) {
        let bookValues = Object.values(allBooks[i]);
        let elementTR = document.createElement('tr');
        for (let j = 0; j < bookValues.length; j++) {
            let elementDT = document.createElement('td')
            elementDT.textContent = bookValues[j];
            elementTR.append(elementDT);
        }
        display.append(elementTR);
    }
}

createTable();