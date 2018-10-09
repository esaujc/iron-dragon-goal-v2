
const buildDom = (html) => {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

const main = () => {

  const mainContainerElement = document.querySelector('#main-container');

  // -- Splash
  let splashElement = null;
  let splashButton = null;
  const audio = new Audio("audio/game.mp3");  
  const audio2 = new Audio("audio/end.mp3");




  const handleSplashClick = () => {
  
  //  var audio = new Audio("audio/goku.wav");
  //  audio.play();
   
    // audio.muted = true;
    audio.msPlayToDisabled = true;
    
    window.setTimeout(function() {
      destroySplash();  
      buildGame();
    }, 1000);
    
    
  }

  const buildSplash = () => {
    splashElement = buildDom(`
      <main class="background">
        <div class="splash container">
          <button class="margin-btw-startbuttons">Start</button>
          
          <button id="modal-instructions">How to Play</button>
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <div class="controls-container">
              <p>HOW TO PLAY</p>
                <div class="controls-goku">
                  <div class="goku-picture"><img src="./img/goku57x55.png"></div>
                  <div class="goku-controls"><img src="./img/player1.png"></div>
                </div>
                <div class="controls-piccolo">
                  <div class="piccolo-picture"><img src="./img/piccolo57x55.png"></div>
                  <div class="piccolo-controls"><img src="./img/player2.png"></div>                  
                </div>
                <div class="controls-items">
                  <div class="dragon-ball-item"><img src="./img/Dragon_Ball_1-35x34.png"></div>
                  <div class="dragon-ball-text">Pick a Dragon Ball to Increase your Speed and find faster the Magic Dragon.</div>
                </div>
                <div class="controls-items">
                  <div class="kame-item"><img src="./img/ball01.png"></div>
                  <div class="kame-text">When a Energy ball hits you, your Speed will Decrease. Avoid to hit them.</div>
                </div>
                <div class="controls-items">
                  <div class="kame-item"><img src="./img/kame-azul.png"></div>
                  <div class="kame-text"> Kame hame ha!!! Pick it!</div>
                </div>
                <div class="controls-items">
                  <div class="kame-item"><img src="./img/dragol-goal-instructions.png"></div>
                  <div class="kame-text"> Go fast and find the Magic Dragon and make your dreams come true!!</div>
                </div>
              </div>
            </div>

          </div>


          <audio src="audio/intro.mp3" autoplay></audio>

        </div>
      </main>
    `)

    // <audio src="audio/chalaheadchala.mp3" autoplay></audio>
    mainContainerElement.appendChild(splashElement);
    
    splashButton = document.querySelector('button');
    splashButton.addEventListener('click', handleSplashClick);
    
    // Get the modal
    const modal = document.getElementById('myModal');

    // Get the button that opens the modal
    const btn = document.getElementById("modal-instructions");

    // Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    btn.onclick = () => {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = () => {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
}


  }
  const destroySplash = () => {
    splashButton.removeEventListener('click', handleSplashClick);
    splashElement.remove();
  }

  // -- Game
  let game = null;
  const handleGameOver = () => {
   
    window.setTimeout(function() { /// REVISAR
      destroyGame();
      buildGameover(game.winner, game.totalDragonBallsWinner,game.totalDragonBallsLooser,game.distanciaActualLooser,game.totalKamesRecievedWinner,game.totalKamesRecievedLooser);
      audio.pause();
      audio.currentTime = 0;
      audio2.play();
    }, 300)

  };

  const buildGame = () => {
    game = new Game(mainContainerElement);
    audio.play();
    game.onOver(handleGameOver);

  }
  const destroyGame= () => {
    game.destroy();
  }

  // -- Gameover
  let gameoverElement = null;
  let gameoverButton = null;

  const handleGameoverClick = () => {
    audio2.pause();
    audio2.currentTime = 0;
    destroyGameover();
    buildSplash();
    
  }

  const buildGameover = (winnerPlayer, totalDragonBallsWinner,totalDragonBallsLooser,distanceLooser,kamesRecieved,kamesRecieved2) => {
    gameoverElement = buildDom(`
      <main class="background-gameoverP1">
       <div class="gameover">
        <h1>Winner <span class="winner"></span></h1>
        <p>Dragon Balls Collected: <span class="dragonBallsWinner"></span></p>
        <p>Kames Recieved: <span class="kamesRecievedWinner"></span></p>
        <h1>Looser<span class="looser"></span></h1>
        <p>Dragon Balls Collected: <span class="dragonBallsLooser"></span></p>
        <p>Kames Recieved: <span class="kamesRecievedLooser"></span></p>
        <p>Distance Remaining: <span class="distanceLooser"></span></p>

        <button>Restart</button>
      </div>
      </main>
    `);
    mainContainerElement.appendChild(gameoverElement);

    //Que fuerte!!!!! Cambio de clase en CSS mediante JS
    let player1WinnerElement = document.querySelector('main');
    if (winnerPlayer === 2){
      // player1WinnerElement.classList.remove("background-gameoverP1");
      // player1WinnerElement.classList.add("background-gameoverP2");
      player1WinnerElement.classList.replace("background-gameoverP1", "background-gameoverP2");
    }

    // Mirar esto: div.classList.replace("foo", "bar");

    

    gameoverButton = document.querySelector('button');
    gameoverButton.addEventListener('click', handleGameoverClick);

    // var winnerElement = document.querySelector('.winner');
    // winnerElement.innerText = winnerPlayer;
    let dragonBallElement = document.querySelector('.dragonBallsWinner');
    dragonBallElement.innerText = totalDragonBallsWinner;
    let looserElement = document.querySelector('.looser');
    // looserElement.innerText = winnerPlayer; ////OJO
    let dragonBallLooserElement = document.querySelector('.dragonBallsLooser');
    dragonBallLooserElement.innerText = totalDragonBallsLooser;
    let distanceLooserElement = document.querySelector('.distanceLooser');
    distanceLooserElement.innerText = distanceLooser;

    let kamesWinnerElement = document.querySelector('.kamesRecievedWinner');
    kamesWinnerElement.innerText = kamesRecieved;
    let kamesLooserElement = document.querySelector('.kamesRecievedLooser');
    kamesLooserElement.innerText = kamesRecieved2;

    
  }

  const destroyGameover = () => {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    gameoverElement.remove();
  }

  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);