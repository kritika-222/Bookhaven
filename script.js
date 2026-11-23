document.addEventListener("DOMContentLoaded", function() {
    console.log("Welcome to Book Haven!");

    // Contact Form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Thank you for contacting Book Haven! Your message has been received.");
            contactForm.reset();
        });
    }

    // Book Genre Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const bookCards = document.querySelectorAll(".collection-card");

    function filterBooks(genre) {
        bookCards.forEach(function(card) {
            const genres = (card.dataset.genres || "").split(",");
            card.hidden = genre !== "all" && !genres.includes(genre);
        });

        filterButtons.forEach(function(button) {
            button.classList.toggle("active", button.dataset.filter === genre);
        });
    }

    filterButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const selectedGenre = button.dataset.filter;
            filterBooks(selectedGenre);

            const newURL = selectedGenre === "all" ? "books.html" : "books.html?genre=" + selectedGenre;
            history.replaceState(null, "", newURL);
        });
    });

    // Read Genre from Homepage
    const params = new URLSearchParams(window.location.search);
    const selectedGenre = params.get("genre");

    if (filterButtons.length > 0) {
        const validGenre = Array.from(filterButtons).some(function(button) {
            return button.dataset.filter === selectedGenre;
        });

        filterBooks(validGenre ? selectedGenre : "all");
    }
});