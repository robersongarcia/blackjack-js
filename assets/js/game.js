/* 
    Cards
    2C = two of clubs (trébol)
    3D = three of diamonds (diamente)
    5H = five of hearts (corazones)
    7S = seven of swords (pica)
*/

//variables
let deck = [];

let playerDeck = [];
let playerPoints = 0;

let computerDeck = [];
let computerPoints = 0;

const typeOfCards = ['C', 'D', 'H', 'S'];
const specials = ['A','J','Q','K'];

//selectors
const btnRequest = document.querySelector('#btn-request');
const btnNew = document.querySelector('#btn-new');
const btnStop = document.querySelector('#btn-stop');
const scores = document.querySelectorAll('small');
const playerCards = document.querySelector('#player-cards');
const computerCards = document.querySelector('#computer-cards');

//creates a new deck
const createDeck = () => {

    for( let i = 2; i <= 10; i++){
        for (const type of typeOfCards) {
            deck.push(i+type);
        }
    }

    for (const card of specials) {
        for(const type of typeOfCards){
            deck.push(card+type);
        }
    }

    deck = _.shuffle(deck);

    return deck;
};

createDeck();

//gets a card
const requestCard = () => {
    
    if(deck.length === 0)
        throw 'No cards left.'
    
    const card = deck.pop();
    return card;

};

//get the value of a card
const getCardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    if(isNaN(value)){
        return ( value === 'A')? 11 : 10;
    }else{
        return parseInt(value);
    }

};

const computersTurn = ( playerPoints ) => {

    do {

        const card = requestCard();
        computerPoints += getCardValue(card);
    
        scores[1].innerText = computerPoints;
    
        const cardTag = document.createElement('img');
        cardTag.setAttribute('src', `assets/cards/${card}.png`);
        cardTag.setAttribute('class', 'card');
    
        computerCards.append(cardTag);

    } while (computerPoints < playerPoints);

    setTimeout( () => {
        if(computerPoints > 21){
            alert('player won');
        }else if( computerPoints === playerPoints){
            alert('its a draw');
        }else{
            alert('computer won');
        }
    }, 1000);


};

console.log(deck);

//events
btnRequest.addEventListener('click', (e) => {
    const card = requestCard();
    playerPoints += getCardValue(card);

    scores[0].innerText = playerPoints;

    const cardTag = document.createElement('img');
    cardTag.setAttribute('src', `assets/cards/${card}.png`);
    cardTag.setAttribute('class', 'card');

    playerCards.append(cardTag);

    if(playerPoints > 21){
        console.warn('Sorry, you have more than 21.');
        computersTurn(0);
        btnRequest.disabled = true;
    } else if( playerPoints === 21 ){
        alert('Great, 21!!');
        btnRequest.disabled = true;
        computersTurn(21);
    }

})

btnStop.addEventListener('click', () => {
    btnRequest.disabled = true;
    btnStop.disabled = true;
    computersTurn(playerPoints);
})

btnNew.addEventListener('click', () => {
    deck = [];
    createDeck();
    playerPoints = 0;
    computerPoints = 0;
    scores[0].innerText = '0';
    scores[1].innerText = '0';
    playerCards.innerHTML = '';
    computerCards.innerHTML = '';
    btnStop.disabled = false;
    btnRequest.disabled = false;
})
