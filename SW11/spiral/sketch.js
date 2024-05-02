let maxSides;

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxSides = calculateMaxVertices(windowWidth, windowHeight);
  const sliderWidth = windowWidth - 160;
  setupSlider(this, 140, 120, sliderWidth);

    let weightLabel = createP('Stroke Weight:');
    weightLabel.position(20, 20);
    strokeWeightInput = createInput('3', 'number');
    strokeWeightInput.position(120, 35);
    strokeWeightInput.changed(updateStrokeWeight);

    createButtons();
}

function draw() {
  const numSides = getSliderValue(maxSides);
  let strokeWeightValue = parseFloat(strokeWeightInput.value());

    background(220);
    strokeWeight(strokeWeightValue);

    if (drawSpiralOutlinedFlag) {
        stroke(0);
        noFill();
        drawSpiralOutlined(this, width / 2, (height+150) / 2, (1/spiralCountSlider.value())*(Math.min(width, height) / numSides), numSides);
    }

    if (drawSpiralPointedFlag) {
        drawSpiralPoints(this, width / 2, (height+150) / 2, (1/spiralCountSlider.value())*(Math.min(width, height) / numSides), numSides);
    }
    drawSliderValues(this, 20, 135);
}

function updateStrokeWeight() {
    let newStrokeWeight = parseFloat(strokeWeightInput.value());
    if (!isNaN(newStrokeWeight)) {
        strokeWeight(newStrokeWeight);
    }
}

function windowResized() {
  const newWidth = windowWidth;
  const newHeight = windowHeight;
  resizeInterface(newWidth, newHeight);
}