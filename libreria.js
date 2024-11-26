// Datos iniciales de los libros
const books = [
    { id: 1, title: "El Quijote", price: 15, image: "https://via.placeholder.com/150" },
    { id: 2, title: "Cien Años de Soledad", price: 20, image: "https://via.placeholder.com/150" },
    { id: 3, title: "El Principito", price: 10, image: "https://via.placeholder.com/150" },
    { id: 4, title: "1984", price: 18, image: "https://via.placeholder.com/150" },
    { id: 5, title: "El Señor de los Anillos", price: 25, image: "https://via.placeholder.com/150" }
];

// Variables del carrito
let cart = [];

// Referencias a elementos del DOM
const bookList = document.getElementById("bookList");
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const closeCart = document.getElementById("closeCart");

// Mostrar libros en la página
function displayBooks() {
    books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>Precio: $${book.price}</p>
            <button onclick="addToCart(${book.id})">Agregar al carrito</button>
        `;
        bookList.appendChild(bookDiv);
    });
}

// Agregar libro al carrito
function addToCart(bookId) {
    const book = books.find((b) => b.id === bookId);
    cart.push(book);
    updateCart();
}

// Actualizar carrito
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.textContent = `${item.title} - $${item.price}`;
        const removeButton = document.createElement("button");
        removeButton.ge
        removeButton.textContent = "Eliminar";
        removeButton.onclick = () => {
            cart.splice(index, 1);
            updateCart();
        };
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });

    totalPrice.textContent = total;
    cartButton.textContent = `Carrito (${cart.length})`;
}

// Mostrar/ocultar modal del carrito
cartButton.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});

// Inicializar
displayBooks();

// Cargar comentarios guardados al cargar la página
window.onload = () => {
    const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
    savedComments.forEach(({ username, comment }) => {
        const newComment = document.createElement("li");
        newComment.innerHTML = `
            <span>${username}:</span>
            ${comment}
        `;
        commentList.appendChild(newComment);
    });
};

// Guardar un comentario nuevo
commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const comment = commentInput.value.trim();

    if (username && comment) {
        const newComment = document.createElement("li");
        newComment.innerHTML = `
            <span>${username}:</span>
            ${comment}
        `;
        commentList.appendChild(newComment);

        // Guardar en localStorage
        const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
        savedComments.push({ username, comment });
        localStorage.setItem("comments", JSON.stringify(savedComments));

        // Limpiar los campos de texto
        usernameInput.value = "";
        commentInput.value = "";
    }
});

//Boton de busqueda 
// Referencias a elementos del DOM
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");



// Función de búsqueda
function searchBooks() {
    const query = searchInput.value.trim().toLowerCase(); // Obtener la búsqueda en minúsculas
    searchResults.innerHTML = ""; // Limpiar resultados anteriores

    if (query === "") {
        searchResults.innerHTML = "<p>Por favor, escribe algo para buscar.</p>";
        return;
    }

    // Filtrar libros por título
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query)
    );

    // Mostrar resultados
    if (filteredBooks.length > 0) {
        filteredBooks.forEach((book) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Precio: $${book.price}</p>
                <button onclick="addToCart(${book.id})">Agregar al carrito</button>
            `;
            searchResults.appendChild(bookDiv);
        });
    } else {
        searchResults.innerHTML = "<p>No se encontraron resultados.</p>";
    }
}

// Evento de clic en el botón
searchButton.addEventListener("click", (e) => {
    e.preventDefault(); // Evitar recarga de la página
    searchBooks();
});

// Evento al presionar Enter en el campo de búsqueda
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        searchBooks();
    }
});
