"use strict";
const newBook = document.querySelector(".newBook");
const shelf = document.querySelector(".shelf");
const body = document.querySelector("body");
const main = document.querySelector("main");
let formExists = false;
let detailBoxExists = false;

let displayedBooks = [];
//function to set attributes on the input boxes in the form
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};

function deleteDetailBox() {
    let detailBox = document.querySelector(".detailBox");
    body.removeChild(detailBox)
    detailBoxExists = false;
};

let showDetails = function(index) {
    let detailBox = document.createElement("div");
    detailBox.classList.add("detailBox");
    for (let key in displayedBooks[index]) {
        let detail = document.createElement("p");
        detail.classList.add("detail");
        detail.textContent = `${key}: ${displayedBooks[index][key]}`;
        detailBox.appendChild(detail);
    }
    body.appendChild(detailBox);
    detailBox.addEventListener("click", (event) => {
        event.stopPropagation();
    });
    detailBoxExists = true;
    };  

// this function will refresh to display all books each time one is added
const showBooks = function() {
    shelf.replaceChildren("");
    displayedBooks.forEach((item, index, array) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.setAttribute("data", `${index}`);
        if (displayedBooks[index].status === "read") {bookCard.classList.toggle("readBorder")};
        shelf.appendChild(bookCard);
        let bookTitle = document.createElement("h4");
        let year = document.createElement("h4");
        bookTitle.textContent = displayedBooks[index].title;
        if (bookTitle.textContent.length > 33) {
            let arrayedTitle = bookTitle.textContent.split("");
            let shortenedTitle = arrayedTitle.splice(24,77, "...");
            bookTitle.textContent = arrayedTitle.join("");
            console.log(arrayedTitle);
        }
        year.textContent = displayedBooks[index].year;
        if (year.textContent === "") {year.textContent = "-"};
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(year);
        bookCard.addEventListener("click", (event) => { //show details button
            if (detailBoxExists === true) {deleteDetailBox()};
            showDetails(index);
            event.stopPropagation();
        });
        let tagArea = document.createElement("div");
        tagArea.classList.add("tagArea");
        bookCard.prepend(tagArea);
        let readStatus = document.createElement("button");
        readStatus.classList.add("unread");
        readStatus.textContent = displayedBooks[index].status;
        if (displayedBooks[index].status === "read") {readStatus.classList.toggle("read")};
        tagArea.append(readStatus);
        readStatus.addEventListener("click", (event) => { //read status button
            if (displayedBooks[index].status === "unread" ) {
                displayedBooks[index].status = "read";
                readStatus.classList.toggle("read")
                readStatus.textContent = displayedBooks[index].status;
                bookCard.classList.toggle("readBorder");
            } else if (displayedBooks[index].status === "read") {
                displayedBooks[index].status = "unread";
                readStatus.classList.toggle("read");
                readStatus.textContent = displayedBooks[index].status;
                bookCard.classList.toggle("readBorder");
            }
        });
        let removeButton = document.createElement("button"); // remove button
        removeButton.classList.add("removeButton");
        removeButton.textContent = "x";
        tagArea.append(removeButton);
        removeButton.addEventListener("click", (event) => {
            displayedBooks.splice(index,1);
            showBooks()
            event.stopPropagation();    
        });

    });
};

// this function creates a form and a button which listens to the inputs and 
// creates a new book object which will go into the displayedBooks array.
// the button also refreshes the displayedBooks by calling showBooks();

const newForm = function() {
    let form = document.createElement("div");
    form.classList.add("form");
    body.appendChild(form);
    for (let i=0; i<5; i++) {
        let label = document.createElement("label");
        let input = document.createElement("input");
        let inputBox = document.createElement("div");
        inputBox.classList.add("inputBox");
        form.appendChild(inputBox);
        inputBox.appendChild(label);
        inputBox.appendChild(input);
    };
    form.childNodes[0].firstChild.textContent = "Enter a title:";
    setAttributes(form.childNodes[0].lastChild, {"type": "text", "id": "title", "name": "title", "placeholder": "Ex.: Wuthering Heights", "maxlength": "100"});
    form.childNodes[1].firstChild.textContent = "Enter an author's name:";
    setAttributes(form.childNodes[1].lastChild, {"type": "text", "id": "author", "name": "author", "placeholder": "Ex.: Emily Bronte", "maxlength": "100"});
    form.childNodes[2].firstChild.textContent = "Enter a year:";
    setAttributes(form.childNodes[2].lastChild, {"type": "text", "id": "year", "name": "year", "placeholder": "Ex.: 1847", "maxlength": "8"});
    form.childNodes[3].firstChild.textContent = "Enter a number of pages:";
    setAttributes(form.childNodes[3].lastChild, {"type": "text", "id": "pages", "name": "pages", "placeholder": "Ex.: 400", "maxlength": "50"});
    form.childNodes[4].firstChild.textContent = "Enter a comment:";
    setAttributes(form.childNodes[4].lastChild, {"type": "text", "id": "comment", "name": "comment", "placeholder": " want to read / loved it", "maxlength": "200"});


    let submitButton = document.createElement("button");
    submitButton.classList.add("submitButton");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", ()=> {
        let inputTitle = document.querySelector("#title").value;
        let inputAuthor = document.querySelector("#author").value;
        let inputYear = document.querySelector("#year").value;
        let inputPages = document.querySelector("#pages").value;
        let inputComment = document.querySelector("#comment").value;
        if ((inputTitle !== "")) {
        let book = new Book(inputTitle, inputAuthor, inputYear, inputPages, inputComment);
        console.log(book);
        displayedBooks.unshift(book);
        };
        body.removeChild(form);
        main.classList.toggle("blur")
        formExists = false;
        showBooks();
    });
    form.appendChild(submitButton);
    



    main.classList.toggle("blur");
    formExists = true;
};

body.addEventListener("click", (event) => {
    deleteDetailBox();
});


// gives the new button its functionality
newBook.addEventListener("click", () => {
    if (formExists === false) {
        newForm();
    }
});

//the constructor for books//
/*function Book(title, author, year, pages, comment, status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.comment = comment;
    this.status = "unread";
};*/

class Book {
    constructor(title, author, year, pages, comment, status) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.comment = comment;
        this.status = "unread";
    }
}


//for style testing
for (let i=0; i<16; i++) {
let book = new Book("book"+i, i, "198"+i);
displayedBooks.push(book);
};

displayedBooks.unshift(new Book("Infinite Jest", "David Foster Wallace", "1996", "1000+", "Tough read.", "read"));
displayedBooks.unshift(new Book("The Little Prince", "Antoine de Saint-Exupéry", "1943", "+/- 140", "For kids."));
displayedBooks.unshift(new Book("In Search of Lost Time", "Marcel Proust", "1913–27", "so many", "Will try and read the french version"));

showBooks();