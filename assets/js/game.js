/* 
    Cards
    2C = two of clubs (trébol)
    3D = three of diamonds (diamente)
    5H = five of hearts (corazones)
    7S = seven of swords (pica)
*/

let deck = [];
let playerDeck = [];
let computerDeck = [];

const typeOfCards = ['C', 'D', 'H', 'S'];
const specials = ['A','J','Q','K'];

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
}

createDeck();

//gets a card
const requestCard = () => {
    
    if(deck.length === 0)
        throw 'No cards left.'
    
    const card = deck.pop();
    return card;

}

//get the value of a card
const getCardValue = (card) => {
    const value = card.substring(0, card.length - 1);

    if(isNaN(value)){
        return ( value === 'A')? 11 : 10;
    }else{
        return parseInt(value);
    }

}

console.log(getCardValue(requestCard()));
