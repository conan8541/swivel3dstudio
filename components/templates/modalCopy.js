export default function createModal() {
    const app = document.querySelector("body > div");
    if (!app) throw new Error("App div not found");
  
    const overlay = document.createElement("div");
    overlay.classList.add("fixed", "inset-0", "bg-black", "bg-opacity-70", "flex", "items-center", "justify-center", "z-50", "hidden");
  
    const modal = document.createElement("div");
    modal.classList.add(
      "bg-gray-900", "text-white", "p-6", "rounded-xl", "shadow-2xl",
      "w-[500px]", "h-[700px]", "relative", "border", "border-gray-700",
      "transform", "transition-all", "duration-300", "scale-95", "flex", "flex-col"
    );
  
    const icon = document.createElement("div");
    icon.classList.add("w-16", "h-16", "mx-auto", "mb-4");
    icon.innerHTML = `
      <svg class="w-full h-full text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v8m-4-4h8"></path>
      </svg>
    `;
  
    const header = document.createElement("h3");
    header.classList.add("text-2xl", "font-bold", "text-indigo-400", "text-center", "mb-6");
  
    const body = document.createElement("div");
    body.classList.add("flex", "flex-grow", "mb-4");
  
    const contentLeft = document.createElement("ul");
    contentLeft.classList.add("w-1/2", "pr-4", "space-y-2", "overflow-y-auto");
  
    const contentRight = document.createElement("p");
    contentRight.classList.add("w-1/2", "text-gray-300", "text-sm", "leading-relaxed", "pl-4", "border-l", "border-gray-700");
  
    const returnBtn = document.createElement("button");
    returnBtn.classList.add(
      "w-full", "py-4", "bg-gray-800", "text-indigo-400", "text-xl", "font-bold",
      "rounded-b-xl", "hover:bg-gray-700", "hover:text-indigo-300", "transition-all",
      "border-t", "border-gray-700", "focus:outline-none"
    );
    returnBtn.textContent = "RETURN";
  
    const closeBtn = document.createElement("button");
    closeBtn.classList.add(
      "absolute", "top-3", "right-3", "text-gray-400", "hover:text-indigo-300",
      "text-2xl", "font-bold", "w-8", "h-8", "flex", "items-center", "justify-center",
      "bg-gray-800", "rounded-full", "transition-colors"
    );
    closeBtn.innerHTML = "×";
  
    body.appendChild(contentLeft);
    body.appendChild(contentRight);
    modal.appendChild(icon);
    modal.appendChild(header);
    modal.appendChild(body);
    modal.appendChild(returnBtn);
    modal.appendChild(closeBtn);
    overlay.appendChild(modal);
    app.appendChild(overlay);
  
    // Define hide first
    const hide = () => {
      overlay.classList.add("hidden");
      modal.classList.add("scale-95");
      modal.classList.remove("scale-100");
    };
  
    closeBtn.onclick = hide;
    returnBtn.onclick = hide;
  
    return {
      show: (title, desc, menuItems) => {
        header.textContent = title;
        contentRight.textContent = desc;
        contentLeft.innerHTML = "";
        if (menuItems) {
          menuItems.forEach(item => {
            const li = document.createElement("li");
            li.classList.add(
              "text-gray-300", "text-sm", "hover:text-indigo-400", "cursor-pointer",
              "transition-colors", "pl-2", "border-l-2", "border-transparent", "hover:border-indigo-400"
            );
            li.textContent = `• ${item.title}`;
            li.onclick = item.onclick; // Relies on passed onclick
            contentLeft.appendChild(li);
          });
        }
        overlay.classList.remove("hidden");
        modal.classList.remove("scale-95");
        modal.classList.add("scale-100");
      },
      hide: hide // Explicitly pass the function
    };
  }