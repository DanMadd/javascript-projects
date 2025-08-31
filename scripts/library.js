const libraryArray = [];
const addOpenDialogButton = document.getElementById("open-dialog-add-book-button");
const cancelButton = document.getElementById("cancel-book-button");
const addBookDialog = document.getElementById("add-book-dialog");
const addBookButton = document.getElementById("add-book-button");

addOpenDialogButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    tidyUpFields();
    addBookDialog.close();
})

addBookButton.addEventListener("click", addNewBook)

function Book(name, author, pages) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
}

function addNewBook(){
    let newBookTitle = document.getElementById("Book").value;
    let newBookAuthor = document.getElementById("Author").value;
    let newBookPages = Number(document.getElementById("Pages").value);

    if(newBookTitle.trim() !== "" && newBookAuthor.trim() !== "" && newBookPages > 0) {
        const newBook = new Book(newBookTitle, newBookAuthor, newBookPages)
        libraryArray.push(newBook);
        
        const newCard = document.createElement("div");
        newCard.className = "content-card";
        newCard.innerHTML = `
            <strong>${newBook.name}</strong><br>
            Author: ${newBook.author}<br>
            Pages: ${newBook.pages}
        `;

        const oldCard = document.getElementById("open-dialog-add-book-button").parentElement;
        console.log(oldCard);
        oldCard.parentElement.insertBefore(newCard, oldCard);


        tidyUpFields();
        addBookDialog.close();
        
        console.log(newBook);
        console.log(libraryArray);
    } else {
        window.alert("Not all values entered");
    }
}

function tidyUpFields() {
    document.getElementById("Book").value = "";
    document.getElementById("Author").value = "";
    document.getElementById("Pages").value = 0;
}