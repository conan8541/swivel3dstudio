import { library, icon } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faYoutube, faFacebook } from '@fortawesome/free-brands-svg-icons';

library.add(faTwitter, faYoutube, faFacebook);

export default function createFooterSection() {
  const footer = document.createElement("footer");
  footer.classList.add("footer", "footer-center", "bg-base-200", "text-base-content", "rounded", "p-10");

  const navLinks = document.createElement("nav");
  navLinks.classList.add("grid", "grid-flow-col", "gap-4");
  ["About us", "Contact", "Jobs", "Press kit"].forEach(text => {
    const a = document.createElement("a");
    a.classList.add("link", "link-hover");
    a.textContent = text;
    navLinks.appendChild(a);
  });

  const navSocial = document.createElement("nav");
  const socialDiv = document.createElement("div");
  socialDiv.classList.add("grid", "grid-flow-col", "gap-4");
  const socialIcons = [
    { name: "twitter", id: "twitter" },
    { name: "youtube", id: "youtube" },
    { name: "facebook", id: "facebook" }
  ];
  socialIcons.forEach(social => {
    const a = document.createElement("a");
    const svg = icon({ prefix: "fab", iconName: social.name }).node[0];
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    a.appendChild(svg);
    socialDiv.appendChild(a);
  });
  navSocial.appendChild(socialDiv);

  const p = document.createElement("p");
  p.textContent = `Copyright © ${new Date().getFullYear()} - All rights reserved by swivel3dstudio`;

  footer.style.display = "flex";
  footer.style.flexDirection = "column";
  footer.style.alignItems = "center";
  navLinks.style.display = "flex";
  navLinks.style.gap = "1rem";
  socialDiv.style.display = "flex";
  socialDiv.style.gap = "1rem";

  footer.appendChild(navLinks);
  footer.appendChild(navSocial);
  footer.appendChild(p);
  document.querySelector("body > div").appendChild(footer);
}