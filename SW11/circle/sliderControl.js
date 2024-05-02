let sidesSlider;

function setupSlider(p, x, y, width) {
    sidesSlider = p.createSlider(0, 100, 0, 0.1);
    sidesSlider.position(x, y);
    sidesSlider.style('width', `${width}px`);
}

function resizeSlider(width) {
    sidesSlider.remove();
    const sliderWidth = width - 40;
    setupSlider(this, 20, 60, sliderWidth);
}

function getSliderValue(maxSides) {
    const sliderValue = sidesSlider.value();
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