import { cardData } from './data/cardData';
import createModal from './templates/modal.js';
import createSceneModal from './templates/SceneModal.js';

export default function createCards() {
  const container = document.createElement("section");
  container.id = "webGlCard";
  container.classList.add("card-container", "w-full", "py-8");

  const sectionTitle = document.createElement("h2");
  sectionTitle.classList.add("text-3xl", "font-bold", "text-center", "mb-6", "text-black");
  sectionTitle.textContent = "Our Capabilities";
  container.appendChild(sectionTitle);

  const grid = document.createElement("div");
  grid.classList.add("grid", "grid-cols-3", "gap-4", "max-w-6xl", "mx-auto");
  container.appendChild(grid);

  const mainModal = createModal();
  const sceneModal = createSceneModal();

  cardData.forEach((data) => {
    const card = document.createElement("div");
    card.classList.add("webGLcard", "flex", "flex-col", "h-full");

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
    desc.classList.add("text-base", "font-light", "mid-gray-text", "mt-1", "flex-grow");
    desc.textContent = data.description;
    card.appendChild(desc);

    card.classList.add("cursor-pointer", "hover:shadow-lg", "transition-shadow");
    card.onclick = () => {
      const menuWithBack = data.menu.map(item => ({
        ...item,
        onclick: () => {
          console.log(data.menu[0])
          let setPath = data.menu[0]
          mainModal.hide();
          sceneModal.show(item.title, item.nuScene, () => { // Use scenePath, not endpoint
            mainModal.show(data.title, data.description, menuWithBack);
          });
        }
      }));
      mainModal.show(data.title, data.description, menuWithBack);
    };

    grid.appendChild(card);
  });

  document.querySelector("body > div").appendChild(container);
}