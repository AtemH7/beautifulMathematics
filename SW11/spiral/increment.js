function calculateInitialIncrement(maxRadius, totalPoints, powerScale) {
    let low = 0;
    let high = maxRadius;
    let precision = 0.000001;  // Fine-tune precision as needed
    let bestL = 0;

    while (high - low > precision) {
        let mid = (low + high) / 2;
        let r = 0;

        // Simulate the spiral development up to totalSteps
        for (let i = 0; i < totalPoints+1; i++) {
            r = (r + mid)**powerScale;
            if (r >= maxRadius) {
                break;
            }
        }

        if (Math.abs(r - maxRadius) < precision) {
            bestL = mid;
            break;  // Found a suitable l
        } else if (r > maxRadius) {
            high = mid;  // Too high, reduce mid
        } else {
            low = mid;  // Too low, increase mid
        }
    }

    return bestL;
}
