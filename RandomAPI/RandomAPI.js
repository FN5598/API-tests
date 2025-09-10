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
