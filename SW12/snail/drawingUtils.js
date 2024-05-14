function drawShape2D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, drawCallback) {
    p.push();
    p.translate(xCenter, yCenter, zCenter);

    p.rotateX(p.radians(angleX));
    p.rotateY(p.radians(angleY));
    p.rotateZ(p.radians(angleZ));

    p.beginShape();
    drawCallback(p);
    p.endShape(p.CLOSE);
    p.pop();
}

function drawShape3D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, drawCallback) {
    p.push();
    p.translate(xCenter, yCenter, zCenter);

    p.rotateX(p.radians(angleX));
    p.rotateY(p.radians(angleY));
    p.rotateZ(p.radians(angleZ));

    p.beginShape(p.TRIANGLE_STRIP);
    drawCallback(p);
    p.endShape();
    p.pop();
}

function drawEllipse(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, xDimension, yDimension, detailLevel) {
    let vertices = calculateEllipseVertices(xDimension, yDimension, detailLevel);

    drawShape2D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, (p) => {
        vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y, 0);
        });
    });
}

function drawCircle(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radius, detailLevel) {
    drawEllipse(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radius*2, radius*2, detailLevel);
}

function drawFrustum(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, bottomDimension, topDimension, height, detailLevel) {
    let vertices = calculateFrustumVertices(bottomDimension, topDimension, height, detailLevel);

    drawShape3D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, (p) => {
        vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y, vertex.z);
        });
    });
}

function drawCylinder(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radius, height, detailLevel){
    drawFrustum(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, 2*radius, 2*radius, height, detailLevel);
}

function drawCone(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radius, height, detailLevel){
    drawFrustum(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, 2*radius, 0, height, detailLevel);
}

function drawTorus(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radiusWhole, radiusTube, detailLevel){
    let vertices = calculateTorusVertices(radiusWhole, radiusTube, detailLevel);

    drawShape3D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, (p) => {
        vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y, vertex.z);
        });
    });
}

function drawSphere(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radius, detailLevel){
    let vertices = calculateSphereVertices (radius, detailLevel);

    drawShape3D(p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, (p) => {
        vertices.forEach(vertex => {
            p.vertex(vertex.x, vertex.y, vertex.z);
        });
    });
}