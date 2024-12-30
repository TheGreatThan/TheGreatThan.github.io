let nav = document.querySelector("#navArea");
let btn = document.querySelector(".toggle-btn");
let mask = document.querySelector("#mask");

btn.onclick = () => {
  nav.classList.toggle("open");
};

mask.onclick = () => {
  nav.classList.toggle("open");
};

const curser = document.querySelector(".curser");
document.addEventListener('mousemove', function(e){
  let X = e.clientX;
  let Y = e.clientY;

  curser.style.left = X + "px";
  curser.style.top = Y + "px";
})

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
  
    const interactableClasses = ['interactable', 'toggle-btn'];
  
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