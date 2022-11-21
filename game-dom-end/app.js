
// változó deklarálás:
let scores, roundScore, activePlayer;

function init() {
  // tömb: több értéket is tud tárolni
  // értékadás:
  scores = [0,0];
  roundScore = 0;
  // az elso jatekos kezd:
  activePlayer = 0;
  // a UI-on a kezdeti értékeket beállítjuk.
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;

  document.querySelector('.btn-hold').style.display = 'block';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
  // a játék indításakor a kocka még nem látszik:
  document.querySelector('.dice').style.display = 'none';
}
// meghívjuk az init function-t ami a játék betöltésekor lefut
init();

// ha a .btn-roll gombra kattint a user:
document.querySelector('.btn-roll').addEventListener('click', function(){

  // 1. random generator
  let dice = Math.floor(Math.random() * 6) + 1;
  let dice2 = Math.floor(Math.random() * 6) + 1;

  // 2. display the result:
  let diceDOM = document.querySelector('#dice-1');
  diceDOM.style.display = 'block';
  diceDOM.setAttribute('src', 'dice-'+dice+'.png');

  let diceDOM2 = document.querySelector('#dice-2');
  diceDOM2.style.display = 'block';
  diceDOM2.setAttribute('src', 'dice-'+dice2+'.png');
  

  // ha a dice értéke nem egyenlő 1:
  if (dice !== 1 && dice2!==1) {
    // ha a dice értéke nem 1:
    // a dobott értéket hozzá adjuk a roundScore változóhoz:
    roundScore = roundScore + dice + dice2;
    // az eredményt megjelenítjük:
    document.querySelector('#current-'+activePlayer).textContent = roundScore;

    // ha a játékos 1-est dobott
  } else {
    // a következő játékos jön
    nextPlayer();
  }
  
});

// function declaration
function nextPlayer() {
  // next player...
  if ( activePlayer === 0 ) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  roundScore = 0;
  // roundScore értékeket nullázzuk
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}


// ha a btn-hold gombra kattint a user:
document.querySelector('.btn-hold').addEventListener('click', function(){ 

  // 1. a játékos megszerzi a kör alatt szerzett pontot, ez hozáadódik az ő pontszámaihoz:
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // scores[activePlayer] += roundScore;

  // 2. update the UI:
  document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

  // 3. check if player won the game:
  if ( scores[activePlayer] >= 20 ) {
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');

    document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'none';

  } else {
    // ha nincs nyertes, a k0vetkező játékos jön
    nextPlayer();
  }

});



// ha a new game gombra kattint a user, ugyanaz történik mint amikor az oldal betölt.
document.querySelector('.btn-new').addEventListener('click', init);

