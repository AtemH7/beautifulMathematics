let strokeWeightInput = 3;

function drawPolygonOutlined(p, x, y, radius, numSides) {
    const angleStep = p.TWO_PI / numSides;
    p.beginShape();
    for (let angle = 0; angle < p.TWO_PI; angle += angleStep) {
        p.vertex(x + p.cos(angle) * radius, y + p.sin(angle) * radius);
    }
    p.endShape(p.CLOSE);
}

function drawPolygonPoints(p, x, y, radius, numSides) {
    const angleStep = p.TWO_PI / numSides;
    p.strokeWeight(strokeWeightInput);
    p.stroke(0);
    for (let angle = 0; angle < p.TWO_PI; angle += angleStep) {
        const px = x + p.cos(angle) * radius;
        const py = y + p.sin(angle) * radius;
        p.point(px, py);
    }
}

function drawCircle(p, x, y, diameter) {
    p.ellipse(x, y, diameter, diameter);
}