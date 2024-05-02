let sidesSlider;

function setupSlider(p, x, y, width) {
    sidesSlider = p.createSlider(0, 100, 0, 0.1);
    sidesSlider.position(x, y);
    sidesSlider.style('width', `${width}px`);
}

function getSliderValue(maxSides) {
    const sliderValue = sidesSlider.value();
    let roundedValue;

    if (sliderValue <= 80) {
        const interval = 47 / 77; // Calculate the interval for the first 80%
        roundedValue = Math.floor(sliderValue * interval) + 3;
    } else {
        const interval = (maxSides - 50) / 20; // Calculate the interval for the last 20%
        roundedValue = Math.floor((sliderValue - 80) * interval) + 50;
    }

    return roundedValue;
}