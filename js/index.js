const words = ["economiza", "cria memórias", "gera sustentabilidade"];
const spanWord = document.getElementById("wordToChange");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let currentWord = "";
let waitAfterWord = false;

function typeEffect() {
    const fullWord = words[wordIndex];

    if (!isDeleting && charIndex <= fullWord.length) {
        currentWord = fullWord.substring(0, charIndex++);
        spanWord.textContent = currentWord;
    }

    if (isDeleting && charIndex >= 0) {
        currentWord = fullWord.substring(0, charIndex--);
        spanWord.textContent = currentWord;
    }

    let typingSpeed = 10;

    if (!isDeleting && charIndex > fullWord.length) {
        isDeleting = true;
        typingSpeed = 1000;
    }

    if (isDeleting && charIndex < 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 200;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();
