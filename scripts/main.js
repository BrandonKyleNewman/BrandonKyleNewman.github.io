import { sections } from "./data.js";

let emoticonIntervalId = null;
const colorPalette = ["#FF0040", "#FFCA2A", "#62D681", "#00A9D8"];
let colorIndex = 0;

function createEmoticon(emoticon, container) {
  const span = document.createElement("span");
  span.classList.add(
    "emoticon",
    "w-full", // force each span to take full row
    "md:w-auto", // go back to auto on medium+
    "text-center", // <-- centers the text inside on mobile
    "font-mono",
    "whitespace-nowrap",
    "px-2" // spacing when they’re side by side
  );

  // assign a random pastel color
  const hue = Math.floor(Math.random() * 360);
  span.style.color = colorPalette[colorIndex % colorPalette.length];
  colorIndex++;

  span.textContent = emoticon;
  container.appendChild(span);

  // check if we've overflown the container
  if (container.scrollHeight > container.clientHeight) {
    container.innerHTML = ""; // start over
  }
}

function renderItems(infoItems, items, isContact) {
  if (!items) return;

  infoItems.innerHTML = "";

  items.forEach((item) => {
    // Create item wrapper
    const itemDiv = document.createElement("div");
    itemDiv.className = "flex items-center space-x-6";

    // Text container
    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col";

    // Name (heading)
    const nameEl = document.createElement("h3");
    nameEl.className = "text-2xl font-semibold";
    nameEl.textContent = item.name;

    // Subheader (optional)
    if (item.subheader) {
      const subheaderEl = document.createElement("p");
      subheaderEl.className = "text-sm";
      subheaderEl.textContent = item.subheader;
      textDiv.appendChild(subheaderEl);
    }

    let descEl;
    // Description (optional)
    if (item.description) {
      if (isContact) {
        descEl = document.createElement("a");
        descEl.className = "text-sm block break-words break-all";
        descEl.href = item.description;
      } else {
        descEl = document.createElement("p");
        descEl.className = "text-base";
      }
      descEl.textContent = item.description;
      textDiv.appendChild(descEl);
    }

    textDiv.prepend(nameEl); // Ensure name is first

    itemDiv.appendChild(textDiv);
    infoItems.appendChild(itemDiv);
  });
}

function renderSection(sectionKey) {
  const emoticonSection = document.querySelector(".emoticon-container");
  const heading = document.getElementById("heading");
  const description = document.getElementById("description");
  const infoItems = document.getElementById("info-items");

  emoticonSection.textContent = "";
  heading.textContent = sections[sectionKey].heading;
  description.textContent = sections[sectionKey].text;
  renderItems(infoItems, sections[sectionKey].items, sectionKey === "contact");

  const emoticon = sections[sectionKey].emoticon;
  if (emoticonIntervalId !== null) {
    clearInterval(emoticonIntervalId);
  }

  emoticonIntervalId = setInterval(() => {
    createEmoticon(emoticon, emoticonSection);
  }, 500);
}

function toggleMenu(buttonColumn) {
  buttonColumn.classList.toggle("scale-y-0");
  buttonColumn.classList.toggle("scale-y-100");
}

document.addEventListener("DOMContentLoaded", () => {
  renderSection("about");

  const navButtons = document.querySelectorAll("[data-section]");
  const buttonColumn = document.getElementById("button-column");
  const menuButton = document.getElementById("menu-button");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section;
      if (sections[section]) {
        renderSection(section);
        toggleMenu(buttonColumn);
      }
    });
  });

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", !isExpanded);
    toggleMenu(buttonColumn);
  });
});
