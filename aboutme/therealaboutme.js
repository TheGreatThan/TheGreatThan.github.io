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




  
