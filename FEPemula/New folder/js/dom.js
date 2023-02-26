document.addEventListener('DOMContentLoaded', function () {
    const submitBook = document.getElementById('inputBook');
    submitBook.addEventListener('submit', function (event) {
      event.preventDefault();
      addBookToShelf();
    });
});