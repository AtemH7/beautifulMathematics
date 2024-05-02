function preload() {
  polygonNames = loadJSON('Polygons.json');
}

function calculateMaxVertices(width, height) {
  let radius = Math.min(width, height) / 2;
  let desiredChordLength = 1;
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

function resizeInterface(width,height) {      
    resizeCanvas(width, height);
    sidesSlider.remove();
    maxSides = calculateMaxVertices(width, height);
    const sliderWidth = width - 40;
    setupSlider(this, 20, 60, sliderWidth);
}