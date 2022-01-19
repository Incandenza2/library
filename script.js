"use strict";
const newBook = document.querySelector(".newBook");
const shelf = document.querySelector(".shelf");
const body = document.querySelector("body");
const main = document.querySelector("main");
let formExists = false;

let displayedBooks = [];
//function to set attributes on the input boxes in the form
function setAttributes(element, attributes) {
    for (let key in attributes) {
        element.setAttribute(key, attributes[key]);
    };
};


// this function will refresh to display all books each time one is added
const showBooks = function() {
    shelf.replaceChildren("");
    displayedBooks.forEach((item, index, array) => {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.setAttribute("data", `${index}`);
        shelf.appendChild(bookCard);
        let bookTitle = document.createElement("h4");
        let year = document.createElement("h4");
        bookTitle.textContent = displayedBooks[index].title;
        year.textContent = displayedBooks[index].year;
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(year);
        let removeButton = document.createElement("button");
        removeButton.classList.add("removeButton");
        removeButton.textContent = "x";
        bookCard.prepend(removeButton);
        removeButton.addEventListener("click", () => {
            displayedBooks.splice(index,1);
            showBooks();    
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
    setAttributes(form.childNodes[0].lastChild, {"type": "text", "id": "title", "name": "title", "placeholder": "Ex.: Wuthering Heights"});
    form.childNodes[1].firstChild.textContent = "Enter an author's name:";
    setAttributes(form.childNodes[1].lastChild, {"type": "text", "id": "author", "name": "author", "placeholder": "Ex.: Emily Bronte"});
    form.childNodes[2].firstChild.textContent = "Enter a year:";
    setAttributes(form.childNodes[2].lastChild, {"type": "text", "id": "year", "name": "year", "placeholder": "Ex.: 1847"});
    form.childNodes[3].firstChild.textContent = "Enter a number of pages:";
    setAttributes(form.childNodes[3].lastChild, {"type": "text", "id": "pages", "name": "pages", "placeholder": "Ex.: 400"});
    form.childNodes[4].firstChild.textContent = "Enter a comment:";
    setAttributes(form.childNodes[4].lastChild, {"type": "text", "id": "comment", "name": "comment", "placeholder": " want to read / loved it"});


    let submitButton = document.createElement("button");
    submitButton.classList.add("submitButton");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", ()=> {
        let inputTitle = document.querySelector("#title").value;
        let inputAuthor = document.querySelector("#author").value;
        let inputYear = document.querySelector("#year").value;
        let inputPages = document.querySelector("#pages").value;
        let inputComment = document.querySelector("#comment").value;
        let book = new Book(inputTitle, inputAuthor, inputYear, inputPages, inputComment);
        console.log(book);
        displayedBooks.unshift(book);
        body.removeChild(form);
        main.classList.toggle("blur")
        formExists = false;
        showBooks();
    });
    form.appendChild(submitButton);
    



    main.classList.toggle("blur");
    formExists = true;
};

// gives the new button its functionality
newBook.addEventListener("click", () => {
    if (formExists === false) {
        newForm();
    }
});

//the constructor for books//
function Book(title, author, year, pages, comment) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.comment = comment;
    
};


//for style testing
for (let i=0; i<10; i++) {
let book = new Book("book"+i, i, "198"+i, i, i);
displayedBooks.push(book);
};
showBooks();