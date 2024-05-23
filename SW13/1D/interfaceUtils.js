function updateDimensions() {
    uiWidth = width * 0.2;
    uiHeight = height * 0.25;

    displayWidth = uiWidth * 0.8;
    displayHeight = uiHeight * 0.8;  
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
        availableGridHeight = min(height,width - uiWidth);
        availableGridWidth = width - uiWidth;
        drawSidePanel();
    } else {
        availableGridWidth = min(width,height -uiHeight);
        availableGridHeight = height -uiHeight;
        drawTopPanel();
    }
}

function createInterface(){
    
    if(totalisticButton){
        totalisticButton.remove();
    }

    if(stateSlider){
        stateSlider.remove();
        stateSliderLabel.remove();
        stateSliderDisplay.remove();
    }

    if(ruleInput){
        labelRuleInput.remove();
        ruleInput.remove();
    }

    if(updateButton){
        updateButton.remove();
    }

    if(generationSlider){
        generationSlider.remove();
        generationSliderLabel.remove();
        generationSliderDisplay.remove();
    }

    if(toggleTotalisticOn){
        createStateSlider();
    }
    createTotalisticButton();
    createRuleInput();
    createUpdateButton();
    createGenerationSlider();
}

function createTotalisticButton(){

    totalisticButton = createButton('Toggle Totalistic');
    totalisticButton.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + displayHeight/15);
    totalisticButton.style('background-color', toggleTotalisticOn ? '#ccc' : '#fff');
    totalisticButton.mousePressed(toggleTotalistic);
 
    return totalisticButton;
}

function toggleTotalistic(){
    toggleTotalisticOn = !toggleTotalisticOn;
    createInterface();
    totalisticButton.style('background-color', toggleTotalisticOn ? '#ccc' : '#fff');
}

function createStateSlider() {
    let sliderWidth = displayWidth;

    stateSlider = createSlider(2, 16, 2);
    stateSlider.position((uiWidth-displayWidth)/ 2, (uiHeight-displayHeight)/2 + 5.5*displayHeight/15);
    stateSlider.style('width', `${sliderWidth}px`);

    stateSliderLabel = createDiv('Number of States:');
    stateSliderLabel.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 4*displayHeight/15);
    stateSliderLabel.style('color', '#000');

    stateSliderDisplay = createDiv(stateSlider.value());
    stateSliderDisplay.position(sliderWidth + displayWidth/10, (uiHeight-displayHeight)/2 + 4*displayHeight/15);
    stateSliderDisplay.style('color', '#000');

    stateSlider.input(() => {
        stateSliderDisplay.html(stateSlider.value());
    });

    return { slider: stateSlider, label: stateSliderLabel, display: stateSliderDisplay }; 
}

function createRuleInput() {
    labelRuleInput = createDiv('Rule Number:');
    labelRuleInput.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 7.5*displayHeight/15);
    labelRuleInput.style('color', '#000');

    ruleInput = createInput('');
    ruleInput.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 10*displayHeight/15);
    ruleInput.style('width', `${displayWidth}px`);

    return {label: labelRuleInput, input: ruleInput}; 
}

function createUpdateButton(){

    updateButton = createButton('Update Rule');
    updateButton.position(((uiWidth-displayWidth)/2)+displayWidth/2, (uiHeight-displayHeight)/2 + 7.5*displayHeight/15);
    updateButton.mousePressed(updateRuleSet);

    return updateButton;
}

function keyPressed() {
    if (keyCode === ENTER) {
        updateRuleSet();
    }
  }

function createGenerationSlider() {
    let sliderWidth = displayWidth;

    generationSlider = createSlider(1, height/pixelDensity(displayDensity()), 1);
    generationSlider.position((uiWidth-displayWidth)/ 2, (uiHeight-displayHeight)/2 + 14.5*displayHeight/15);
    generationSlider.style('width', `${sliderWidth}px`);

    generationSliderLabel = createDiv('Number of Generations:');
    generationSliderLabel.position((uiWidth-displayWidth)/2, (uiHeight-displayHeight)/2 + 13*displayHeight/15);
    generationSliderLabel.style('color', '#000');

    generationSliderDisplay = createDiv(generationSlider.value());
    generationSliderDisplay.position(sliderWidth + displayWidth/10, (uiHeight-displayHeight)/2 + 13*displayHeight/15);
    generationSliderDisplay.style('color', '#000');

    generationSlider.input(() => {
        generationSliderDisplay.html(generationSlider.value());
        redraw();
    });

    return { slider: generationSlider, label: generationSliderLabel, display: generationSliderDisplay }; 
}

function updateRuleSet() {
    ruleSet = ruleInput.value();
    ruleNumber = ruleSet,
    determineLayout(width,height);
    redraw();
}

function drawSidePanel() {
    tFormsDrawWidth = displayWidth;
    tFormsDrawHeight = height - (uiHeight + 2*(uiHeight-displayHeight));
    numberTs = 8;
    if(toggleTotalisticOn){
        
    } else {
        let cellSize = determineCellSize(tFormsDrawWidth, tFormsDrawHeight, numberTs);
        drawWolframSide(cellSize.side, cellSize.numberRows, cellSize.numberCol, numberTs, ruleNumber);
    }
}

function drawTopPanel() {
    tFormsDrawWidth = width - (uiWidth + 2*(uiWidth-displayWidth));
    tFormsDrawHeight = displayHeight;
    if(toggleTotalisticOn){

    } else {
        let cellSize = determineCellSize(tFormsDrawWidth,tFormsDrawHeight,8);
        drawWolframTop(cellSize);
    }
}

function getBinaryDigits(number) {
    let digits = [];
    while (number > 0) {
        let digit = number % 2;
        digits.unshift(digit);
        number = Math.floor(number / 2);
    }
    while (digits.length < 8) {
        digits.unshift(0);
    }
    return digits;
}

function drawWolframSide(cellSize, numberRows, numberCols, numberTs, ruleNumber){
    tFormsDrawHeightStep = tFormsDrawHeight/numberRows;
    tFormsDrawWidthStep = tFormsDrawWidth/numberCols;
    let n = numberTs;
    let binary = getBinaryDigits(ruleNumber);
    let eee = binary[0];
    let een = binary[1];
    let ene = binary[2];
    let enn = binary[3];
    let nee = binary[4];
    let nen = binary[5];
    let nne = binary[6];
    let nnn = binary[7];
     
    for(j=0;j<numberCols;j++){
        for(i=0;i<numberRows;i++){
            if((j*numberRows)+i <n){
                drawT(((uiWidth-displayWidth)/2) + cellSize * j, uiHeight + (uiHeight-displayHeight) + cellSize * i,cellSize,determineFillFirst((j*numberRows)+i,8),determineFillSecond((j*numberRows)+i,8),determineFillThird((j*numberRows)+i),determineFillNext(binary[(j*numberRows)+i]),binary[(j*numberRows)+i]);
            }
        }  
    }
}

function drawWolframTop(cellSize){
    
}

function determineFillNext(number){
    if(number === 1){
        return 0
    } else {
        return 255
    }
}

function determineFillFirst(number,n){
    if(number < n/2){
        return 0
    } else {
        return 255
    }
}

function determineFillSecond(number,n){
    if(number < n/4 || (number > (n/2)-1) && (number < (n/2)+(n/4))){
        return 0
    } else {
        return 255
    }
}

function determineFillThird(number){
    if((number+2)%2 ===0){
        return 0
    } else {
        return 255
    }
}

function determineCellSize(width, height, n){
    let ma = Math.max(width, height);
    let mi = Math.min(width, height);
    let s;

    for(i=1;i<=n;i++){
        if((mi/i)*(n/i) <= ma){
            s = mi/i;
            return {side: s, numberRows: round(n/i), numberCol: i};
        } else {
            if (ma/(n/i) > (i)*(mi/(i+1))) {
                return {side: s, numberRows: round(n/i), numberCol: i};
            }
        }
    }
    return {side: 0, numberCol: 0};
}

function drawT(x,y,s,gvtl,gvt,gvtr,gvm,character){
    let sideSmall = s/4;
    let sideSmallSquare = sideSmall*0.9;
    let coordinatesSmall = s/8;

    fill(255);
    stroke(0);
    rect(x, y, s, s);

    fill(gvtl);
    stroke(0);
    rect(x+coordinatesSmall + sideSmallSquare/10, y+coordinatesSmall + sideSmallSquare/10, sideSmallSquare, sideSmallSquare);

    fill(gvt);
    stroke(0);
    rect(x+3*coordinatesSmall + sideSmallSquare/10, y+coordinatesSmall + sideSmallSquare/10, sideSmallSquare, sideSmallSquare);

    fill(gvtr);
    stroke(0);
    rect(x+5*coordinatesSmall + sideSmallSquare/10, y+coordinatesSmall + sideSmallSquare/10, sideSmallSquare, sideSmallSquare);

    fill(gvm);
    stroke(0);
    rect(x+3*coordinatesSmall + sideSmallSquare/10, y+3*coordinatesSmall + sideSmallSquare/10, sideSmallSquare, sideSmallSquare);

    fill(0);
    noStroke();
    textSize(sideSmall);
    textAlign(CENTER, BOTTOM);
    text(character, x + 4*coordinatesSmall, y + 7.5*coordinatesSmall);
}