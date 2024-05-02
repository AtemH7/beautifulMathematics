let maxSides;

function setup() {
    createCanvas(windowWidth, windowHeight);
    maxSides = calculateMaxVertices(windowWidth, windowHeight);
    const sliderWidth = windowWidth - 40;
    setupSlider(this, 20, 60, sliderWidth);
}

function draw() {
    background(220);
    const numSides = getSliderValue(maxSides);
    drawPolygon(this, width / 2, height / 2, Math.min(width, height) / 3, numSides);

    noFill();
    stroke(0, 100, 255);
    drawCircle(this, width / 2, height / 2, Math.min(width, height) * 2 / 3);

    const polygonName = getPolygonName(numSides);
    displayPolygonInfo(this, numSides, polygonName);
}

function windowResized() {
    resizeInterface(windowWidth, windowHeight);
}