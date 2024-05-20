let stateSlider;
let labelSlider;
let labelRuleInput;
let valueDisplay;
let ruleInput;
let updateButton;
let StatesVisualization;

let numStates = 2;
let ruleSet = "";
let layoutConfig;
let sidePanel;

let uiWidth;
let uiHeight;
let displayWidth;
let displayHeight;
let availableGridWidth;
let availableGridHeight;

function updateDimensions() {
    uiWidth = width * 0.2;
    uiHeight = height * 0.2;

    displayWidth = uiWidth*0.8;
    displayHeight = uiHeight*0.8;  
}

function determineLayout(newWidth, newHeight) {
    if(newWidth>newHeight){
        sidePanel = true;
    } else {
        sidePanel = false;
    }
    width = newWidth;
    height = newHeight

    updateDimensions();

    if (sidePanel) {
        layoutConfig = (width / 8 > height / 2) ? {rowsPanel: 2, colsPanel: 4} : {rowsPanel: 1, colsPanel: 8};
        availableGridHeight = min(height,width - uiWidth);
        availableGridWidth = width - uiWidth;
    } else {
        layoutConfig = (width / 8 > height / 4) ? {rowsPanel: 4, colsPanel: 2} : {rowsPanel: 8, colsPanel: 1};
        availableGridWidth = min(width,height -uiHeight);
        availableGridHeight = height -uiHeight;
    }
    console.log(layoutConfig);
}

function createStateSlider() {
    let sliderWidth = displayWidth;

    stateSlider = createSlider(2, 16, 2);
    stateSlider.position((uiWidth-displayWidth)/ 2, (uiHeight-displayHeight)/2 + 2*displayHeight/14);
    stateSlider.style('width', `${sliderWidth}px`);

    labelSlider = createDiv('Number of States:');
    labelSlider.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2);
    labelSlider.style('color', '#000');

    valueDisplay = createDiv(stateSlider.value());
    valueDisplay.position(sliderWidth + displayWidth/10, (uiHeight-displayHeight)/2);
    valueDisplay.style('color', '#000');

    stateSlider.input(() => {
        valueDisplay.html(stateSlider.value());
    });

    return { slider: stateSlider, label: labelSlider, display: valueDisplay }; 
}

function createRuleInput() {
    labelRuleInput = createDiv('Rule Number:');
    labelRuleInput.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 5*displayHeight/14);
    labelRuleInput.style('color', '#000');

    ruleInput = createInput('');
    ruleInput.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 8*displayHeight/14);
    ruleInput.style('width', `${displayWidth}px`);

    return {label: labelRuleInput, input: ruleInput}; 
}

function createUpdateButton(){
    updateButton = createButton('Update Rule');
    updateButton.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 11*displayHeight/14);
    updateButton.mousePressed(updateRuleSet);

    return updateButton;
}

function updateRuleSet() {
    ruleSet = ruleInput.value();
    updateTForms();
}

function drawCells(cellNumber){
    determineLayout(width, height)

    let cellSize = (min(availableGridWidth, availableGridHeight) * pixelDensity()) / cellNumber;

    let cols = floor(availableGridWidth / cellSize);
    let rows = floor(availableGridHeight / cellSize);

    let offsetX;
    let offsetY;

    if(sidePanel){
        offsetX = width - cellSize*cellNumber;
        offsetY = height - availableGridHeight;
    } else {
        offsetX = width - availableGridWidth;
        offsetY = height - cellSize*cellNumber;
    }

    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
        let x = offsetX + col * cellSize;
        let y = offsetY + row * cellSize;
        fill(255);
        stroke(0);
        rect(x, y, cellSize, cellSize);
        }
    }
}

function drawTForms(x, y) {
    let cellWidth = 20;
    let padding = 10;
    let tForms = ["111", "110", "101", "100", "011", "010", "001", "000"];
  
    for (let i = 0; i < layoutConfig.rows; i++) {
      for (let j = 0; j < layoutConfig.cols; j++) {
        let index = i * layoutConfig.cols + j;
        if (index >= tForms.length) break;
        let form = tForms[index].split('');
        for (let k = 0; k < form.length; k++) {
          fill(form[k] === '1' ? 0 : 255);
          rect(x + j * (3 * cellWidth + padding) + k * cellWidth, y + i * (cellWidth + padding), cellWidth, cellWidth);
        }

        let result = ruleSet[index] === '1' ? 0 : 255;
        fill(result);
        rect(x + j * (3 * cellWidth + padding) + 3.5 * cellWidth, y + i * (cellWidth + padding), cellWidth, cellWidth);
      }
    }
}