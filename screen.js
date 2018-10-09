class Screen{
  constructor(canvas,xMin,xMax,yMin,yMax){
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.ctx = canvas.getContext('2d');
    this.color;
    this.distanciaInicial = 5000;
    this.distanciaActual = 5000;
    this.sentDragon = false;
    this.speedPlayer = 4;
    this.speedMinPlayer = 4;
    this.speedMaxPlayer = 20;
    this.end = false;
  }
  render(escenario){
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(this.xMin, this.yMin, this.xMax, this.yMax);
    this.distanciaActual -= this.speedPlayer;

  }

}



