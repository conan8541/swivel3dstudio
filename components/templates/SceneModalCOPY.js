export default function createSceneModal() {
    const app = document.querySelector("body > div");
    if (!app) throw new Error("App div not found");
  
    const overlay = document.createElement("div");
    overlay.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-70", "flex", "items-center", "justify-center", "z-50", "hidden");
  
    const modal = document.createElement("div");
    modal.classList.add(
      "bg-gray-900", "text-white", "p-6", "rounded-xl", "shadow-2xl",
      "w-[600px]", "h-[400px]", "relative", "border", "border-gray-700",
      "transform", "transition-all", "duration-300", "scale-95", "flex", "flex-col"
    );
  
    const header = document.createElement("h3");
    header.classList.add("text-2xl", "font-bold", "text-indigo-400", "text-center", "mb-6");
  
    const body = document.createElement("div");
    body.classList.add("flex-grow", "text-gray-300", "text-center");
    body.textContent = "Scene Stub - Endpoint Ready";
  
    const closeBtn = document.createElement("button");
    closeBtn.classList.add(
      "w-full", "py-4", "bg-gray-800", "text-indigo-400", "text-xl", "font-bold",
      "rounded-b-xl", "hover:bg-gray-700", "hover:text-indigo-300", "transition-all",
      "border-t", "border-gray-700", "focus:outline-none"
    );
    closeBtn.textContent = "CLOSE";
  
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    app.appendChild(overlay);
  
    const hide = () => {
      overlay.classList.add("hidden");
      modal.classList.add("scale-95");
      modal.classList.remove("scale-100");
    };
  
    return {
      show: (title, endpoint, onClose) => {
        header.textContent = title;
        body.textContent = `Scene Stub - ${endpoint || "No endpoint"}`;
        overlay.classList.remove("hidden");
        modal.classList.remove("scale-95");
        modal.classList.add("scale-100");
        closeBtn.onclick = () => {
          hide();
          if (onClose) onClose(); // Call back to reopen main modal
        };
      },
      hide
    };
  }