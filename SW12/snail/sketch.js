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

  drawCylinder(this,   0,0,0,    0,0,0,    1, 1, 5)
}
