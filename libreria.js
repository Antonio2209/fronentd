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

// Referencias a elementos del DOM comentario
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");

// Manejar el envío del formulario
commentForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevenir recarga de la página

    // Obtener el comentario
    const comment = commentInput.value.trim();

    if (comment) {
        // Crear un nuevo elemento de lista
        const newComment = document.createElement("li");
        newComment.textContent = comment;

        // Agregar el comentario a la lista
        commentList.appendChild(newComment);

        // Limpiar el campo de texto
        commentInput.value = "";
    }
});

