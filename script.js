
const API_URL = "https://fakestoreapi.com/products";

const dashboard = document.getElementById("dashboard");
const message = document.getElementById("message");

async function loadMachines() {
    dashboard.innerHTML = "";
    message.textContent = "Loading data...";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch data from API");
        }

        const machines = await response.json();

        // Allowed machine categories
        const validCategories = [
            "electronics",
            "jewelery",
            "men's clothing",
            "women's clothing"
        ];

        machines.forEach(machine => {
            // Check whether category is valid
            if (!validCategories.includes(machine.category)) {
                throw new Error(
                    "Invalid machine category: " + machine.category
                );
            }

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${machine.image}" alt="Product">
                <h3>${machine.title}</h3>
                <p>Price: $${machine.price}</p>
                <p>Category: ${machine.category}</p>
            `;

            dashboard.appendChild(card);
        });

        message.textContent = "Data loaded successfully!";

    } catch (error) {
        message.className = "error";
        message.textContent = "Error: " + error.message;
    }
}

// Load data automatically
loadMachines();
