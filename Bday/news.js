document.addEventListener("DOMContentLoaded", function () {
    const surpriseButton = document.getElementById("surpriseButton");
    const surpriseSection = document.getElementById("surpriseSection");
    const confettiCanvas = document.getElementById("confettiCanvas");
    const moreConfettiButton = document.getElementById("moreConfetti");

    let confettiActive = false;

    // Event listener to show the surprise section and activate confetti
    surpriseButton.addEventListener("click", function () {
        surpriseSection.classList.remove("hidden");
        activateConfetti();
    });

    // Event listener to add more confetti
    moreConfettiButton.addEventListener("click", function () {
        activateConfetti();
    });

    // Confetti code
    const confettiContext = confettiCanvas.getContext("2d");
    const confettiPieces = [];
    const colors = ["#ff6f61", "#42a5f5", "#66bb6a", "#ffeb3b"];

    function createConfettiPiece() {
        return {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight - window.innerHeight,
            size: Math.random() * 7 + 3,
            speed: Math.random() * 5 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            angle: Math.random() * 360
        };
    }

    function drawConfetti() {
        confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiPieces.forEach((piece, i) => {
            confettiContext.fillStyle = piece.color;
            confettiContext.beginPath();
            confettiContext.arc(piece.x, piece.y, piece.size, 0, Math.PI * 2);
            confettiContext.fill();

            piece.y += piece.speed;
            if (piece.y > window.innerHeight) {
                confettiPieces[i] = createConfettiPiece();
            }
        });
        requestAnimationFrame(drawConfetti);
    }

    function activateConfetti() {
        if (!confettiActive) {
            for (let i = 0; i < 100; i++) {
                confettiPieces.push(createConfettiPiece());
            }
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
            confettiActive = true;
            drawConfetti();
        }
    }

    // Adjust confetti canvas size on window resize
    window.addEventListener("resize", () => {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });

});
