const libraryArray = [];
const addOpenDialogButton = document.getElementById("open-dialog-add-book-button");
const cancelButton = document.getElementById("cancel-book-button");
const addBookDialog = document.getElementById("add-book-dialog");
const addBookButton = document.getElementById("add-book-button");

libraryArray[0] = new Book("The Hobbit", "JRR Tolkien", 400);
libraryArray[1] = new Book("Hungry Caterpillar", "Big Caterpillar", 15);

loadSavedBooks();

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
    this.read = 0;
}

function addNewBook(){
    let newBookTitle = document.getElementById("Book").value;
    let newBookAuthor = document.getElementById("Author").value;
    let newBookPages = Number(document.getElementById("Pages").value);

    if(newBookTitle.trim() !== "" && newBookAuthor.trim() !== "" && newBookPages > 0) {
        const newBook = new Book(newBookTitle, newBookAuthor, newBookPages)
        libraryArray.push(newBook);
    
        newBookCard(newBook);

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

function loadSavedBooks() {
    let libraryLen = libraryArray.length;

    for (let i = 0; i < libraryLen; i++) {
        const savedBook = libraryArray[i];
        newBookCard(savedBook);
        console.log(`Added ${savedBook.name}`);
    }
}

function newBookCard(bookToAdd) {
    const newCard = document.createElement("div");
    newCard.id = bookToAdd.id;
    newCard.className = "content-card text-center";
    newCard.innerHTML = `
        <div class="book-delete" title="Remove Book" onclick="removeBook('${bookToAdd.id}')">✖</div>
        <h3 class="book-name"><strong>${bookToAdd.name}</strong></h3><br>
        <span class="book-author">Author:<br>${bookToAdd.author}</span><br>
        <span class="book-pages">Pages:<br>${bookToAdd.pages}</span>
        <span class="book-read">Read:</span>
        <div id="${bookToAdd.id + "-check"}" class="book-mark-read" onclick="markBookAsRead('${bookToAdd.id}')"></div>
    `;

    const oldCard = document.getElementById("open-dialog-add-book-button").parentElement;
    oldCard.parentElement.insertBefore(newCard, oldCard);
}

function removeBook(bookID) {
    const bookToRemove = document.getElementById(bookID);
    bookToRemove.remove();
    const idToRemove = libraryArray.findIndex(book => book.id === bookID);
    libraryArray.splice(idToRemove, 1);
}

function markBookAsRead(bookID) {
    const getBookByID = libraryArray.find(book => book.id === bookID);
    if (getBookByID.read == 1) {
        getBookByID.read = 0;
        document.getElementById(`${bookID+"-check"}`).innerHTML = "";
    } else {
        getBookByID.read = 1;
        document.getElementById(`${bookID+"-check"}`).innerHTML = "✔";
    }
}