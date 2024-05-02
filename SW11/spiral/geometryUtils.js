let strokeWeightInput = 3;

function drawSpiralOutlined(p, x, y, maxRadius, numSides){
    spirals = spiralCountSlider.value();
    powerScale = powerScaleSlider.value()/10;
    const totalPoints = numSides * spirals +1;
    const angleStep = p.TWO_PI / numSides;
    let angle = 0;
    let r = 0; 
    let linearComponent = calculateInitialIncrement(maxRadius, totalPoints, powerScale);

    p.stroke(100);
    p.strokeWeight(strokeWeightInput);

    p.beginShape();
    for(let points = 0; points < totalPoints; points++){
        let px = x + p.cos(angle) * r;
        let py = y + p.sin(angle) * r;
        p.vertex(px, py);

        r = (r + linearComponent)**powerScale;

        angle += angleStep;
    }
    p.endShape();
}

function drawSpiralPoints(p, x, y, maxRadius, numSides){
    spirals = spiralCountSlider.value();
    powerScale = powerScaleSlider.value()/10;
    const totalPoints = numSides * spirals+1;
    const angleStep = p.TWO_PI / numSides;
    let angle = 0;
    let r = 0; 
    let linearComponent = calculateInitialIncrement(maxRadius, totalPoints, powerScale);

    p.strokeWeight(strokeWeightInput);
    p.stroke(0);
    for(let points = 0; points < totalPoints; points++){
        let px = x + p.cos(angle) * r;
        let py = y + p.sin(angle) * r;
        p.point(px, py);

        r = (r + linearComponent)**powerScale;

        angle += angleStep;
    }
}
