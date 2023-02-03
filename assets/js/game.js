/* 
    Cards
    2C = two of clubs (trébol)
    3D = three of diamonds (diamente)
    5H = five of hearts (corazones)
    7S = seven of swords (pica)
*/

const module = (() => {
    'use strict'

        //variables
    let deck = [];

    let playersPoints = [];

    const typeOfCards = ['C', 'D', 'H', 'S'];
    const specials = ['A','J','Q','K'];

    //selectors
    const btnRequest = document.querySelector('#btn-request');
    const btnNew = document.querySelector('#btn-new');
    const btnStop = document.querySelector('#btn-stop');
    const scores = document.querySelectorAll('small');
    const divCards = document.querySelectorAll('.div-cards');

    const startGame = ( numPlayers = 2 ) => {
        deck = createDeck();

        playersPoints = [];

        for( let i = 0; i < numPlayers; i++){
            playersPoints.push(0);
        }

        scores.forEach(element => {
            element.innerText = 0;
        });

        divCards.forEach(element => {
            element.innerHTML = '';
        })

        btnStop.disabled = false;
        btnRequest.disabled = false;
    }


    //creates a new deck
    const createDeck = () => {

        deck = [];

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

        return  _.shuffle(deck);
    };


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

    //insert the points for every player
    const sumPoints = (playerTurn, card) => {
        playersPoints[playerTurn] += getCardValue(card);
        scores[playerTurn].innerText = playersPoints[playerTurn];
    };


    //create and asign cards in the document
    const createCards = (card, element) => {
        const cardTag = document.createElement('img');
        cardTag.setAttribute('src', `assets/cards/${card}.png`);
        cardTag.setAttribute('class', 'card');

        element.append(cardTag);
    }

    const getWinner = (playerPoints) => {
        setTimeout( () => {
            if(playersPoints[playersPoints.length-1] > 21){
                alert('player won');
            }else if( playersPoints[playersPoints.length-1] === playerPoints){
                alert('its a draw');
            }else{
                alert('computer won');
            }
        }, 500);
    }

    //computer logic
    const computersTurn = ( playerPoints ) => {
        do {
            const card = requestCard();
            sumPoints(playersPoints.length - 1, card);
            createCards(card, divCards[divCards.length - 1]);
        } while (playersPoints[playersPoints.length-1] < playerPoints);

        getWinner(playerPoints);

    };

    //events
    btnRequest.addEventListener('click', (e) => {
        const card = requestCard();

        sumPoints(0, card);

        createCards(card, divCards[0]);

        if(playersPoints[0] > 21){
            console.warn('Sorry, you have more than 21.');
            computersTurn(0);
            btnRequest.disabled = true;
            btnStop.disabled = true;
        } else if( playersPoints[0] === 21 ){
            alert('Great, 21!!');
            btnRequest.disabled = true;
            computersTurn(21);
        }

    })

    btnStop.addEventListener('click', () => {
        btnRequest.disabled = true;
        btnStop.disabled = true;
        computersTurn(playersPoints[0]);
    })

    btnNew.addEventListener('click', () => {       
        startGame();
    })

    return {
        newGame: startGame
    };

})();


