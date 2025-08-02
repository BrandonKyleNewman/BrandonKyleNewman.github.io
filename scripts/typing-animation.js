let emoticonIntervalId = null;
const colorPalette = ["#39F77C", "#F7D439", "#5539F7", "#FF1E71"];
let colorIndex = 0;

function createEmoticon(emoticon, container) {
    const span = document.createElement("span");
    span.classList.add("emoticon", "mr-4", "inline-block");

    // assign a random pastel color
    const hue = Math.floor(Math.random() * 360);
    span.style.color = colorPalette[colorIndex%colorPalette.length];
    colorIndex++;

    span.textContent = emoticon;
    container.appendChild(span);

    // check if we've overflown the container
    if (container.scrollHeight > container.clientHeight) {
      container.innerHTML = ""; // start over
    }
  }

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.emoticon-container');  
    emoticonIntervalId = setInterval(() => {
        createEmoticon("hello ", container);
    }, 60);
});  

document.addEventListener("DOMContentLoaded", () => {
    const navButtons = document.querySelectorAll("[data-section]");
    const middleContent = document.querySelector(".emoticon-container");
    const heading = document.getElementById("heading");
    const description = document.getElementById("description");
  
    const sections = {
      about: {
        emoticon: ":)",
        heading: "About Me",
        text: "I might use this section as long a live blog. Like a billboard kinda thing."
      },
      projects: {
        emoticon: ">:3",
        heading: "Work",
        text: "I'm currently a Senior Software Engineer on the Platform team at Courier Health. I primarily focus on expanding and scaling our abilities to import customer data and transform it for the Courier Health platform."
      },
      contact: {
        emoticon: "<3",
        heading: "Contact",
        text: "I hope to hear nice things from you: "
      }
    };
  
    navButtons.forEach(button => {
      button.addEventListener("click", () => {
        const section = button.dataset.section;
        if (sections[section]) {
          middleContent.textContent = "";
          heading.textContent = sections[section].heading;
          description.textContent = sections[section].text;

          const emoticon = sections[section].emoticon;
          const container = document.querySelector('.emoticon-container');
          if (emoticonIntervalId !== null) {
            clearInterval(emoticonIntervalId);
          }
          emoticonIntervalId = setInterval(() => {
            createEmoticon(emoticon, container);
        }, 60); // type every 60ms
        }
      });
    });
});