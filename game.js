class Game{
  constructor(parent) {
    // var self = this;
  
    this.winner = 0;
    this.totalDragonBallsWinner = 0;
    this.totalDragonBallsLooser = 0;
    this.distanciaActualLooser = 0;
    this.totalKamesRecievedWinner = 0;
    this.totalKamesRecievedLooser = 0;
  
    this.kame = new Audio("./audio/kamehameha.wav");
    this.kame2 = new Audio("./audio/kame-blueG.mp3");
  
  
    this.parentElement = parent;
    this.gameElement = null
    this.onGameOverCallback = null;
  
    this._init();
    this._initGameElements();
    this._startLoop();
  }

  _init(){
    // var self = this;

    this.gameElement = buildDom(`
      <main class="game container">
        <header class="game__header">
        <div class="player1">
            <img src="img/goku-face.png" alt="Goku">
            <div>
              <div class="distance1">
                <span class="label">Distance:</span>
                <span class="value"></span>
              </div>
              <div class="dragonBalls1">
              <span class="label">Total Balls: </span>
                <span class="value"></span>
              </div>     
              <div class="kamesRecieved">
                <span class="label">Kames Recieved: </span>
                <span class="value"></span>
              </div> 
            </div>
          </div>   
          <div class="middle">
            <img src="./img/title-game3.png">
          </div>
          <div class="player2">
          <img src="img/piccolo-face.png" alt="Piccolo">
          <div>
            <div class="distance2">
              <span class="label">Distance:</span>
              <span class="value"></span>
            </div>
            <div class="dragonBalls2">
            <span class="label">Total Balls: </span>
              <span class="value"></span>
            </div>     
            <div class="kamesRecieved2">
            <span class="label">Kames Recieved: </span>
              <span class="value"></span>
            </div> 
          </div>
        </div>



          </div>
        </header>
        <div class="game__canvas"> 
      <!--    <div class="game__wrapper"> -->
              
            <div class="screenOne"></div>
            <div class="screenTwo"></div>
            <canvas class="canvas"></canvas>
      <!--    </div>-->
        </div>
      </main>
    `)
    this.parentElement.appendChild(this.gameElement);

    this.canvasParentElement = document.querySelector('.game__canvas');
    this.canvasElement = document.querySelector('.canvas');

    this.distance1Element = this.gameElement.querySelector('.distance1 .value');
    this.dragonBalls1Element = this.gameElement.querySelector('.dragonBalls1 .value');

    this.distance2Element = this.gameElement.querySelector('.distance2 .value');
    this.dragonBalls2Element = this.gameElement.querySelector('.dragonBalls2 .value');

    this.kamesRecievedElement = this.gameElement.querySelector('.kamesRecieved .value');
    this.kamesRecieved2Element = this.gameElement.querySelector('.kamesRecieved2 .value');

    this.screenOneElement = this.gameElement.querySelector('.screenOne');
    // this.screenOneElement.style.animationDuration = "3s";

    this.width = this.canvasParentElement.clientWidth;
    this.height = this.canvasParentElement.clientHeight;

    this.canvasElement.setAttribute('width', this.width);
    this.canvasElement.setAttribute('height', this.height);

    //New
    this.gameWrapperParentElement = document.querySelector('.game__wrapper');
    this.screenOneParentElement = document.querySelector('.screenOne');
    this.screenTwoParentElement = document.querySelector('.screenTwo');

    this.screenOneParentElement.height = "300px";
    this.screenOneParentElement.width = "600px";

    this.ctx = this.canvasElement.getContext('2d');
    
    
    
  }

  // Inicializa los Screen, players and Items
  _initGameElements() {

      // var self = this;

      

        // Dibujo los Screen
      
      this.screen = new Screen(this.canvasElement,1,this.canvasElement.width,1,(this.canvasElement.height/2));
      this.screen2 = new Screen(this.canvasElement,1,this.canvasElement.width,(this.canvasElement.height/2),this.canvasElement.height);
      

      // this.screen = new Screen(this.canvasElement,1,this.canvasElement.width-5,1,(this.canvasElement.height/2)-5);
      // this.screen2 = new Screen(this.canvasElement,1,this.canvasElement.width-5,(this.canvasElement.height/2)+5,this.canvasElement.height-5);
      
      
      // this.screen2 = new Screen(this.canvasElement,1,this.canvasElement.width - 10, this.canvasElement.height / 2 + 5, 400);
      // function Screen(canvas,xMin,xMax,yMin,yMax){

      this.screen.color = 'rgb(32, 92, 84)';
      this.screen2.color = 'rgb(32, 92, 84)';


      // this.screenOneParentElement.

      // Creo el array de items, el jugador y le asigno Screen y límites del screen
      this.items = [];

      this.player = new Player(this.canvasElement);
      this.player.screen = 1;


      this.player.xMin = this.screen.xMin; 
      this.player.yMin = this.screen.yMin;
      this.player.xMax = this.screen.xMax;
      this.player.yMax = this.screen.yMax;
      this.player.color = 'red';



      this.items2 = [];
      this.items2.xMin = this.screen2.xMin; 
      this.items2.yMin = this.screen2.yMin;
      this.items2.xMax = this.screen2.xMax;
      this.items2.yMax = this.screen2.yMax;


      this.player2 = new Player(this.canvasElement);
      this.player2.screen = 2;

      this.player2.x = this.screen2.xMin; 
      this.player2.y = this.screen2.yMin-1;
      this.player2.xMin = this.screen2.xMin; 
      this.player2.yMin = this.screen2.yMin;
      this.player2.xMax = this.screen2.xMax;
      this.player2.yMax = this.screen2.yMax;
      this.player2.color = 'yellow';
    }

  _startLoop() {
    var self = this;

    self.dragonBalls1 = 0;
    self.dragonBalls2 = 0;
    self.kamesRecieved = 0;
    self.kamesRecieved2 = 0;
    


    
    self.handleKeyDown = function (evt) {
      if (evt.key === "ArrowDown") {
        self.player2.setDirection(1);
      }
      if (evt.key === "ArrowUp") {
        self.player2.setDirection(-1)
      }
      if (evt.key === "ArrowLeft") {
        self.player2.setDirectionX(-1);
      }
      if (evt.key === "ArrowRight") {
        self.player2.setDirectionX(1);
      }

      if (evt.key === "w") {
        self.player.setDirection(-1);
      }
      if (evt.key === "s") {
        self.player.setDirection(1)
      }
      if (evt.key === "a") {
        self.player.setDirectionX(-1);
      }
      if (evt.key === "d") {
        self.player.setDirectionX(1);
    }
    }

    document.addEventListener('keydown', self.handleKeyDown);

    function loop() {
      self._clearAll();
      self._updateAll();
      self._renderAll();
      self._playerNotArrivedP1();
      self._playerNotArrivedP2();

      if ((self.screen.end === false) && (self.screen2.end === false)) {
        requestAnimationFrame(loop);
      } else {
        self.onGameOverCallback();
      }
    }

    requestAnimationFrame(loop);
  }

  _updateAll(){
    var self = this;

    self._lanzarItems(1);
    self._lanzarItems(2);

    // self.items.forEach(function(item) {
    //   item.update();
    // })
    self.items.forEach((item) => {
      item.update();
    })


    self.items = self.items.filter((item) => {
      if (item.isDeath()) {
        self.score += 1;
        return false;
      }
      return true;
    })

    self.items2.forEach((item) => {
      item.update();
    })

    self.items2 = self.items2.filter((item) => {
      if (item.isDeath()) {
        self.score += 1;
        return false;
      }
      return true;
    })


    self.player.update();
    self.player2.update();

    self._checkAllCollision();

    self._updateUI();

  }
  _renderAll(){
    var self = this;


    self.screen.render(1);
    self.screen2.render(2)

    self.items.forEach((item) => {
      item.render();
    })

    self.items2.forEach((item) => {
      item.render();
    })

    ;
    //self.screen3.render();

    self.player.render(1);
    self.player2.render(2);
    
    //NUEVO
    // self.screen.render('blue');
    // self.screen2.render('red');


  }
  _clearAll(){
    var self = this;

    self.ctx.clearRect(0, 0, self.width, self.height);
  }

  _lanzarItems(screen){
    var self = this;

    // Lanzamiento de Items typo 1 - Bolas de Energía
    if (screen === 1 && self.screen.sentDragon === false){
      const randomY = Math.random() * self.screen.yMax * 0.8;
      if (Math.random() > 0.98) {
      
        const newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,1);
        self.items.push(newItem);
        // self.screenOneElement.style.animationDuration = screen.speedPlayer+"s";
        
      }
        // Lanzamiento de Items typo 2 - Dragon Ball
      if (Math.random() > 0.98) {   
        // var randomY = Math.random() * self.screen.yMax * 0.8;
        const newItem = new Item(self.canvasElement, self.width, randomY,10,self.screen.speedPlayer,2);
        self.items.push(newItem);
        // self.screenOneElement.style.animationDuration = screen.speedPlayer+"s";
      }
        // Lanzamiento de Items typo 4 - Kame Supersónico
        if (Math.random() > 0.999) {   
          // var randomY = Math.random() * self.screen.yMax * 0.8;
          const newItem = new Item(self.canvasElement, self.width, randomY,10,6,4);
          self.items.push(newItem);
          // self.screenOneElement.style.animationDuration = screen.speedPlayer+"s";
        }
    }



    // Lanzamiento de Items typo 1 - Bolas de Energía
    if (screen === 2 && self.screen2.sentDragon === false){
      const minY = self.canvasElement.height / 2 + 5;
        const maxY = self.canvasElement.height - 55;
        const randomY = Math.floor(Math.random() * (maxY - minY)) + minY; 
      if (Math.random() > 0.98) {
        const newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,self.screen2.speedPlayer,1);
        self.items2.push(newItem);
        
      }
        // Lanzamiento de Items typo 2 - Dragon Ball
      if (Math.random() > 0.98) {   
    //   const randomY = Math.floor(Math.random() * ((self.canvasElement.height +50 - (self.canvasElement.height/2)+5))+ (self.canvasElement.height/2)) * 0.8;
        const newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,self.screen2.speedPlayer,2);
        self.items2.push(newItem);

      }
      // Lanzamiento de Items typo 4 - Kame Supersónico - Va a velocidad Fija para poder pillarlo
      if (Math.random() > 0.999) {   
    //   const randomY = Math.floor(Math.random() * ((self.canvasElement.height +50 - (self.canvasElement.height/2)+5))+ (self.canvasElement.height/2)) * 0.8;
        const newItem = new Item(self.canvasElement, self.screen2.xMax, randomY,10,6,4);
        self.items2.push(newItem);
      }   
    }
  }


  _checkAllCollision(){
    var self = this;
    
    // Check del Screen 1
    self.items.forEach((item, idx) => {
      if(self.player.checkCollision(item)) {
        self.items.splice(idx, 1);
          // Si el Item es de tipo X, aumenta o disminuye velocidad
          if (item.type === 1)  {
            self._speedDown(1);
            self.player.kamesRecieved++;
          }else if (item.type === 2){
            self._speedUp(1,1);
            self.player.dragonBalls++;
          } else if (item.type === 3){
            self.screen.end = true;  // con esto hay contacto con el objeto
            //if (self.winner === 0)
              self.winner = 1; // Se utiliza para saber quien ha llegado primero 
              self.totalDragonBallsWinner = self.player.dragonBalls;
              self.totalDragonBallsLooser = self.player2.dragonBalls;
              self.distanciaActualLooser = self.screen2.distanciaActual;
              self.totalKamesRecievedWinner = self.player.kamesRecieved;
              self.totalKamesRecievedLooser = self.player2.kamesRecieved;
          }else if (item.type === 4){
            self.kame.play();
            self._speedUp(1,8); //Escenario y cuanto aumenta
          }
      }
    });

    // Check del Screen 2
    self.items2.forEach((item, idx) => {
      if(self.player2.checkCollision(item)) {
        self.items2.splice(idx, 1);
          // Si el Item es de tipo X, aumenta o disminuye velocidad
          if (item.type === 1)  {
            self._speedDown(2);
            self.player2.kamesRecieved++;
          }else if (item.type === 2){
            self._speedUp(2,1); //Escenario y cuanto aumenta
            self.player2.dragonBalls++;
          } else if (item.type === 3){
            self.screen2.end = true;
            self.winner = 2;
            self.totalDragonBallsWinner = self.player2.dragonBalls;
            self.totalDragonBallsLooser = self.player.dragonBalls;
            self.distanciaActualLooser = self.screen.distanciaActual;
            self.totalKamesRecievedWinner = self.player2.kamesRecieved;
            self.totalKamesRecievedLooser = self.player.kamesRecieved;
          }else if (item.type === 4){
            self.kame2.play();
            self._speedUp(2,8); //Escenario y cuanto aumenta
          }
      }
    });

  }
  _speedUp(escenario,speedIncreased){
    var self = this;

    if (escenario === 1){
      if (self.screen.speedPlayer < self.screen.speedMaxPlayer){
        self.items.forEach((element,idx) => {
          self.items[idx].vel += speedIncreased;
        });
        self.screen.speedPlayer += speedIncreased;
      }
    }
    if (escenario === 2){
        if (self.screen2.speedPlayer < self.screen2.speedMaxPlayer){
          self.items2.forEach((element,idx) => {
            self.items2[idx].vel += speedIncreased;
          });
          self.screen2.speedPlayer += speedIncreased;
        }
    
    }
  }

  _speedDown(escenario){
    var self = this;
    
    if (escenario === 1){
      // Controls the speed is not 0
      if (self.screen.speedPlayer > self.screen.speedMinPlayer){
        self.items.forEach((element,idx) => {
          self.items[idx].vel -= 1;
        });
        self.screen.speedPlayer -= 1;
      
      }
    }
    if (escenario === 2){
      if (self.screen2.speedPlayer > self.screen2.speedMinPlayer){
        self.items2.forEach((element,idx) => {
          self.items2[idx].vel -= 1;
        });
        self.screen2.speedPlayer -= 1;   
      }
    }
  }


  _playerNotArrivedP1() {
    var self = this;
    
    if (self.screen.distanciaActual < 1000 && self.screen.sentDragon === false){
      const newItem = new Item(self.canvasElement, self.width, 10,self.canvasElement.height/3,self.screen.speedPlayer,3);
      self.items.push(newItem);
      self.screen.sentDragon = true;
    }

    if (self.screen.distanciaActual <= 0){
      return false;
    }


    return true;
  }

  _playerNotArrivedP2(){
    var self = this;
    
    const minY = self.canvasElement.height / 2 + 5;
    const maxY = self.canvasElement.height - 55;

    if (self.screen2.distanciaActual < 1000 && self.screen2.sentDragon === false){
    // const newItem = new Item(self.canvasElement, 300, 500,self.screen2.speedPlayer,3);
      const newItem = new Item(self.canvasElement, self.width, self.canvasElement.height- 250, self.canvasElement.height/3,self.screen2.speedPlayer, 3);
      self.items2.push(newItem);
      self.screen2.sentDragon = true;
    }

    if (self.screen2.distanciaActual <= 0){
      return false;
    }
    return true;
  }
  _updateUI() {
    var self = this;

    self.dragonBalls1Element.innerText = self.player.dragonBalls;
    self.dragonBalls2Element.innerText = self.player2.dragonBalls;

    self.distance1Element.innerText = self.screen.distanciaActual;
    // self.livesElement.innerText = self.player.lives;
    self.distance2Element.innerText = self.screen2.distanciaActual;

    self.kamesRecieved2Element.innerText = self.player2.kamesRecieved;
    self.kamesRecievedElement.innerText = self.player.kamesRecieved;
  }
  destroy() {
    var self = this;
  
    self.gameElement.remove();
    document.removeEventListener('keydown', self.handleKeyDown);
    //Remove setInterval if you have one
  }

  onOver(callback) {
    var self = this;

    self.onGameOverCallback = callback;
  }

}