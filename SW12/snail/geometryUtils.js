function calculateEllipseVertices (xDimension, yDimension, detailLevel) {
    let verticesEllipse = []
    let radiusX = xDimension/2;
    let radiusY = yDimension/2
    for (let i = 0; i < detailLevel; i++){
        let angle = (TWO_PI / detailLevel) * i;
        let x = radiusX * cos(angle);
        let y = radiusY * sin(angle);
        verticesEllipse.push(createVector(x,y));
    }
    return verticesEllipse;
}

function calculateEllipseVerticesCount(detailLevel) {
    let vertices = calculateEllipseVertices(1, 1, detailLevel);
    return vertices.length;
}

function stripSequenceForFanDrawBottom(FanVertices) {
    let stripVertices = [];
    let n = FanVertices.length;
    if(n===3){
        stripVertices.push(FanVertices[1]);
        stripVertices.push(FanVertices[2]);
        stripVertices.push(FanVertices[0]);
    }
    else {
        for(let i=0;i<n-1;i++){
            if((i+2) % 2 === 0){
                stripVertices.push(FanVertices[0]);
            }
            else {
                if(i<3){
                    stripVertices.push(FanVertices[1]);
                }
                else{
                    stripVertices.push(FanVertices[i+1])
                }
            }
            stripVertices.push(FanVertices[i+1])
        }
    }
    return stripVertices
}

function stripSequenceForFanDrawTop(FanVertices){
    let stripVertices = [];
    let n = FanVertices.length;
    if(n===3){
        stripVertices.push(FanVertices[2]);
        stripVertices.push(FanVertices[0]);
        stripVertices.push(FanVertices[1]);
    }
    else {
        for(let i=0;i<n-1;i++){
            if((i+2) % 2 === 0){
                stripVertices.push(FanVertices[0]);
            }
            else{

                stripVertices.push(FanVertices[n-(i+2)]);
            }
            stripVertices.push(FanVertices[n-(i+2)]);
        }
    }
    return stripVertices
}

function calculateFrustumVertices(dimensionBottom, dimensionTop, height, detailLevel){
    let bottomVertices = calculateEllipseVertices(dimensionBottom, dimensionBottom, detailLevel);
    bottomVertices.forEach(vertex => {
        vertex.z = -height / 2;
    });

    let topVertices = calculateEllipseVertices(dimensionTop, dimensionTop, detailLevel);
    topVertices.forEach(vertex => {
        vertex.z = height / 2;
    });

    let bottomVerticesSequenced = stripSequenceForFanDrawBottom(bottomVertices);
    let topVerticesSequenced = stripSequenceForFanDrawTop(topVertices);
    let sideVerticesSequenced = [];

    for(let i = 0; i < bottomVertices.length; i++){
        if(bottomVertices.length > 3){
                sideVerticesSequenced.push(bottomVertices[i]);
                sideVerticesSequenced.push(topVertices[i]);
        }
        else{
            sideVerticesSequenced.push(topVertices[0]);
            sideVerticesSequenced.push(bottomVertices[1]);
            sideVerticesSequenced.push(topVertices[1]);
            sideVerticesSequenced.push(bottomVertices[2]);
        }
    }

    let verticesFrustum = bottomVerticesSequenced.concat(sideVerticesSequenced, topVerticesSequenced);

    return verticesFrustum;
} 

/* function drawZylinder (p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radiusZylinder ,heightZylinder, incrementZylinder){
    const heightStep = heightZylinder/incrementZylinder;
    
    p.push();
    p.translate(xCenter, yCenter, zCenter);

    p.rotateX(radians(angleX));
    p.rotateY(radians(angleY));
    p.rotateZ(radians(angleZ));

    for (let height = 0; height < heightZylinder; height += heightStep){
        drawCircle(p, 0, 0, height-heightZylinder/2,     0,0,0,      radiusZylinder, incrementZylinder)
    }

    p.pop();
}

function drawCone (p, xPoint, yPoint, zPoint, angleX, angleY, angleZ, radiusCone, heightCone, incrementCone){

}

function drawSphere (p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radiusSphere, incrementSphere){

}

function drawTorus (p, xCenter, yCenter, zCenter, angleX, angleY, angleZ, radiusCircle, radiusTorus, incrementTorus){

}

function drawSnail (p, xStart, yStart, zStart, angleX, angleY, angleZ, radiusCircleLinearModifier, radiusCirclePowerModifier, radiusTorusLinearModifier, radiusTorusPowerModifier, incrementSnail){

} */