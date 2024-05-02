function drawPolygon(p, x, y, radius, numSides) {
    const angleStep = p.TWO_PI / numSides;
    p.beginShape();
    for (let angle = 0; angle < p.TWO_PI; angle += angleStep) {
        p.vertex(x + p.cos(angle) * radius, y + p.sin(angle) * radius);
    }
    p.endShape(p.CLOSE);
}

function drawCircle(p, x, y, diameter) {
    p.ellipse(x, y, diameter, diameter);
}