function setup() {
  let canvas =  createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block');
  textAlign(LEFT, TOP);
  noLoop();
  pixelDensity(displayDensity());

  determineLayout(windowWidth, windowHeight);
  createInterface();
  cellStates = new Array(cellNumberCols).fill(0);
  cellStates[Math.floor(cellStates.length / 2)] = 1;
}

function draw() {
  background(220);

  cellNumberRows = generationSlider.value()+1;
  cellNumberCols = 2*generationSlider.value()+1;
  cellStates = new Array(cellNumberCols).fill(0);
  cellStates[Math.floor(cellStates.length / 2)] = 1;
  drawCells(cellNumberRows, cellNumberCols);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  determineLayout(windowWidth, windowHeight);
  createInterface()
  redraw();
}