document.addEventListener("DOMContentLoaded", function () {
    const bookForm = document.getElementById("bookForm");
    const searchForm = document.getElementById("searchBook");
    const incompleteBookList = document.getElementById("incompleteBookList");
    const completeBookList = document.getElementById("completeBookList");
  
    let books = JSON.parse(localStorage.getItem("books")) || [];
  
    bookForm.addEventListener("submit", function (event) {
      event.preventDefault();
      addBook();
    });
  
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      searchBook();
    });
  
    function addBook() {
      const title = document.getElementById("bookFormTitle").value;
      const author = document.getElementById("bookFormAuthor").value;
      const year = parseInt(document.getElementById("bookFormYear").value);
      const isComplete = document.getElementById("bookFormIsComplete").checked;
  
      const book = {
        id: new Date().getTime(),
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(book);
      saveBooks();
      renderBooks();
      bookForm.reset();
    }
  
    function searchBook() {
      const searchTitle = document.getElementById("searchBookTitle").value.toLowerCase();
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTitle)
      );
      renderBooks(filteredBooks);
    }
  
    function renderBooks(bookData = books) {
      incompleteBookList.innerHTML = "";
      completeBookList.innerHTML = "";
  
      bookData.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.setAttribute("data-bookid", book.id);
        bookItem.setAttribute("data-testid", "bookItem");
        bookItem.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">${book.isComplete ? "Belum selesai dibaca" : "Selesai dibaca"}</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          </div>
        `;
  
        const isCompleteButton = bookItem.querySelector("[data-testid='bookItemIsCompleteButton']");
        isCompleteButton.addEventListener("click", function () {
          toggleBookStatus(book.id);
        });
  
        const deleteButton = bookItem.querySelector("[data-testid='bookItemDeleteButton']");
        deleteButton.addEventListener("click", function () {
          deleteBook(book.id);
        });
  
        if (book.isComplete) {
          completeBookList.appendChild(bookItem);
        } else {
          incompleteBookList.appendChild(bookItem);
        }
      });
    }
  
    function toggleBookStatus(bookId) {
      books = books.map((book) =>
        book.id === bookId ? { ...book, isComplete: !book.isComplete } : book
      );
      saveBooks();
      renderBooks();
    }
  
    function deleteBook(bookId) {
      books = books.filter((book) => book.id !== bookId);
      saveBooks();
      renderBooks();
    }
  
    function saveBooks() {
      localStorage.setItem("books", JSON.stringify(books));
    }
  
    renderBooks();
  });
  