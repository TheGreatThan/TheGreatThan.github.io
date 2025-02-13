function checkWindowSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (windowWidth > 1350 || windowHeight > 600) {
    }else{
        window.location.href = "./chidauphone.html";
    }
}

setInterval(checkWindowSize, 500);

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const title = document.querySelector('.movie-title');

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        title.style.display = 'none'; // Hide duplicate in content area
    } else {
        header.classList.remove('scrolled');
        title.style.display = 'block';
    }
});

window.addEventListener('scroll', () => {
    const scrollTitle = document.querySelector('.scroll-title');
    if (window.scrollY > 50) { // Adjust scroll threshold as needed
        scrollTitle.style.opacity = '1';
        scrollTitle.style.fontSize = '50px'; // Original font size when hidden
    } else {
        scrollTitle.style.opacity = '0';
        scrollTitle.style.fontSize = '0'; // Original font size when hidden
    }
});



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
  
    const interactableClasses = ['interactable', 'toggle-btn', 'lang-switch'];
  
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