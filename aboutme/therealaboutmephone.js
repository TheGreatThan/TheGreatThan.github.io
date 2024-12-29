const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {  
  let iteration = 0;
  
  clearInterval(interval);
  
  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return event.target.dataset.value[index];
        }
      
        return letters[Math.floor(Math.random() * 26)]
      })
      .join("");
    
    if(iteration >= event.target.dataset.value.length){ 
      clearInterval(interval);
    }
    
    iteration += 1 / 2;
  }, 30);
}

const text = document.querySelector('.text');

window.addEventListener('scroll', () => {
  const textTop = text.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (textTop < windowHeight / 3) {
    text.classList.add('visible');
  } else {
    text.classList.remove('visible');
  }
});

const txt = document.querySelector('.txt');

window.addEventListener('scroll', () => {
  const textTop = text.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (textTop < windowHeight / 2) {
    txt.classList.add('visible');
  } else {
    txt.classList.remove('visible');
  }
});

const con = document.querySelector('.con');

window.addEventListener('scroll', () => {
  const textTop = text.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (textTop < windowHeight / 2) {
    con.classList.add('visible');
  } else {
    con.classList.remove('visible');
  }
});


function checkWindowSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (windowWidth < 1350 || windowHeight < 600) {
    }else{
        window.location.href = "./me.html";
    }
}

setInterval(checkWindowSize, 500);




  
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

  const interactableClasses = ['interactable', 'toggle', 'btn', 'bx', 'container1'];

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

  resetCursorTimeout(); // Initialize the timeout when the page loads
});

