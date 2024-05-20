function calculateEllipseVertices (xDimension, yDimension, detailLevel, in3D = false) {
    let verticesEllipse = []
    let radiusX = xDimension/2;
    let radiusY = yDimension/2
    let angleStep = TWO_PI / detailLevel;

    for (let i = 0; i < detailLevel; i++){
        let angle = angleStep * i;
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

/* function stripSequenceForFanDrawBottom(FanVertices) {
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

    stripVertices.push(FanVertices[0]);
    stripVertices.push(FanVertices[0]);
    for(let i=0;i<n-1;i++){
        if((i+2) % 2 === 0){
            stripVertices.push(FanVertices[0]);
        } else{
            stripVertices.push(FanVertices[n-(i+1)]);
        }
        stripVertices.push(FanVertices[n-(i+1)]);
    }
    return stripVertices
    
} */

function stripSequenceForFanDrawBottom(FanVertices){
    let stripVertices = [];
    let n = FanVertices.length;
    let x = 3;

    if((n+2)%2===0){
        x=(n/2)+1
    }
    else{
        x=(n+1)/2
    }

    for(i=0;i<n;i++){
        if(i===(n-1)){
            stripVertices.push(FanVertices[0]);
        } else {
            x = x - (i*(-1)**i)
            stripVertices.push(FanVertices[x-1]);
        }
    }
    stripVertices.push(FanVertices[0]);
    stripVertices.push(FanVertices[0]);
    return stripVertices
}

function stripSequenceForFanDrawTop(FanVertices){
    let stripVertices = [];
    let n = FanVertices.length;
    let x = 0;

    stripVertices.push(FanVertices[0]);
    stripVertices.push(FanVertices[0]);

    for(i=0;i<n;i++){
            stripVertices.push(FanVertices[x]);
            x = x + (((n-1)-i) * (-1)**i);
        }
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
    let zComponent = height/2;

    let bottomShapeVertices = calculateEllipseVertices (bottomDimension, bottomDimension, detailLevel);
    bottomShapeVertices.forEach(vertex => {
        vertex.z = zComponent;
    });

    let topShapeVertices = calculateEllipseVertices (topDimension, topDimension, detailLevel);
    topShapeVertices.forEach(vertex => {
        vertex.z = -zComponent;
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
        let cosAng1 = cos(angleCircle1);
        let sinAng1 = sin(angleCircle1);
        let cosAng2 = cos(angleCircle2);
        let sinAng2 = sin(angleCircle2);

        verticesCircle.forEach(vertex => {
            let x1 = (vertex.x + radiusWhole) * cosAng1;
            let y1 = vertex.y;
            let z1 = (vertex.x + radiusWhole) * sinAng1;

            let x2 = (vertex.x + radiusWhole) * cosAng2;
            let y2 = vertex.y;
            let z2 = (vertex.x + radiusWhole) * sinAng2;

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
        let angleCircle2 = angleCircle1 + angleStep;
        let cosAng1 = cos(angleCircle1);
        let sinAng1 = sin(angleCircle1);
        let cosAng2 = cos(angleCircle2);
        let sinAng2 = sin(angleCircle2);

        verticesCircle.forEach(vertex => {
            let x1 = vertex.x * sinAng1;
            let y1 = vertex.y * sinAng1;
            let z1 = radius * cosAng1;

            let x2 = vertex.x * sinAng2;
            let y2 = vertex.y * sinAng2;
            let z2 = radius * cosAng2;

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

    let angleStep = (TWO_PI/detailLevel);
    let heightStep = height/(loops*detailLevel);
    let radiusWholeStep = (radiusWholeEnd-radiusWholeStart)/(loops*detailLevel);
    let radiusTubeStep = (radiusTubeEnd-radiusTubeStart)/(loops*detailLevel);

    let bottomVerticesSequenced = [];
    let topVerticesSequenced= [];

    for (let i = 0; i < (loops * detailLevel); i++){
        let angleCircle1 = angleStep * i;
        let angleCircle2 = angleCircle1 + angleStep;
        let radiusStepW = i*radiusWholeStep;
        let radiusWhole1 = radiusWholeStart + radiusStepW;
        let radiusWhole2 = radiusWholeStart + radiusStepW + radiusWholeStep;
        let radiusStepT = i*radiusTubeStep; 
        let radiusTube1 = radiusTubeStart + radiusStepT;
        let radiusTube2 = radiusTubeStart + radiusStepT + radiusTubeStep;
        let verticesCircle1 = calculateEllipseVertices (radiusTube1, radiusTube1, detailLevel, true);
        let verticesCircle2 = calculateEllipseVertices (radiusTube2, radiusTube2, detailLevel, true);
        let cosAng1 = cos(angleCircle1);
        let sinAng1 = sin(angleCircle1);
        let cosAng2 = cos(angleCircle2);
        let sinAng2 = sin(angleCircle2);
        let height = heightStep*i;

        verticesCircle1.push({...verticesCircle1[0]});
        verticesCircle2.push({...verticesCircle2[0]});


        if(i === 0){
            verticesCircle1.forEach(vertex => {
                let x = (vertex.x + radiusWholeStart) * cosAng1;
                let y = vertex.y + height;
                let z = (vertex.x + radiusWholeStart) * sinAng1;

                bottomVertices.push(createVector(x,y,z));
            });
        }

        for (let j = 0; j < verticesCircle1.length; j++) {
            let vertex1 = verticesCircle1[j];
            let vertex2 = verticesCircle2[j];
    
            let x1 = (vertex1.x + radiusWhole1) * cosAng1;
            let y1 = vertex1.y + height;
            let z1 = (vertex1.x + radiusWhole1) * sinAng1;
    
            let x2 = (vertex2.x + radiusWhole2) * cosAng2;
            let y2 = vertex2.y + height + heightStep;
            let z2 = (vertex2.x + radiusWhole2) * sinAng2;
    
            sideVerticesSequenced.push(createVector(x1, y1, z1));
            sideVerticesSequenced.push(createVector(x2, y2, z2));
        }

        if(i === (detailLevel*loops)-1){
            verticesCircle2.forEach(vertex => {
                let x = (vertex.x + radiusWholeEnd) * cosAng2;
                let y = vertex.y + height + heightStep;
                let z = (vertex.x + radiusWholeEnd) * sinAng2;

                topVertices.push(createVector(x,y,z));
            });
        }
    }
    bottomVerticesSequenced = stripSequenceForFanDrawBottom(bottomVertices);
    topVerticesSequenced = stripSequenceForFanDrawTop(topVertices);
    verticesSnail = bottomVerticesSequenced.concat(sideVerticesSequenced, topVerticesSequenced);

    return verticesSnail;
}