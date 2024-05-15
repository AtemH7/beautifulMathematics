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

function calculateSnailVertices(radiusWholeStart, radiusWholeEnd, radiusTubeStart, radiusTubeEnd, height, loops, detailLevel){
    let verticesSnail =[];
    let bottomVertices = [];
    let topVertices = [];
    let sideVerticesSequenced = [];

    let angleStep = TWO_PI/detailLevel;
    let heightStep = height/(loops*detailLevel);
    let radiusWholeStep = (radiusWholeEnd-radiusWholeStart)/(loops*detailLevel);
    let radiusTubeStep = (radiusTubeEnd-radiusTubeStart)/(loops*detailLevel);

    let bottomVerticesSequenced = [];
    let topVerticesSequenced= [];

    for (let i = 0; i < (loops * detailLevel); i++){
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleStep * (i+1);
        let radiusWhole1 = radiusWholeStart + (i*radiusWholeStep);
        let radiusWhole2 = radiusWholeStart + ((i+1)*radiusWholeStep)
        let radiusTube1 = radiusTubeStart + (i*radiusTubeStep);
        let radiusTube2 = radiusTubeStart + ((i+1)*radiusTubeStep)
        let verticesCircle1 = calculateEllipseVertices (radiusTube1, radiusTube1, detailLevel, true)
        let verticesCircle2 = calculateEllipseVertices (radiusTube2, radiusTube2, detailLevel, true)

        verticesCircle1.push({...verticesCircle1[0]});
        verticesCircle2.push({...verticesCircle2[0]});


        if(i === 0){
            verticesCircle1.forEach(vertex => {
                let x = (vertex.x + radiusWholeStart) * cos(angleCircle1);
                let y = vertex.y + heightStep * i;
                let z = (vertex.x + radiusWholeStart) * sin(angleCircle1);

                bottomVertices.push(createVector(x,y,z));
            });
        }

        verticesCircle1.forEach(vertex => {
            let x1 = (vertex.x + radiusWhole1) * cos(angleCircle1);
            let y1 = vertex.y + heightStep * i;
            let z1 = (vertex.x + radiusWhole1) * sin(angleCircle1);

            let x2 = (vertex.x + radiusWhole2) * cos(angleCircle2);
            let y2 = vertex.y + heightStep * (i+1);
            let z2 = (vertex.x + radiusWhole2) * sin(angleCircle2);

            sideVerticesSequenced.push(createVector(x1,y1,z1));
            sideVerticesSequenced.push(createVector(x2,y2,z2));
        });

        if(i === (detailLevel*loops)-1){
            verticesCircle2.forEach(vertex => {
                let x = (vertex.x + radiusWholeEnd) * cos(angleCircle2);
                let y = vertex.y + heightStep * (i+1);
                let z = (vertex.x + radiusWholeEnd) * sin(angleCircle2);

                topVertices.push(createVector(x,y,z));
            });
        }
    }
    bottomVerticesSequenced = stripSequenceForFanDrawBottom(bottomVertices);
    topVerticesSequenced = stripSequenceForFanDrawTop(topVertices);
    verticesSnail = bottomVerticesSequenced.concat(sideVerticesSequenced, topVerticesSequenced);

    return verticesSnail;
}