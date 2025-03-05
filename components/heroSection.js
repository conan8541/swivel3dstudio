export default function createHeroSection() {
    const section = document.createElement("section");
    section.classList.add("hero", "w-full", "h-screen", "bg-base-200", "text-base-content", "relative", "bg-gradient-radial", "from-gray-200", "via-gray-400", "to-gray-500");
  
    const canvas = document.createElement("canvas");
    canvas.id = "renderCanvas";
    canvas.classList.add("w-full", "h-full", "outline-none");
    section.appendChild(canvas);
  
    const overlay = document.createElement("div");
    overlay.classList.add("absolute", "top-0", "left-0", "w-full", "text-center", "p-8", "z-10");
    const h1 = document.createElement("h1");
    h1.classList.add("text-5xl", "font-black", "text-white");
    h1.textContent = "swivel3dstudio";
    const p = document.createElement("p");
    p.classList.add("mt-4", "text-lg", "text-white");
    p.textContent = "We’re your full-spectrum partner in precision visualization—crafting rapid, reliable solutions from concept to completion that deliver results.";
    overlay.appendChild(h1);
    overlay.appendChild(p);
    section.appendChild(overlay);
  
    document.querySelector("body > div").appendChild(section);
    return canvas; // Return for Babylon setup
  }