function calculateEllipseVertices (xDimension, yDimension, detailLevel, in3D = false) {
    let verticesEllipse = []
    let radiusX = xDimension/2;
    let radiusY = yDimension/2

    for (let i = 0; i < detailLevel; i++){
        let angle = (TWO_PI / detailLevel) * i;
        let x = radiusX * cos(angle);
        let y = radiusY * sin(angle);
        if (in3D) {
            verticesEllipse.push(createVector(x,y,0));
        } else {
            verticesEllipse.push(createVector(x,y));
        }
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

    for(let i=0;i<n-1;i++){
        if((i+2) % 2 === 0){
            stripVertices.push(FanVertices[0]);
        } else {
            stripVertices.push(FanVertices[i+1])
        }
    stripVertices.push(FanVertices[i+1])       
    }
    stripVertices.push(FanVertices[0]);
    stripVertices.push(FanVertices[0]);
    return stripVertices
}

function stripSequenceForFanDrawTop(FanVertices){
    let stripVertices = [];
    let n = FanVertices.length;

    for(let i=0;i<n-1;i++){
        if((i+2) % 2 === 0){
            stripVertices.push(FanVertices[0]);
        } else{
            stripVertices.push(FanVertices[n-(i+1)]);
        }
        stripVertices.push(FanVertices[n-(i+1)]);
    }
    stripVertices.push(FanVertices[0]);
    stripVertices.push(FanVertices[0]);
    return stripVertices
    
}

function stripSequenceForStripDrawSide(bottomVertices, topVertices){
    let stripVertices = [];
    let n = bottomVertices.length;

    for(let i = 0; i < n; i++){
            stripVertices.push(bottomVertices[i]);
            stripVertices.push(topVertices[i]);
        }
    stripVertices.push(bottomVertices[0]);
    stripVertices.push(topVertices[0]);
    return stripVertices
}

function calculateTruncatedFrustumVertices(bottomShapeVertices, topShapeVertices){
    let bottomVerticesSequenced = stripSequenceForFanDrawBottom(bottomShapeVertices);
    let topVerticesSequenced = stripSequenceForFanDrawTop(topShapeVertices);
    let sideVerticesSequenced = stripSequenceForStripDrawSide(bottomShapeVertices, topShapeVertices);

    let verticesFrustum = bottomVerticesSequenced.concat(sideVerticesSequenced, topVerticesSequenced);

    return verticesFrustum;
}

function calculateFrustumVertices(bottomDimension, topDimension, height, detailLevel){
    let verticesFrustum = [];

    let bottomShapeVertices = calculateEllipseVertices (bottomDimension, bottomDimension, detailLevel);
    bottomShapeVertices.forEach(vertex => {
        vertex.z = height/2;
    });

    let topShapeVertices = calculateEllipseVertices (topDimension, topDimension, detailLevel);
    topShapeVertices.forEach(vertex => {
        vertex.z = -height/2;
    });

    verticesFrustum = calculateTruncatedFrustumVertices(bottomShapeVertices, topShapeVertices);

    return verticesFrustum;
}

function calculateTorusVertices (radiusWhole, radiusTube, detailLevel) {
    let verticesTorus =[];
    let verticesCircle = calculateEllipseVertices (radiusTube, radiusTube, detailLevel, true);
    let angleStep = TWO_PI/detailLevel;

    verticesCircle.push({...verticesCircle[0]});

    for (let i = 0; i < detailLevel; i++){
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleCircle1 + angleStep;

        verticesCircle.forEach(vertex => {
            let x1 = (vertex.x + radiusWhole) * cos(angleCircle1);
            let y1 = vertex.y;
            let z1 = (vertex.x + radiusWhole) * sin(angleCircle1);

            let x2 = (vertex.x + radiusWhole) * cos(angleCircle2);
            let y2 = vertex.y;
            let z2 = (vertex.x + radiusWhole) * sin(angleCircle2);

            verticesTorus.push(createVector(x1,y1,z1));
            verticesTorus.push(createVector(x2,y2,z2));
            
        });
    }
    return verticesTorus;
}

function calculateSphereVertices(radius, detailLevel) {
    let verticesSphere = [];
    let verticesCircle = calculateEllipseVertices (2*radius, 2*radius, detailLevel, true);
    let angleStep = PI/detailLevel;

    verticesCircle.push({...verticesCircle[0]});


    for (let i = 0; i <= detailLevel; i++) {
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleStep * (i+1);

        verticesCircle.forEach(vertex => {
            let x1 = vertex.x * sin(angleCircle1);
            let y1 = vertex.y * sin(angleCircle1);
            let z1 = radius * cos(angleCircle1);

            let x2 = vertex.x * sin(angleCircle2);
            let y2 = vertex.y * sin(angleCircle2);
            let z2 = radius * cos(angleCircle2);

            verticesSphere.push(createVector(x1, y1, z1));
            verticesSphere.push(createVector(x2, y2, z2));
            });
    }
    return verticesSphere;
}

function calculateSnailVertices(radiusWhole, radiusTube, height, detailLevel){
    let verticesSnail =[];
    let bottomVertices = [];
    let topVertices = [];
    let sideVerticesSequenced = [];
    let verticesCircle = calculateEllipseVertices (radiusTube, radiusTube, detailLevel, true);
    let angleStep = TWO_PI/detailLevel;

    verticesCircle.push({...verticesCircle[0]});

    let bottomVerticesSequenced = [];
    let topVerticesSequenced= [];

    for (let i = 0; i < detailLevel; i++){
        let heightStep = height/detailLevel;
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleStep * (i+1);

        if(i === 0){
            verticesCircle.forEach(vertex => {
                let x = (vertex.x + radiusWhole) * cos(angleCircle1);
                let y = vertex.y + heightStep * i;
                let z = (vertex.x + radiusWhole) * sin(angleCircle1);

                bottomVertices.push(createVector(x,y,z));
            });
        }

        verticesCircle.forEach(vertex => {
            let x1 = (vertex.x + radiusWhole) * cos(angleCircle1);
            let y1 = vertex.y + heightStep * i;
            let z1 = (vertex.x + radiusWhole) * sin(angleCircle1);

            let x2 = (vertex.x + radiusWhole) * cos(angleCircle2);
            let y2 = vertex.y + heightStep * (i+1);
            let z2 = (vertex.x + radiusWhole) * sin(angleCircle2);

            sideVerticesSequenced.push(createVector(x1,y1,z1));
            sideVerticesSequenced.push(createVector(x2,y2,z2));
            
        });

        if(i === detailLevel-1){
            verticesCircle.forEach(vertex => {
                let x = (vertex.x + radiusWhole) * cos(angleCircle2);
                let y = vertex.y + heightStep * (i+1);
                let z = (vertex.x + radiusWhole) * sin(angleCircle2);

                topVertices.push(createVector(x,y,z));
            });
        }
    }
    bottomVerticesSequenced = stripSequenceForFanDrawBottom(bottomVertices);
    topVerticesSequenced = stripSequenceForFanDrawTop(topVertices);
    verticesSnail = bottomVerticesSequenced.concat(sideVerticesSequenced, topVerticesSequenced);

    return verticesSnail;
}

// SNAIL!!!!!

/* function calculateSphereVertices (radius, detailLevel) {
    let verticesSphere = [];
    let verticesCircle = calculateEllipseVertices (radius, radius, detailLevel, true);
    let angleStep = PI/detailLevel;

    verticesCircle.push({...verticesCircle[0]});

    for(let i = 0; i < detailLevel; i++){
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleCircle1 + angleStep;

        verticesCircle.forEach(vertex => {
            let x1 = vertex.x = radius * cos(angleCircle1) * sin(angleCircle1);
            let y1 = vertex.y = radius * cos(angleCircle1);
            let z1 = vertex.z = radius * sin(angleCircle1) * sin(angleCircle1);

            let x2 = vertex.x = radius * cos(angleCircle2) * sin(angleCircle2);
            let y2 = vertex.y = radius * cos(angleCircle2);
            let z2 = vertex.z = radius * sin(angleCircle2) * sin(angleCircle2);

            verticesSphere.push(createVector(x1,y1,z1));
            verticesSphere.push(createVector(x2,y2,z2));
        });
    }
    return verticesSphere;
}


function drawSnail (p, xStart, yStart, zStart, angleX, angleY, angleZ, radiusCircleLinearModifier, radiusCirclePowerModifier, radiusTorusLinearModifier, radiusTorusPowerModifier, incrementSnail){

} */