function findScreenBounds(vertices) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    
    vertices.forEach(vertex => {
        let screenCoords = screenPosition(2*vertex.x, 2*vertex.y, 2*vertex.z);
        
        minX = min(minX, screenCoords.x);
        maxX = max(maxX, screenCoords.x);
        minY = min(minY, screenCoords.y);
        maxY = max(maxY, screenCoords.y);
    });
    return { minX, maxX, minY, maxY };
}

function calculateScaleToFit(bounds, width, height) {
    let drawWidth = 0.9 * width;
    let drawHeight = 0.9 * height;

    let scaleMinX = (-drawWidth/2)/bounds.minX;
    let scaleMaxX = (drawWidth/2)/bounds.maxX;
    let scaleMinY = (-drawHeight/2)/bounds.minY;
    let scaleMaxY = (drawHeight/2)/bounds.maxY;
    
    let scaleX = min(scaleMinX,scaleMaxX);
    let scaleY = min(scaleMinY, scaleMaxY);

    return Math.min(scaleX, scaleY);
}

function createShapeInterface(){
    ShapeInterfaceWidth = 0;
    ShapeInterfaceHeight = 0;
    ShapeInterfaceDisplayWidth = 0;
    ShapeInterfaceDisplayHeight = 0;

        if(drawCircleFlag){
            createCircleInterface(triangles);
        }
        if(drawCylinderFlag){
            createCylinderInterface();
        }
        if(drawConeFlag){
            createConeInterface();
        }
        if(drawSphereFlag){
            createSphereInterface();
        }
        if(drawFrustumFlag){
            createFrustumInterface();
        }
        if(drawTorusFlag){
            createTorusInterface();
        }
        if(drawSnailFlag){
            createSnailInterface();
        }
}

function createCircleInterface(triangles){
    elements = 15
    ShapeInterfaceWidth = width;
    ShapeInterfaceHeight = height/elements;
    ShapeInterfaceDisplayWidth = 0.8*ShapeInterfaceWidth;
    ShapeInterfaceDisplayHeight = 0.8*ShapeInterfaceHeight;
    createPolygonCountSlider(elements,triangles);
}

function createPolygonCountSlider(elements, triangles){
    sliderWidth = ShapeInterfaceDisplayWidth;

    polygonCountSlider = createSlider(3, triangles, 1);
    polygonCountSlider.position(10, height/elements);
    polygonCountSlider.style('width', `${ShapeInterfaceDisplayWidth}px`);

    polygonCountLabel = createDiv('Number of Vertices of Base Polygon:');
    polygonCountLabel.position(5, height/elements);
    polygonCountLabel.style('color', '#000');

    polygonCountInput = createInput('3');
    polygonCountInput.position(1, height/elements);
    polygonCountInput.style('width', `${ShapeInterfaceDisplayWidth}px`);

    return { slider: polygonCountSlider, label: polygonCountSlider, display: polygonCountInput };
}

function createButtons(elements) {
    buttonWidth = 0.2 * width;
    buttonHeight = height-ShapeInterfaceHeight;
    buttonDisplayWidth = 0.8*buttonWidth;
    buttonDisplayHeight = 0.8*buttonHeight;

    const circle = createButton('Circle');
    circle.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-12)*(height/elements));
    circle.mousePressed(circleOn);

    const cylinder = createButton('Cylinder');
    cylinder.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-10)*(height/elements));
    cylinder.mousePressed(cylinderOn);

    const cone = createButton('Cone');
    cone.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-8)*(height/elements));
    cone.mousePressed(coneOn);

    const sphere = createButton('Sphere');
    sphere.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-6)*(height/elements));
    sphere.mousePressed(sphereOn);

    const frustum = createButton('Frustum');
    frustum.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-4)*(height/elements));
    frustum.mousePressed(frustumOn);

    const torus = createButton('Torus');
    torus.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements-2)*(height/elements));
    torus.mousePressed(torusOn);

    const snail = createButton('Snail');
    snail.position((buttonWidth-buttonDisplayWidth)/2, ShapeInterfaceHeight + (elements)*(height/elements));
    snail.mousePressed(snailOn);
}

function circleOn() {
    drawCircleFlag = !drawCircleFlag;

    if (drawCircleFlag){
        drawCylinderFlag = false;
        drawConeFlag = false;
        drawSphereFlag = false;
        drawFrustumFlag = false;
        drawTorusFlag = false;
        drawSnailFlag = false;
    }
}

function cylinderOn() {
    drawCylinderFlag = !drawCylinderFlag;

    if (drawCylinderFlag){
        drawCircleFlag = false;
        drawConeFlag = false;
        drawSphereFlag = false;
        drawFrustumFlag = false;
        drawTorusFlag = false;
        drawSnailFlag = false;
    }
}

function coneOn() {
    drawConeFlag = !drawConeFlag;

    if (drawConeFlag){
        drawCircleFlag = false;
        drawCylinderFlag = false;
        drawSphereFlag = false;
        drawFrustumFlag = false;
        drawTorusFlag = false;
        drawSnailFlag = false;
    }
}

function sphereOn() {
    drawSphereFlag = !drawSphereFlag;

    if (drawSphereFlag){
        drawCircleFlag = false;
        drawCylinderFlag = false;
        drawConeFlag = false;
        drawFrustumFlag = false;
        drawTorusFlag = false;
        drawSnailFlag = false;
    }
}

function frustumOn() {
    drawFrustumFlag = !drawFrustumFlag;

    if (drawFrustumFlag){
        drawCircleFlag = false;
        drawCylinderFlag = false;
        drawConeFlag = false;
        drawSphereFlag = false;
        drawTorusFlag = false;
        drawSnailFlag = false;
    }
}

function torusOn() {
    drawTorusFlag = !drawTorusFlag;

    if (drawTorusFlag){
        drawCircleFlag = false;
        drawCylinderFlag = false;
        drawConeFlag = false;
        drawSphereFlag = false;
        drawFrustumFlag = false;
        drawSnailFlag = false;
    }
}

function snailOn() {
    drawSnailFlag = !drawSnailFlag;

    if (drawSnailFlag){
        drawCircleFlag = false;
        drawCylinderFlag = false;
        drawConeFlag = false;
        drawSphereFlag = false;
        drawFrustumFlag = false;
        drawTorusFlag = false;
    }
}