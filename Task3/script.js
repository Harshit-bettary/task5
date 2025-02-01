const gameBoard = document.getElementById("gameBoard");
const restartButton = document.getElementById("restart");
let cards = [];
let flippedCards = [];

const emojis = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🥝', '🍍', '🥥', '🍑', '🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🥝', '🍍', '🥥', '🍑', '🍊', '🍋', '🍈', '🍏', '🥭'];

defaultGame();
restartButton.addEventListener("click", defaultGame);

function defaultGame() {
    gameBoard.innerHTML = "";
    flippedCards = [];
    shuffle(emojis);
    cards = emojis.map(emoji => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.addEventListener("click", flipCard);
        gameBoard.appendChild(card);
        return card;
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = this.dataset.emoji;
        flippedCards.push(this);
    }
    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
        flippedCards = [];
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        flippedCards = [];
    }
}