// Function to load HTML components
async function loadComponent(id, file) {
    try {
        const response = await fetch(file);
        if (response.ok) {
            const text = await response.text();
            document.getElementById(id).innerHTML = text;
        } else {
            console.error(`Error loading ${file}`);
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

// Load Components
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("header-placeholder", "components/header.html");
    loadComponent("footer-placeholder", "components/footer.html");
    
    // This tries to load the quote section. If the page doesn't have the placeholder, it just skips it.
    if (document.getElementById("quote-placeholder")) {
        loadComponent("quote-placeholder", "components/quote.html");
    }
});
