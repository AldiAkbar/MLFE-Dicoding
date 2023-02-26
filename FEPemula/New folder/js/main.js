const bookshelf = [];
const RENDER_EVENT = 'render-bookshelf';

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
}


const SAVED_EVENT = 'saved-book';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookshelf);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

document.addEventListener(SAVED_EVENT, function () {
    console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
   
    if (data !== null) {
      for (const book of data) {
        bookshelf.push(book);
      }
    }
   
    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener('DOMContentLoaded', function () {
    const submitBook = document.getElementById('inputBook');
    submitBook.addEventListener('submit', function (event) {
      event.preventDefault();
      addBookToShelf();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

document.addEventListener(RENDER_EVENT, function () {
    // console.log(bookshelf);

    const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
    incompleteBookshelfList.innerHTML = '';

    const completeBookshelfList = document.getElementById('completeBookshelfList');
    completeBookshelfList.innerHTML = '';
   
    for (const bookItem of bookshelf) {
      const bookElement = placeBookOnShelf(bookItem);
      if(!bookItem.isCompleted) {
            incompleteBookshelfList.append(bookElement);
      } else {
            completeBookshelfList.append(bookElement);
      }
    }
});


function addBookToShelf() {
    const generatedID = generateId();
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const bookObject = generateBookObject(generatedID, title, author, year, isCompleted);
    bookshelf.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function placeBookOnShelf(bookObject) {
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookObject.title;
    
    const textAuthor = document.createElement('p');
    textAuthor.innerText = bookObject.author;

    const textYear = document.createElement('p');
    textYear.innerText = bookObject.year;

    const redButton = document.createElement('button');
    redButton.classList.add('red');
    redButton.innerText = 'Hapus Buku';

    const greenButton = document.createElement('button');
    greenButton.classList.add('green');

    
    
    if(bookObject.isCompleted) {
        greenButton.innerText = 'Belum Selesai Dibaca';
        greenButton.addEventListener('click', function () {
            undoBookFromCompleted(bookObject.id);
        });

        redButton.addEventListener('click', function () {
            removeBookFromShelf(bookObject.id);
        });

        const action = document.createElement('div');
        action.classList.add('action');
        action.append(greenButton, redButton);
                
        const textArticle = document.createElement('article');
        textArticle.classList.add('book_item');
        textArticle.setAttribute('id', `book-${bookObject.id}`);
        textArticle.append(textTitle, textAuthor, textYear, action);
        
        return textArticle;
    } else {
        greenButton.innerText = 'Selesai Dibaca';
        greenButton.addEventListener('click', function () {
            addBookToCompleted(bookObject.id);
        });

        redButton.addEventListener('click', function () {
            removeBookFromShelf(bookObject.id);
        });

        const action = document.createElement('div');
        action.classList.add('action');
        action.append(greenButton, redButton);
                
        const textArticle = document.createElement('article');
        textArticle.classList.add('book_item');
        textArticle.setAttribute('id', `book-${bookObject.id}`);
        textArticle.append(textTitle, textAuthor, textYear, action);
        
        return textArticle;
    }
}

function findBook(bookId) {
    for (const book of bookshelf) {
      if (book.id === bookId) {
        return book;
      }
    }
    return null;
}

function findBookIndex(todoId) {
    for (const index in bookshelf) {
        if (bookshelf[index].id === todoId) {
            return index;
        }
    }
    return -1;
}

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);
   
    if (bookTarget == null) return;
   
    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function removeBookFromShelf(bookId) {
    const bookTarget = findBookIndex(bookId);
   
    if (bookTarget === -1) return;
   
    bookshelf.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}


const inputSearch = document.getElementById('searchBookTitle');
inputSearch.addEventListener('keyup', function(event) {
    const text = event.target.value.toLowerCase();
    
    document.querySelectorAll('.book_item').forEach(function(book) {
        const bookTitle = book.getElementsByTagName('h3')[0].innerText;
        
        if(bookTitle.toLowerCase().indexOf(text) != -1) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
    
    // for(const book of booksTitle) {
    //     console.log(book);
    // }
});
