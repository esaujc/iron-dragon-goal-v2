class Item{
  constructor(canvas, x, y, size, vel,type) {  
    this.x = x - 20;
    this.y = y;
    this.color = 'yellow';
    this.size = size;
    this.vel = vel;
    // this.currentVel = vel; // Se utilizará para reducir la meta
    this.ctx = canvas.getContext('2d');
    this.type = type; // 1 - Kame que resta vel, 2 - Dragon Ball, 3 - Final
  }
  update(){
    this.x -= this.vel;
  }
  render(){
    const img = new Image();
    if (this.type === 1){
      img.src = "img/ball01.png";
      this.ctx.drawImage(img, this.x, this.y, 45,30);
    }
    if (this.type === 2){
      img.src = "img/Dragon_Ball_1-35x34.png";
      this.ctx.drawImage(img, this.x, this.y, 45,30);
    }
    if (this.type === 3){
      img.src = "img/dragol-goal.png";
      this.ctx.drawImage(img, this.x, this.y, 200,260);
    }
    if (this.type === 4){
      img.src = "img/kame-azul.png";
      this.ctx.drawImage(img, this.x, this.y, 55,40);
    }
   }
  isDeath(){
    return (this.x + this.size) < 0;
  }
  collided(){
    this.vel += 5;
  }
}