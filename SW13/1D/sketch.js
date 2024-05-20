let cellNumber = 1;

function setup() {
let canvas =  createCanvas(windowWidth, windowHeight);
canvas.style('display', 'block');
textAlign(LEFT, TOP);
noLoop();
pixelDensity(displayDensity());

determineLayout(windowWidth, windowHeight);

createStateSlider();
createRuleInput();
createUpdateButton();
}

function draw() {
  background(220);

  drawCells(cellNumber);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  determineLayout(windowWidth, windowHeight);

  stateSlider.remove();
  labelSlider.remove();
  valueDisplay.remove();
  labelRuleInput.remove();
  ruleInput.remove();
  updateButton.remove();

  createStateSlider();
  createRuleInput();
  createUpdateButton();
  
  redraw();
}