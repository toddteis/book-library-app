// This branch will convert constructors to classes


const display = document.querySelector('.display');
const form = document.getElementById('new-book');
const addBook = document.getElementById('btn-add-book');
const submitBook = document.getElementById('btn-submit')
const cancelAddBook = document.getElementById('btn-cancel');
const updateBookBtn = document.getElementById('btn-update');
const formFieldTitle = document.getElementById('title');
const formFieldAuthor = document.getElementById('author');
const formFieldCategory = document.getElementById('category');
const formFieldPages = document.getElementById('pages');
const formFieldReadStatus = document.getElementById('status');
const formFieldReview = document.getElementById('review');

let updateBookId;
let myLibrary = [];


updateBookBtn.addEventListener('click', () => {
    updateBook(updateBookId);
    form.reset();
    toggleFormDisplay();
    submitBook.style.display = 'block';
    updateBookBtn.style.display = 'none';
})

cancelAddBook.addEventListener('click', () => {
    // reset form
    document.forms[0].reset();

    // hide form
    toggleFormDisplay();
})

addBook.addEventListener('click', () => {
    toggleFormDisplay();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();  // stop form from submitting

    // add to the library
    addBookToLibrary(
        form.title.value,
        form.author.value,
        form.category.value,
        form.pages.value,
        form.status.value,
        form.review.value,
    )

    // reset form
    document.forms[0].reset();

    // recreate table in UI
    createTable();

    // hide form
    toggleFormDisplay();
})

class Book {
    constructor(title, author, category, pages, readStatus, review) {
        this.title = title
        this.author = author
        this.category = category
        this.pages = pages
        this.readStatus = readStatus
        this.review = review
    }
}

function addBookToLibrary(title, author, category, pages, readStatus, review) {
    const myBook = new Book(title, author, category, pages, readStatus, review);
    myLibrary.push(myBook);
}

function getAllBooksFromLibrary() {
    let result = myLibrary;
    return result;
}

function createTable() {
    display.innerHTML = "";
    let allBooks = getAllBooksFromLibrary();
    for (let i = 0; i < allBooks.length; i++) {
        let bookValues = Object.values(allBooks[i]);
        let elementTR = document.createElement('tr');
        for (let j = 0; j < bookValues.length; j++) {
            let elementDT = document.createElement('td')
            if (j == 5) {
                if (bookValues[j] == 'Not Read') {
                    elementDT.textContent = bookValues[j];
                    elementTR.append(elementDT);
                } else {
                    elementDT.append(stringToStars(bookValues[j]));
                    elementTR.append(elementDT);
                }
            } else {
                elementDT.textContent = bookValues[j];
                elementTR.append(elementDT);
            }
        }
        let elementDT = document.createElement('td')
        elementDT.append(createTableBtn(i, 'edit'));
        elementTR.append(elementDT);
        let elementDT2 = document.createElement('td');
        elementDT2.append(createTableBtn(i, 'remove'));
        elementTR.append(elementDT2);
        display.append(elementTR);
    }
}

function createTableBtn(id, type) {
    let elementBtn = document.createElement('button');
    if (type == 'edit') {
        elementBtn.textContent = 'Edit';
        elementBtn.className = 'btn-table edit';
        elementBtn.addEventListener('click', () => {
            editBook(elementBtn.id);
        });
    } else if (type == 'remove') {
        elementBtn.textContent = 'Remove';
        elementBtn.className = 'btn-table remove';
        elementBtn.addEventListener('click', () => {
            removeBook(elementBtn.id);
        });
    }
    elementBtn.value = id;
    elementBtn.id = id;
    return elementBtn;
}

function editBook(id) {
    // get values with id.
    const selectedBook = myLibrary[id];
    updateBookId = id;

    // show form
    toggleFormDisplay()

    // hide submit button & show update button.
    submitBook.style.display = 'none';
    updateBookBtn.style.display = 'block';

    //populate fields with values
    formFieldTitle.value = selectedBook.title;
    formFieldAuthor.value = selectedBook.author;
    formFieldCategory.value = selectedBook.category;
    formFieldPages.value = selectedBook.pages;
    formFieldReadStatus.value = selectedBook.readStatus;
    formFieldReview.value = selectedBook.review;
}

function removeBook(id) {
    let elementIndex = id;
    myLibrary.splice(elementIndex, 1);
    createTable();
}

function toggleFormDisplay() {
    if (form.style.display == 'flex') {
        form.style.display = 'none';
        addBook.style.display = 'block';
    } else {
        form.style.display = 'flex';
        addBook.style.display = 'none';
    }
}

function updateBook(id) {
    myLibrary[id].title = formFieldTitle.value;
    myLibrary[id].author = formFieldAuthor.value;
    myLibrary[id].category = formFieldCategory.value;
    myLibrary[id].pages = formFieldPages.value;
    myLibrary[id].readStatus = formFieldReadStatus.value;
    myLibrary[id].review = formFieldReview.value;
    createTable();
}

function stringToStars(str) {
    let spanElement = document.createElement('div')
    let ionIcon = document.createElement('ion-icon');
    let ionIcon2 = document.createElement('ion-icon');
    let ionIcon3 = document.createElement('ion-icon');
    let ionIcon4 = document.createElement('ion-icon');
    let ionIcon5 = document.createElement('ion-icon');
    ionIcon.setAttribute('name', 'star');
    ionIcon2.setAttribute('name', 'star');
    ionIcon3.setAttribute('name', 'star');
    ionIcon4.setAttribute('name', 'star');
    ionIcon5.setAttribute('name', 'star');

    switch (str) {
        case "1 Star":
            spanElement.append(ionIcon);
            break;
        case "2 Stars":
            spanElement.append(ionIcon);
            spanElement.append(ionIcon2);
            break;
        case "3 Stars":
            spanElement.append(ionIcon);
            spanElement.append(ionIcon2);
            spanElement.append(ionIcon3);
            break;
        case "4 Stars":
            spanElement.append(ionIcon);
            spanElement.append(ionIcon2);
            spanElement.append(ionIcon3);
            spanElement.append(ionIcon4);
            break;
        default:
            spanElement.append(ionIcon);
            spanElement.append(ionIcon2);
            spanElement.append(ionIcon3);
            spanElement.append(ionIcon4);
            spanElement.append(ionIcon5);
            break;
    }

    return spanElement;
}

// Add some books
addBookToLibrary("The Hobbit", "J R R Tolkien", "Fantasy", 400, "Read", "5 Star");
addBookToLibrary("Nabbing Ned Kelly", "David Dufty", "Historical Fiction", 424, "Read", "3 Stars",);
addBookToLibrary("Along came a Spider", "James Patterson", "Detective Mystery", 496, "Read", "4 Stars",);
addBookToLibrary("Lower your golf score", "John Hoskison", "Self Help", 108, "Not Read", "Not Read",);

createTable();