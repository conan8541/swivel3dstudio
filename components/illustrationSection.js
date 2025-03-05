import { categoryData } from './data/categoryData';

export default function createIllustrationSection() {
  const container = document.createElement("section");
  container.classList.add("w-full", "py-8", "bg-gray-800");

  const inner = document.createElement("div");
  inner.classList.add("container", "mx-auto", "flex", "flex-col");

  categoryData.forEach((data, index) => {
    const row = document.createElement("div");
    row.classList.add("hero-content", "flex");
    row.style.flexDirection = index % 2 === 1 ? "row-reverse" : "row"; // Force it
    console.log(`Index ${index}: ${row.style.flexDirection} - ${data.title}`);

    const img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.title;
    img.classList.add("max-w-sm", "rounded-lg", "shadow-2xl", "transition-all", "duration-500");
    img.style.transitionDelay = `${index * 0.2}s`;
    row.addEventListener("mouseenter", () => img.classList.add("scale-105"));
    row.addEventListener("mouseleave", () => img.classList.remove("scale-105"));

    const textDiv = document.createElement("div");
    textDiv.classList.add("p-4");
    const title = document.createElement("h3");
    title.classList.add("text-2xl", "font-bold");
    title.textContent = data.title;
    const desc = document.createElement("p");
    desc.classList.add("py-4", "text-gray-300");
    desc.textContent = data.description;

    textDiv.appendChild(title);
    textDiv.appendChild(desc);
    row.appendChild(img);
    row.appendChild(textDiv);
    inner.appendChild(row);
  });

  container.appendChild(inner);
  document.querySelector("body > div").appendChild(container);
}