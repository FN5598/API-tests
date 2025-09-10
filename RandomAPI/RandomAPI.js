let randomDogButton = document.querySelector('.dog-api');
let randomDogDiv = document.getElementById('random-dog-image-container');

randomDogButton.addEventListener('click', async () => {
   try {
    const response = await fetch("https://dog.ceo/api/breed/borzoi/images/random");
    const data = await response.json();
    randomDogDiv.textContent = data.message;
    const randomDogHTML = `
    <img src="${data.message}" alt="Random Dog" id="random-dog-image">
    `;
    randomDogDiv.innerHTML = randomDogHTML;
   } catch (error) {
    console.log("Error fetching data:", error);
   }});

let randomCatFactButton = document.querySelector('.cat-api');
let randomCatFactParagraph = document.getElementById('random-cat-fact-container');

randomCatFactButton.addEventListener("click", async () => {
    try {
        const response = await fetch('https://catfact.ninja/fact');
        const data = await response.json();
        randomCatFactParagraph.textContent = data.fact;
    } catch (error) {
        console.log("Error fetching data:", error);
    }
});

let randomJokeButton = document.querySelector('.joke-api');
let randomJokeSetup = document.getElementById('random-joke-setup-container');
let randomJokeDelivery = document.getElementById('random-joke-delivery-container');
randomJokeButton.addEventListener("click", async () => {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Dark');
        const data = await response.json();
        randomJokeSetup.textContent = data.setup;
        randomJokeDelivery.textContent = data.delivery;
    } catch (error) {
        console.log("Error fetching data:", error);
    }
})

let randomBreakingBadQuoteButton = document.querySelector('.breaking-bad-quote-api');
let randomBreakingBadQuote = document.getElementById('breaking-bad-quote-container');
let randomBreakingBadQuoteAuthor = document.getElementById('author');

randomBreakingBadQuoteButton.addEventListener("click", async () => {
    try {
        const response = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
        const data = await response.json();
        randomBreakingBadQuote.textContent = data[0].quote;
        randomBreakingBadQuoteAuthor.textContent = data[0].author;
    } catch (error) {
        console.log("Error fetching data:", error);
    }
})



let randomCardButton = document.querySelector(".shuffle-card-api");
let randomCardImgHTML = document.getElementById('random-card-container');
let deckID;

async function createDeck() {
    const response = await fetch ("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
    const data = await response.json();
    deckID = data.deck_id;
}

createDeck();

randomCardButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`);
        const data = await response.json();
        const card = data.cards[0];
        document.querySelector('.random-card-image').src = card.image;
        document.querySelector('.random-card-image').style.marginTop = "20px"

    } catch (error) {
        console.log("Error fetching data:", error);
    }
})

