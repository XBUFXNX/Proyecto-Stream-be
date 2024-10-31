const words = ["apple", "grape", "mango", "peach", "berry"];  // Palabras que puedes usar
const targetWord = words[Math.floor(Math.random() * words.length)];  // Selecciona una palabra aleatoria
let currentGuess = '';
let currentRow = 0;
const maxRows = 6;

const grid = document.getElementById('cuadricula'); // Cambiado de 'grid' a 'cuadricula'
const keyboard = document.getElementById('teclado'); // Cambiado de 'keyboard' a 'teclado'
const message = document.getElementById('mensaje');  // Cambiado de 'message' a 'mensaje'

// Inicializa la cuadrícula
for (let i = 0; i < maxRows * 5; i++) {
    const box = document.createElement('div');
    box.classList.add('caja-letra');  // Cambiado de 'letter-box' a 'caja-letra'
    grid.appendChild(box);
}

// Inicializa el teclado
const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
keys.forEach(key => {
    const keyElement = document.createElement('div');
    keyElement.innerText = key;
    keyElement.classList.add('tecla');  // Cambiado de 'key' a 'tecla'
    keyElement.addEventListener('click', () => handleKeyClick(key));
    keyboard.appendChild(keyElement);
});

function handleKeyClick(key) {
    if (currentGuess.length < 5) {
        currentGuess += key.toLowerCase();
        updateGrid();
    }
}

function updateGrid() {
    const boxes = document.querySelectorAll('.caja-letra');  // Cambiado de '.letter-box' a '.caja-letra'
    for (let i = 0; i < currentGuess.length; i++) {
        boxes[currentRow * 5 + i].innerText = currentGuess[i].toUpperCase();
    }
}

function handleSubmit() {
    if (currentGuess.length < 5) {
        message.innerText = 'La palabra debe tener 5 letras.';
        return;
    }

    const boxes = document.querySelectorAll('.caja-letra');  // Cambiado de '.letter-box' a '.caja-letra'
    const guessArray = currentGuess.split('');

    guessArray.forEach((letter, index) => {
        const box = boxes[currentRow * 5 + index];
        if (targetWord[index] === letter) {
            box.classList.add('correcto');  // Cambiado de 'correct' a 'correcto'
        } else if (targetWord.includes(letter)) {
            box.classList.add('presente');  // Cambiado de 'present' a 'presente'
        } else {
            box.classList.add('ausente');   // Cambiado de 'absent' a 'ausente'
        }
    });

    if (currentGuess === targetWord) {
        message.innerText = '¡Felicidades! Has adivinado la palabra correctamente. ¡Eres un genio!';
    } else if (currentRow === maxRows - 1) {
        message.innerText = `Perdiste. La palabra era: ${targetWord}`;
    } else {
        currentRow++;
        currentGuess = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSubmit();
    } else if (e.key === 'Backspace') {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyClick(e.key.toUpperCase());
    }
});
