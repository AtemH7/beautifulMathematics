let maxSides;

function setup() {
    createCanvas(windowWidth, windowHeight);
    maxSides = calculateMaxVertices(windowWidth, windowHeight);
    const sliderWidth = windowWidth - 40;
    setupSlider(this, 20, 60, sliderWidth);

    let weightLabel = createP('Stroke Weight:');
    weightLabel.position(20, 20);
    strokeWeightInput = createInput('3', 'number');
    strokeWeightInput.position(120, 35);
    strokeWeightInput.changed(updateStrokeWeight);

    createButtons();
}

function draw() {
    background(220);
    const numSides = getSliderValue(maxSides);

    let strokeWeightValue = parseFloat(strokeWeightInput.value());
    strokeWeight(strokeWeightValue);

    if (drawPolygonOutlinedFlag) {
        drawPolygonOutlined(this, width / 2, height / 2, Math.min(width, height) / 3, numSides);
    }

    if (drawPolygonPointedFlag) {
        drawPolygonPoints(this, width / 2, height / 2, Math.min(width, height) / 3, numSides);
    }

    if (drawCircleFlag) {
        noFill();
        stroke(0, 100, 255);
        drawCircle(this, width / 2, height / 2, Math.min(width, height) * 2.01 / 3);
    }


    const polygonName = getPolygonName(numSides);
    displayPolygonInfo(this, numSides, polygonName);
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