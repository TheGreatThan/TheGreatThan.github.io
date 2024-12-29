let interval = null;

function checkWindowSize() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    if (windowWidth <= 1350 || windowHeight <= 600) {
        window.location.href = "./projectphone.html";
    }
}

setInterval(checkWindowSize, 500);

document.addEventListener('DOMContentLoaded', () => {
    const introText = document.getElementById('intro-text');
    const intro = document.getElementById('intro');
    const content = document.getElementById('content');
    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    document.body.appendChild(cursor);

    introText.addEventListener('click', () => {
        intro.style.opacity = '0';
        intro.style.visibility = 'hidden';
        setTimeout(() => {
            intro.style.display = 'none';
            content.classList.add('visible');
            document.body.style.overflow = 'auto'; // Enable scrolling
        }, 1250); // Duration matches CSS transition
    });
    
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

    const interactableClasses = ['interactable', 'toggle-btn', 'btn', 'gallery-item', 'mail', 'email-link'];
    
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

    const nav = document.querySelector("#navArea");
    const btn = document.querySelector(".toggle-btn");
    const mask = document.querySelector("#mask");

    btn.onclick = () => {
        nav.classList.toggle("open");
    };

    mask.onclick = () => {
        nav.classList.toggle("open");
    };

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.getElementById('lightbox-close');

    // Descriptions for each gallery item (match order of gallery items)
    const descriptions = [
        'Anya Forger: This is the first time I get touch on the Sketch pen so it is really shaky. || Spy X Family',
        'Anya Forger: A better version of the previous Anya Forger. || Spy X Family',
        'Loid Forger: Father of Anya Forger || Spy X Family.',
        'Damian Desmond: One of the recurring characters of the SPY x FAMILY series. || Spy X Family.',
        'Bennett: A Genshin Impact character. || Genshin Impact',
        'Lu Guang: The deuteragonist of the Link Click donghua series. || Link Click',
        'Cheng Xiaoshi: The main protagonist of the Link Click donghua series. || Link Click',
        'Cattiva: My first Slav- I mean friend in Pal World, I forgot his thing on the forehead... || Pal World',
        'David Martinez: The main protagonist of Cyberpunk: Edgerunners. || Cyberpunk: Edgerunners',
        'Lucyna Kushinada: A netrunner and the deuteragonist of Cyberpunk: Edgerunners. || Cyberpunk: Edgerunners',
        'Agatsuma Zenitsu: one of the main characters of Demon Slayer: Kimetsu no Yaiba and along with Inosuke Hashibira, a travelling companion of Tanjiro Kamado and Nezuko Kamado. He is also a Demon Slayer in the Demon Slayer Corps. || Demon Slayer',
        'Ling Yang: I Drew him because he looks like a cat. || Wurthering Waves',
        'Miyamizu Mitsuha: The very first character I drew on my first ever sketchbook || Kimi no Na wa (Your Name)',
        'Tachibana Taki: This dude saved the whole town because of a girl || Kimi no Na wa (Your Name)',
        'Mr Egg: Just Egg I Guess... || (none)',
        'Pedro the racoon: I mean it stucked in my head for 3 weeks. || (none)',
        'Scarameow: This dude is sold out in the color fiesta. I didn’t have it, so I drew it. || Genshin Impact',
        'Todoroki Shouto: He is a student in Class 1-A at U.A. High School, where he got in through official recommendations[3] and is training to become a Pro Hero. He is the youngest son of Endeavor, the former No. 2, and current No. 1, Pro Hero. || My Hero Academia',
        'T: This is just my avatar in "Sky Children Of The Light". || Sky Children Of The Light',
        'Sleepy Duck: I saw a cute-looking duck sleeping in the field, so that’s how it ended up here. || (none)',
        'Ryomen Sukuna: the strongest jujutsu sorcerer from over a thousand years ago. Regarded as the undisputed King of Curses || Jujutsu Kaisen',
        'Thousand Hands: Oohhh creepy. || The Evil Within 2',
        'Jing Yuan: Banner Guarantee. || Honkai: Star Rail'
    ];

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = item.style.backgroundImage.slice(5, -2); // Extract URL from background-image
            lightboxImg.src = imgSrc;
            lightboxDesc.textContent = descriptions[index] || 'No description available.';
            lightbox.classList.add('visible');
        });
    });

    // Close the lightbox
    lightboxClose.addEventListener('click', function() {
        lightbox.classList.remove('visible');
    });

    // Click outside to close
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.classList.remove('visible');
        }
    });
});
