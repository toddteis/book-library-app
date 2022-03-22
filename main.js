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
// Add some books
addBookToLibrary("The Hobbit", "J R R Tolkien", "Fantasy", 400, "Read", "5 Stars");
addBookToLibrary("Nabbing Ned Kelly", "David Dufty", "Historical Fiction", 424, "Read", "4 stars",);
addBookToLibrary("Along came a Spider", "James Patterson", "Detective Mystery", 496, "Read", "5 stars",);
addBookToLibrary("Lower your golf score", "John Hoskison", "Self help", 108, "Not read", "Not read",);

createTable();

updateBookBtn.addEventListener('click', () => {
    updateBook(updateBookId);
    form.reset();
    toggleFormDisplay();
    submitBook.style.display = 'block';
    updateBookBtn.style.display = 'none';
})

cancelAddBook.addEventListener('click', () => {
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
    display.innerHTML = "";
    let allBooks = getAllBooksFromLibrary();
    for (let i = 0; i < allBooks.length; i++) {
        let bookValues = Object.values(allBooks[i]);
        let elementTR = document.createElement('tr');
        for (let j = 0; j < bookValues.length; j++) {
            let elementDT = document.createElement('td')
            if (j == 5) {
                console.log(bookValues[j]);
                if (bookValues[j] == 'Not read') {
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
    formFieldCategory.value = replaceSpaceWithDash(selectedBook.category).toLowerCase();
    formFieldPages.value = selectedBook.pages;
    formFieldReadStatus.value = replaceSpaceWithDash(selectedBook.readStatus).toLowerCase();
    formFieldReview.value = replaceSpaceWithDash(selectedBook.review).toLowerCase();
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

function replaceSpaceWithDash(str) {
    return str.replace(/\s/g, '-')
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
    console.log(str + " " + "starssssss");
    switch (str) {
        case "1 Star":
            console.log('strToStarts' + ' ' + str);
            break;
        case "2 Stars":
            console.log('strToStarts' + ' ' + str);
            break;
        case "3 Stars":
            console.log('strToStarts' + ' ' + str);
            break;
        case "4 Stars":
            console.log('strToStarts' + ' ' + str);
            break;
        default:
            console.log('strToStarts' + ' ' + str);
            break;
    }
}