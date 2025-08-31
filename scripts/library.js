document.getElementById("add-book-button").addEventListener("click",addNewBook)

const myLibrary = [];

function Book(name, author, pages) {
    this.name = name;
    this.author = author;
    this.pages = pages;
}

function addNewBook(){
    console.log("button heard")
}

