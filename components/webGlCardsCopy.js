import { cardData } from './data/cardData';

export default function createCards() {
  const container = document.createElement("section");
  container.id = "webGlCard";
  container.classList.add("card-container", "w-full", "py-8");

  // Section Title
  const sectionTitle = document.createElement("h2");
  sectionTitle.classList.add("text-3xl", "font-bold", "text-center", "mb-6", "text-black");
  sectionTitle.textContent = "Our Capabilities";
  container.appendChild(sectionTitle);

  // Card Grid
  const grid = document.createElement("div");
  grid.classList.add("grid", "grid-cols-3", "gap-4", "max-w-6xl", "mx-auto");
  container.appendChild(grid);

  cardData.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("webGLcard", "flex", "flex-col", "h-full"); // Flex column, full height

    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.title;
    img.classList.add("w-full", "h-48", "object-cover");
    card.appendChild(img);

    const title = document.createElement("p");
    title.classList.add("text-lg", "font-bold", "mid-gray-text", "mt-2");
    title.textContent = data.title;
    card.appendChild(title);

    const desc = document.createElement("p");
    desc.classList.add("text-base", "font-light", "mid-gray-text", "mt-1", "flex-grow"); // Grow to fill
    desc.textContent = data.description;
    card.appendChild(desc);

    grid.appendChild(card);
  });

  document.querySelector("body > div").appendChild(container);
}