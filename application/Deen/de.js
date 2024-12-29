const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,?!'_-&@#$%*()/:<>|+= ";

const nav = document.querySelector("#navArea");
const btn = document.querySelector(".toggle-btn");
const mask = document.querySelector("#mask");

btn.onclick = () => {
    nav.classList.toggle("open");
};

mask.onclick = () => {
    nav.classList.toggle("open");
};
// Encryption function
function encryptText(text, key) {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const textChar = text[i];
        const keyChar = key[i % key.length];

        const textIndex = alphabet.indexOf(textChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (textIndex === -1) {
            encryptText += textChar;
        } else {
            const newIndex = (textIndex + keyIndex) % alphabet.length;
            encryptedText += alphabet[newIndex];
        }
    }

    return encryptedText;
}

// Decrypt function
function decryptText(encryptedText, key) {
    let decryptedText = "";

    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText[i];
        const keyChar = key[i % key.length];

        const encryptedIndex = alphabet.indexOf(encryptedChar);
        const keyIndex = alphabet.indexOf(keyChar);

        if (encryptedText === -1) {
            decryptedText += encryptedChar;
        } else {
            let newIndex = encryptedIndex - keyIndex;
            if (newIndex < 0) newIndex += alphabet.length;
            decryptedText += alphabet[newIndex];
        }
    }

    return decryptedText;
}

// Update result based on selected operation (enc or dec)
function updateResult(isEncrypting) {
    const text = document.getElementById("message").value;
    const key = document.getElementById("key").value;

    let result = "";

    if (isEncrypting) {
        result = encryptText(text, key);
    } else {
        result = decryptText(text, key);
    }

    document.getElementById("result").textContent = result;
}

// Add event listeners to buttons
document.getElementById("enc-btn").addEventListener('click', function () {
    updateResult(true);
});

document.getElementById("dec-btn").addEventListener('click', function () {
    updateResult(false);
});

// Initialize the result with encrypted text when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateResult(true);
});

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
  
    const interactableClasses = ['interactable', 'toggle-btn', 'hidden'];
  
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