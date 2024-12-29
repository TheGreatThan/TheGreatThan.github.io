const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      display.innerText = eval(display.innerText);
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      display.innerText += item.id;
    }
  };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};



document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.createElement('div');
  cursor.id = 'cursor';
  document.body.appendChild(cursor);

  let timeoutId;

  const resetCursorTimeout = () => {
    cursor.style.opacity = '1'; // Show the cursor
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cursor.style.opacity = '0'; // Hide the cursor
    }, 3000); // 3 seconds
  };

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
    resetCursorTimeout();
  });

  const interactableClasses = ['btn-number', 'btn-operator', 'theme-toggler', 'btn-equal', 'game', 'interactable', 'toggle-btn'];

  interactableClasses.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);

      elements.forEach(element => {
          element.addEventListener('mouseenter', () => {
              cursor.classList.add('interacting');
          });

          element.addEventListener('mouseleave', () => {
              cursor.classList.remove('interacting');
          });
      });
  });
});

const nav = document.querySelector("#navArea");
const btn = document.querySelector(".toggle-btn");
const mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("open");
};

mask.onclick = () => {
    nav.classList.toggle("open");
};