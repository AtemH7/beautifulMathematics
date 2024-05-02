let spiralCountSlider, powerScaleSlider, numSidesSlider;

function setupSlider(p, x, y, width) {
    spiralCountSlider = p.createSlider(1, 30, 1, 1);
    spiralCountSlider.position(x, y);
    spiralCountSlider.style('width', `${width}px`);

    powerScaleSlider = p.createSlider(5, 20, 10, 1);
    powerScaleSlider.position(x, y-20);
    powerScaleSlider.style('width', `${width}px`);

    numSidesSlider = p.createSlider(0, 100, 0, 0.1);
    numSidesSlider.position(x, y-40);
    numSidesSlider.style('width', `${width}px`);
}

function drawSliderValues(p, x, y) {
        p.fill(0);
        p.strokeWeight(1)
        p.text(`Spiral Count: ${spiralCountSlider.value()}`, x, y);
        p.text(`Power Scale: ${powerScaleSlider.value()/10}`, x, y - 20);
        p.text(`Lines: ${getSliderValue(maxSides)}`, x, y - 40);
}

function resizeSlider(width) {
    spiralCountSlider.remove();
    powerScaleSlider.remove();
    numSidesSlider.remove();
    const sliderWidth = width - 40;
    setupSlider(this, 20, 60, sliderWidth);
}

function getSliderValue(maxSides) {
    const sliderValue = numSidesSlider.value();
    let roundedValue;

    if (sliderValue <= 80) {
        const interval = 47 / 77;
        roundedValue = Math.floor(sliderValue * interval) + 3;
    } else {
        const interval = (maxSides - 50) / 20;
        roundedValue = Math.floor((sliderValue - 80) * interval) + 50;
    }

    return roundedValue;
}