/* function calculateDetailLevel(DetailModifier, canvasWidth, canvasHeight, numVertices, numTriangles = 0, is3D = false) {
    const baseDetail = 100 * DetailModifier;
    const areaNormalizationFactor = (canvasWidth * canvasHeight) / (1920 * 1080);
    let complexity;

    if (is3D) {
        complexity = numTriangles;
        complexity *= 1.5;
    } else {
        complexity = numVertices;
    }

    complexity *= Math.sqrt(areaNormalizationFactor);

    let detailLevel = Math.max(20, baseDetail - complexity);
    return Math.floor(detailLevel);
} */