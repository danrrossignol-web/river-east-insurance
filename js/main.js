// 1. Function to load HTML components
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

// 2. Main Logic - Runs when page loads
document.addEventListener("DOMContentLoaded", async () => {
    
    // Load Header FIRST and wait for it to finish
    await loadComponent("header-placeholder", "components/header.html");
    
    // NOW it is safe to initialize the menu and highlighting
    // (because the header HTML now exists in the DOM)
    initMobileMenu();
    highlightCurrentPage();

    // Load Footer and Quote (Order doesn't matter for these)
    loadComponent("footer-placeholder", "components/footer.html");
    
    if (document.getElementById("quote-placeholder")) {
        // Optional: If you eventually make a components/quote.html
        // loadComponent("quote-placeholder", "components/quote.html");
    }
});

// 3. Mobile Menu Logic (The Hamburger)
function initMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    const navContainer = document.querySelector(".nav-container");

    // Create the Hamburger Icon dynamically
    const hamburger = document.createElement("div");
    hamburger.className = "hamburger";
    hamburger.innerHTML = "☰"; // Hamburger Icon
    
    // Style the hamburger (or move this to CSS if you prefer)
    Object.assign(hamburger.style, {
        fontSize: "2rem",
        cursor: "pointer",
        display: "none", // Hidden on desktop by default
        color: "#001f3f",
        paddingRight: "20px"
    });
    
    // Insert Hamburger before the nav menu
    if(navContainer && navLinks) {
        navContainer.insertBefore(hamburger, document.querySelector("nav"));

        // Toggle Menu on Click
        hamburger.addEventListener("click", () => {
            if (navLinks.style.display === "flex" && navLinks.style.position === "absolute") {
                // Close Menu
                navLinks.style.display = "none";
                hamburger.innerHTML = "☰";
            } else {
                // Open Menu
                navLinks.style.display = "flex";
                navLinks.style.flexDirection = "column";
                navLinks.style.position = "absolute";
                navLinks.style.top = "80px";
                navLinks.style.left = "0";
                navLinks.style.width = "100%";
                navLinks.style.background = "white";
                navLinks.style.padding = "20px";
                navLinks.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)";
                navLinks.style.zIndex = "1000";
                hamburger.innerHTML = "✕"; // Change to X
            }
        });

        // Handle Screen Resizing (Switch between Mobile/Desktop views)
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        function handleScreenChange(e) {
            if (e.matches) {
                // Mobile Mode
                hamburger.style.display = "block";
                navLinks.style.display = "none"; 
            } else {
                // Desktop Mode
                hamburger.style.display = "none";
                navLinks.style.display = "flex"; 
                navLinks.style.position = "static";
                navLinks.style.flexDirection = "row";
                navLinks.style.boxShadow = "none";
                navLinks.style.padding = "0";
                navLinks.style.background = "transparent";
            }
        }
        mediaQuery.addListener(handleScreenChange);
        handleScreenChange(mediaQuery); // Run immediately on load
    }
}

// 4. Highlight Active Page Logic
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const linkHref = link.getAttribute("href");
        
        // Check if link matches current page
        // OR if we are on root (index.html) and link is home
        if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
            link.style.color = "#fca311"; // Gold
            link.style.fontWeight = "bold";
            
            // Also highlight the parent dropdown if it's a sub-page
            const parentDropdown = link.closest(".dropdown");
            if (parentDropdown) {
                parentDropdown.querySelector(".dropbtn").style.color = "#fca311";
            }
        }
    });
}
