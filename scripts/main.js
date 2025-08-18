import { sections } from "./data.js";

let emoticonIntervalId = null;
const colorPalette = ["#39F77C", "#F7D439", "#5539F7", "#FF1E71"];
let colorIndex = 0;

function createEmoticon(emoticon, container) {
  const span = document.createElement("span");
  span.classList.add(
    "emoticon",
    "mr-4",
    "inline-block",
    "whitespace-nowrap",
    "font-mono",
    "w-full",
    "md:w-auto"
  );

  // assign a random pastel color
  const hue = Math.floor(Math.random() * 360);
  span.style.color = colorPalette[colorIndex % colorPalette.length];
  colorIndex++;

  span.textContent = emoticon;
  if (emoticon === "hello ") {
    span.classList.add("text-[0.75rem]");
  }
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
      subheaderEl.className = "text-sm text-gray-600";
      subheaderEl.textContent = item.subheader;
      textDiv.appendChild(subheaderEl);
    }

    let descEl;
    // Description (optional)
    if (item.description) {
      if (isContact) {
        descEl = document.createElement("a");
        descEl.className = "text-sm text-gray-800 block break-words break-all";
        descEl.href = item.description;
      } else {
        descEl = document.createElement("p");
        descEl.className = "text-base text-gray-800";
      }
      descEl.textContent = item.description;
      textDiv.appendChild(descEl);
    }

    textDiv.prepend(nameEl); // Ensure name is first

    itemDiv.appendChild(textDiv);
    infoItems.appendChild(itemDiv);
  });
}

function toggleMenu(buttonColumn) {
  buttonColumn.classList.toggle("scale-y-0");
  buttonColumn.classList.toggle("scale-y-100");
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".emoticon-container");
  emoticonIntervalId = setInterval(() => {
    createEmoticon("hello ", container);
  }, 200);
});

document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll("[data-section]");
  const buttonColumn = document.getElementById("button-column");
  const middleContent = document.querySelector(".emoticon-container");
  const heading = document.getElementById("heading");
  const description = document.getElementById("description");
  const infoItems = document.getElementById("info-items");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section;
      if (sections[section]) {
        middleContent.textContent = "";
        heading.textContent = sections[section].heading;
        description.textContent = sections[section].text;
        renderItems(
          infoItems,
          sections[section].items,
          sections[section].heading === "Contact"
        );

        const emoticon = sections[section].emoticon;
        const container = document.querySelector(".emoticon-container");
        if (emoticonIntervalId !== null) {
          clearInterval(emoticonIntervalId);
        }
        emoticonIntervalId = setInterval(() => {
          createEmoticon(emoticon, container);
        }, 200);
        // type every 60ms
        toggleMenu(buttonColumn);
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu-button");
  const buttonColumn = document.getElementById("button-column");

  menuButton.addEventListener("click", () => {
    toggleMenu(buttonColumn);
  });
});
