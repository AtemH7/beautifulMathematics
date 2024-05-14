let fovy = 60;
let aspect;
let near = 0.01;
let far = 5000;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  aspect = windowWidth / windowHeight;
}

function draw() {
  background(220);
  orbitControl();

  perspective(fovy, aspect, near, far);
  translate(0,0,0);

  // drawCylinder(this,   0,0,0,    0,0,0,    1, 1, 50)

  // drawTorus(this,   0,0,0,   0,0,0,   10,1,30)
  drawSnail(this,   0,0,0,   0,0,0,   10,1,1,30)
  // drawSphere(this,    0,0,0,    0,0,0,    1,60);
}
