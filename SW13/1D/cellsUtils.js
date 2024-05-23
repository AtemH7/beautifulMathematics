function drawCells(cellNumberRows, cellNumberCols) {
    determineLayout(width, height);
    
    let cellSize = min(availableGridWidth/cellNumberCols, availableGridHeight/cellNumberRows)
    let offsetX, offsetY;

    if (sidePanel) {
        offsetX = width - cellSize * cellNumberCols;
        offsetY = height - availableGridHeight;
    } else {
        offsetX = width - availableGridWidth;
        offsetY = height - cellSize * cellNumberRows;
    }

    let rowStates = cellStates.slice(); 

    for(let row = 0; row<cellNumberRows; row++){
        for(let col = 0; col < cellNumberCols; col++){
            let x = offsetX + col * cellSize;
            let y = offsetY + row * cellSize;
            console.log(row, col, rowStates);

            fill(fillState(rowStates[col]));
            stroke(0);
            rect(x, y, cellSize, cellSize);
        }
        rowStates = createNewStates(rowStates);
    }
}

function fillState(state){
    if(state === 0){
        return 255
    } else {
        return 0
    }
}

function createNewStates(rowStates) {
    let newStates = new Array(rowStates.length);
    let ruleBinary = getBinaryDigits(ruleNumber).reverse();

    for (let i = 0; i < rowStates.length; i++) {
        let left = (i === 0) ? rowStates[rowStates.length - 1] : rowStates[i - 1];
        let center = rowStates[i];
        let right = (i === rowStates.length - 1) ? rowStates[0] : rowStates[i + 1];
        let index = 4 * left + 2 * center + right;

        newStates[i] = ruleBinary[index];
    }
    return newStates;
}
