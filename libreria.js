// Datos iniciales de los libros
const books = [
    { id: 1, title: "El Quijote", price: 15, onSale: true, discount: 0.2, image: "https://via.placeholder.com/150", description: "Una de las mayores obras de la literatura española escrita por Miguel de Cervantes." },
    { id: 2, title: "Cien Años de Soledad", price: 20, onSale: false, discount: 0, image: "https://via.placeholder.com/150", description: "Un clásico de la literatura latinoamericana escrito por Gabriel García Márquez." },
    { id: 3, title: "El Principito", price: 10, onSale: true, discount: 0.1, image: "https://via.placeholder.com/150", description: "Un libro poético y filosófico escrito por Antoine de Saint-Exupéry." },
    { id: 4, title: "1984", price: 18, onSale: false, discount: 0, image: "https://via.placeholder.com/150", description: "Una novela distópica escrita por George Orwell que explora temas de control y libertad." },
    { id: 5, title: "El Señor de los Anillos", price: 25, onSale: true, discount: 0.3, image: "https://via.placeholder.com/150", description: "La novela narra el viaje del protagonista principal, Frodo Bolsón, hobbit de la Comarca, para destruir el Anillo Único y la consiguiente guerra que provocará el enemigo para recuperarlo, ya que es la principal fuente de poder de su creador, el señor oscuro Sauron. Tres Anillos para los Reyes Elfos bajo el cielo." }
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
            <button onclick="speakDescription(${book.id})">🔊 Escuchar descripción</button>
        `;
        bookList.appendChild(bookDiv);
    });
}
//funcion para reproducir audio
function playAudio(bookId) {
    // Pausar cualquier audio que esté reproduciéndose
    document.querySelectorAll("audio").forEach((audio) => audio.pause());

    // Reproducir el audio del libro seleccionado
    const audioElement = document.getElementById(`audio-${bookId}`);
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}
function speakDescription(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const speech = new SpeechSynthesisUtterance(book.description);
    speech.lang = "es-ES"; // Configuración de idioma: español (España)
    speech.rate = 1; // Velocidad de la voz
    speech.pitch = 1; // Tono de la voz

    window.speechSynthesis.cancel(); // Detener cualquier voz activa
    window.speechSynthesis.speak(speech); // Hablar la descripción
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
        removeButton.style.backgroundColor = "red";
        removeButton.style.color = "white";
        removeButton.style.border= "none";
        removeButton.style.borderRadius = "20px";
        removeButton.style.padding= "10px 20px";
        removeButton.style.cursor= " pointer";
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
    console.log("Click en el carrito");
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
                <button onclick="speakDescription(${book.id})">🔊 Escuchar descripción</button>
            `;
            searchResults.appendChild(bookDiv);
        });
    } else {
        console.log(searchResults)
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
function displayPromotions() {
    const offersList = document.getElementById("offersList");
    offersList.innerHTML = ""; // Limpia el contenido anterior

    // Filtra libros en promoción
    const promoBooks = books.filter((book) => book.onSale);

    // Mostrar cada libro en promoción
    promoBooks.forEach((book) => {
        const offerDiv = document.createElement("div");
        offerDiv.classList.add("book-card");

        // Calcula el precio con descuento
        const discountedPrice = (book.price * (1 - book.discount)).toFixed(2);

        offerDiv.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><del>$${book.price}</del> $${discountedPrice}</p>
            
            <button onclick="addToCart(${book.id})">Agregar al carrito</button>
            <button onclick="speakDescription(${book.id})">🔊 Escuchar descripción</button>
        `;
        offersList.appendChild(offerDiv);
    });
}

// Llama a la función al cargar la página
window.onload = () => {
    displayPromotions(); // Mostrar libros en promoción
};

