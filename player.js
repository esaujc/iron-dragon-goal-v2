class Player{
  constructor(canvas) {  
    this.x = 0;
    this.y = 0;
    this.xMin;
    this.yMin;
    this.xMax;
    this.yMin;
    this.vel = 5;
    this.size = 60;
    this.direction = 0;
    this.directionX = 0;
    this.lives = 5;
    this.screen = 1;
    this.color;
    this.dragonBalls = 0;
    this.kamesRecieved = 0;
    this.ctx = canvas.getContext('2d');
  }
  update(){
    this.y += (this.vel * this.direction);
    this.x += (this.vel * this.directionX);
  
    this._checkLimits();
  }
  render(numberPlayer){
    const img = new Image();

    if (numberPlayer === 1){
      img.src = "img/goku57x55.png";
    }
    if (numberPlayer === 2){
      img.src = "img/piccolo57x55.png";
    }
    this.ctx.drawImage(img, 0, 0, 57,55,this.x,this.y,57,55);

  }
  setDirection(direction) {
    // var self = this; 
    this.direction = direction;
  }
  setDirectionX (direction) {
    // var self = this;
  
    this.directionX = direction;
  }
  _checkLimits() {
    // var self = this;
    if (this.y < this.yMin) {
      this.setDirection(1);
    }
    else if (this.y > this.yMax - this.size) {
      this.setDirection(-1);
    }
  
    if (this.x < this.xMin) {
      this.setDirectionX(0);
    }
    else if (this.x > this.xMax - 300) {
      this.setDirectionX(-1);
    }
  }

  checkCollision(object) {
    // var self = this;
  
    const crashRight = this.x + this.size > object.x;
    const crashBottom = this.y + this.size > object.y;
    const crashTop = this.y < object.y + object.size;
    const crashLeft = this.x < object.x + object.size;
  
    if (crashLeft && crashRight && crashTop && crashBottom) {
      return true;
    } 
    return false;
  }
  
}








