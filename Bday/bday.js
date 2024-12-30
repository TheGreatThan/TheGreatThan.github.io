document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const exploreBtn = document.getElementById("exploreBtn");
    const sudokuSection = document.getElementById("sudoku");
    const tiktokSection = document.getElementById("tiktok");
    const solveBtn = document.getElementById("solveBtn");
    const solveMessage = document.getElementById("solveMessage");
    const errorMessage = document.getElementById("errorMessage");
    const specialMessage = document.getElementById("specialMessage");
    const tiktokMessage = document.getElementById("tiktokMessage");
    
    // Explore button event
    exploreBtn.addEventListener("click", function () {
      document.getElementById("home").style.display = "none";
      sudokuSection.classList.remove("hidden");
      sudokuSection.style.opacity = 1;
    });
  
    // Create 8x8 Sudoku grid
    const initialSudoku = [
      [2, 5, 7, 4, 1, 6, 3, 8],
      [3, 1, 6, 8, 4, 7, 5, 2],
      [7, 4, 5, 6, 3, 2, 8, 1],
      [1, 3, 8, 2, 6, 5, 7, 5],
      [6, 8, 4, 7, "", 1, 2, 3],
      [5, 2, 3, 1, 7, 8, 6, 4],
      [8, 7, 1, 3, 2, 5, 4, 6],
      [4, 6, 2, 5, 8, 3, 1, 7]
    ];
  
    const solution = [
      [2, 5, 7, 4, 1, 6, 3, 8],
      [3, 1, 6, 8, 4, 7, 5, 2],
      [7, 4, 5, 6, 3, 2, 8, 1],
      [1, 3, 8, 2, 6, 5, 7, 5],
      [6, 8, 4, 7, 5, 1, 2, 3],
      [5, 2, 3, 1, 7, 8, 6, 4],
      [8, 7, 1, 3, 2, 5, 4, 6],
      [4, 6, 2, 5, 8, 3, 1, 7]
    ];
  
    function createSudokuGrid() {
      const grid = document.getElementById("sudoku-grid");
      grid.innerHTML = ""; // Clear previous content
      initialSudoku.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          const input = document.createElement("input");
          input.type = "number";
          input.min = 1;
          input.max = 8;
          if (value !== "") {
            input.value = value;
            input.disabled = true;
          }
          grid.appendChild(input);
        });
      });
    }
  
    createSudokuGrid();
  
    solveBtn.addEventListener("click", function () {
      const inputs = document.querySelectorAll("#sudoku-grid input");
      let correct = true;
      inputs.forEach((input, index) => {
        const rowIndex = Math.floor(index / 8);
        const colIndex = index % 8;
        if (parseInt(input.value) !== solution[rowIndex][colIndex]) {
          correct = false;
        }
      });
  
      if (correct) {
        solveMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
        setTimeout(() => {
          sudokuSection.style.display = "none";
          tiktokSection.classList.remove("hidden");
        }, 2000); // Show success message for 2 seconds before transitioning
      } else {
        errorMessage.classList.remove("hidden");
        solveMessage.classList.add("hidden");
        correct = true;
      }
    });
  
    // TikTok-inspired section event
    specialMessage.addEventListener("click", function () {
      tiktokMessage.classList.remove("hidden");
    });
  });
  // new









  document.addEventListener("DOMContentLoaded", function () {
    const videoFeed = document.getElementById('videoFeed');
    const videos = document.querySelectorAll('.video');
    const backgroundAudio = document.getElementById('background-audio');

    // Function to handle play/pause using the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (entry.isIntersecting) {
                    video.play();  // Play video when in view
                } else {
                    video.pause(); // Pause video when out of view
                }
            }
        });
    }, {
        threshold: 0.5 // Trigger when at least 50% of the video is visible
    });

    // Attach the observer to each video container
    videos.forEach(videoElement => {
        observer.observe(videoElement);
    });

    // Handle the end of the last video (video3)
    const lastVideo = document.getElementById('video3');
    lastVideo.addEventListener('ended', function () {
        // When the last video ends, fade to black
        document.body.style.backgroundColor = 'black';  // Make the screen black
        videoFeed.style.overflow = 'hidden';  // Hide overflow for the video section
        videoFeed.innerHTML = '';  // Remove the video feed content

        // Show the birthday message after the screen goes black
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerText = 'Chúc mẹ một ngày sinh nhật tuyệt vời 🎉';
        messageDiv.style.color = 'white';
        messageDiv.style.fontSize = '50px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.paddingTop = '40vh'; // Center the message vertically
        videoFeed.appendChild(messageDiv);

        // After 3 seconds, show the article section and resume audio
        setTimeout(() => {
            messageDiv.remove();
            document.body.style.backgroundColor = ''; // Reset the background color

            // Make sure the article section isn't hidden and becomes visible
            window.location.href = "new.html";  // Redirect to new.html

            // Resume the background audio
            backgroundAudio.play();
        }, 3000);  // Wait for 3 seconds before showing the article and resuming audio
    });

    // Set initial audio volume and play on page load
    backgroundAudio.volume = 0.1;
    backgroundAudio.play();

    // Function to pause background audio during the TikTok section and resume afterward
    function handleAudioDuringTikTok() {
        const tiktokSection = document.getElementById('tiktok');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Pause background audio when TikTok section is visible
                    backgroundAudio.pause();
                } else {
                    // Resume background audio when TikTok section is not visible
                    backgroundAudio.play();
                }
            });
        });

        // Observe the TikTok section to know when it's in the viewport
        observer.observe(tiktokSection);
    }

    // Call the function to handle audio transitions
    handleAudioDuringTikTok();
});


  
