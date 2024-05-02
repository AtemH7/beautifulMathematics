let drawSpiralOutlinedFlag = true;
let drawSpiralPointedFlag = true;

function calculateMaxVertices(width, height) {
  let radius = Math.min(width, height) / 2;
  let desiredChordLength = 2;
  return Math.floor(2 * Math.PI * radius / desiredChordLength);
}

function resizeInterface(width, height) {      
    resizeCanvas(width, height);
    resizeSlider(width);
    createButtons();
    redraw();
}

function createButtons() {
    const toggleSpiralOutlinedButton = createButton('Toggle Spiral Outlined');
    toggleSpiralOutlinedButton.position(20, 180);
    toggleSpiralOutlinedButton.mousePressed(toggleSpiralOutlined);

    const toggleSpiralPointedButton = createButton('Toggle Spiral Pointed');
    toggleSpiralPointedButton.position(20, 210);
    toggleSpiralPointedButton.mousePressed(toggleSpiralPointed);
}

function toggleSpiralOutlined() {
    drawSpiralOutlinedFlag = !drawSpiralOutlinedFlag;
}

function toggleSpiralPointed() {
    drawSpiralPointedFlag = !drawSpiralPointedFlag;
}