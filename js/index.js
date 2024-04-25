document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById('list');
    const bookDetails = document.getElementById('show-panel');

    //Function to fetch and display books

    function fetchBooks() {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(books => {
            books.forEach(book => renderBook(book));
        });
    }

    // Function to render a single book
    function renderBook(book) {
        const li = document.createElement('li');
        li.textContent = book.title;
        li.addEventListener('click', () => showBookDetails(book))
        bookList.appendChild(li);

    }

    // Function to display book details
    function showBookDetails(book) {
        bookDetails.innerHTML = `
            <h2>${book.title}</h2>
            <img src="${book.img_url}" alt="${book.title}" />
            <p>${book.description}</p>
            <h3>Users who like this book:</h3>
            <ul id="liked-users"></ul>
            <button id="liked-btn">Like</button>
        `;

        const likedUserList = document.getElementById('liked-users');
        book.users.forEach(user => {
            const li = document.createElement('li')
            li.textContent = user.username;
            likedUserList.appendChild(li);
        });

        const likeButton = document.getElementById('like-btn');
        likedButton.addEventListener('click',() => {
            likedBook(book);
        });
    }

    // Function to handle liking a book
    function likeBook(book) {
        const currentUser = {id: 1, username: "pouros"};
        const likedUserIds = book.users.map(user => user.id);
        if (!likedUserIds .includes(currentUser.id)) {
            const updatedUsers = [...book.users, currentUser];
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ users: updatedUsers}),
            })
                .then(resposne => response.json())
                .then(updatedBook => {
                    showBookDetails(upodatedBook);
                });
        } else {
            alert('You have already liked this book.');
        }
    }

    //Initial fetch of books 
    fetchBooks();
});
