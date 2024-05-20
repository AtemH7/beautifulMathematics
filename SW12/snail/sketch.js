function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  addScreenPositionFunction();
  pixelDensity(displayDensity());
  // noLoop();
  aspect = windowWidth / windowHeight;

  createShapeInterface();
  createButtons(13);
}

function draw() {
    background(220);

    perspective(fovy, aspect, near, far);

    orbitControl(1,1,1);

    translate(0,0,0);

  if (drawCircleFlag) {
      stroke(0, 100, 255);
      drawCircle(this,   0,0,0,    0,0,0,    1,50);
  }

  if (drawCylinderFlag) {
    stroke(0, 100, 255);
    drawCylinder(this,   0,0,0,    0,0,0,    1, 1, 50);
  }

  if (drawConeFlag) {
    stroke(0, 100, 255);
    drawCone(this,     0,0,0,    0,0,0,    1,1,50);
  }

  if (drawSphereFlag) {
    stroke(0, 100, 255);
    drawSphere(this,    0,0,0,    0,0,0,    1,20);
  }

  if (drawFrustumFlag) {
    stroke(0, 100, 255);
    drawFrustum(this,    0,0,0,    0,0,0,    1,2,2,50);
  }

  if (drawTorusFlag) {
    stroke(0, 100, 255);
    drawTorus(this,   0,0,0,   0,0,0,   10,1,50);
  }

  if (drawSnailFlag) {
    stroke(0, 100, 255);
    drawSnail(this,   0,0,0,   0,0,180,   1,20,0.1,2,   5,3,50);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw();
}