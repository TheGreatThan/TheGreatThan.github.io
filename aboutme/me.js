const toggleIcon = document.querySelector('.toggle-icon');

toggleIcon.addEventListener('click', () => {
    toggleIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
})

function checkWindowSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (windowWidth < 1350 || windowHeight < 600) {
        window.location.href = "./therealaboutmephone.html";
    }
}

setInterval(checkWindowSize, 500);
/* */
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

    const interactableClasses = ['interactable', 'toggle', 'bth'];

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