let drawPolygonOutlinedFlag = true;
let drawPolygonPointedFlag = true;
let drawCircleFlag = true;

function preload() {
  polygonNames = loadJSON('Polygons.json');
}

function calculateMaxVertices(width, height) {
  let radius = Math.min(width, height) / 2;
  let desiredChordLength = 2;
  return Math.floor(2 * Math.PI * radius / desiredChordLength);
}

function getPolygonName(numSides) {
    if (numSides in polygonNames) {
      return polygonNames[numSides];
    } else {
      return polygonNames['default'];
    }
}

function displayPolygonInfo(p, numSides, polygonName) {
    p.fill(0);
    p.noStroke();
    p.textSize(16);
    p.textAlign(p.LEFT, p.CENTER);
    const infoText = `Vertices: ${numSides} - ${polygonName}`;
    p.text(infoText, 20, 100);
}

function resizeInterface(width, height) {      
    resizeCanvas(width, height);
    resizeSlider(width);
    createButtons();
    redraw();
}

function createButtons() {
    const togglePolygonOutlinedButton = createButton('Toggle Polygon Outlined');
    togglePolygonOutlinedButton.position(20, 120);
    togglePolygonOutlinedButton.mousePressed(togglePolygonOutlined);

    const togglePolygonPointedButton = createButton('Toggle Polygon Pointed');
    togglePolygonPointedButton.position(20, 150);
    togglePolygonPointedButton.mousePressed(togglePolygonPointed);
    
    const toggleCircleButton = createButton('Toggle "perfect" Circle');
    toggleCircleButton.position(20, 180);
    toggleCircleButton.mousePressed(toggleCircle);
}

function togglePolygonOutlined() {
    drawPolygonOutlinedFlag = !drawPolygonOutlinedFlag;
}

function togglePolygonPointed() {
    drawPolygonPointedFlag = !drawPolygonPointedFlag;
}

function toggleCircle() {
    drawCircleFlag = !drawCircleFlag;
}