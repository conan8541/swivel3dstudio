// components/webGlCard.js
import { cardData } from './data/cardData';

export default function createCards() {
  const container = document.getElementById("webGlCard"); // Select the container by id

  // Ensure the container is empty before appending new cards
  container.innerHTML = ''; // Clear any previous content

  // Loop through the card data and create a card for each entry
  cardData.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("webGLcard"); // Class for card styling

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content"); // Class for card content

    const cardText = document.createElement("p");
    cardText.classList.add("card-text", "mid-gray-text"); // Applying mid-gray text

    // Use the title and description from the cardData array
    cardText.textContent = `${data.title}: ${data.description}`;

    cardContent.appendChild(cardText);
    card.appendChild(cardContent);

    // Append the card to the container
    container.appendChild(card);
  });
}

  