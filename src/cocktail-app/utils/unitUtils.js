import Fraction from "fraction.js"

export const units = ["oz","tbsp","tsp","mL","dash","drops"]
//conversion matrix
//from\to
const convert = {
    //cup: {cup:1, oz:8, tbsp:16, tsp:48, mL:236.588, dash:384, drops: 4608},
    oz: {/* cup:.125, */ oz:1, tbsp:2, tsp:6, mL:29.5735, dash:48, drops:576},
    tbsp: {/* cup:.0625, */ oz:.5, tbsp:1, tsp:3, mL:14.7868, dash:24, drops:288},
    tsp: {/* cup:1/48, */ oz:1/6, tbsp:1/3, tsp:1, mL:4.92892, dash:8, drops:96},
    mL: {/* cup:.00422675, */ oz:.033814, tbsp:.067628, tsp:.202884, mL:1, dash:1.62307, drops:20},
    dash: {/* cup:1/384, */ oz:1/48, tbsp:1/24, tsp:1/8, mL:.616116, dash:1, drops:12},
    drops: {/* cup:1/4608, */ oz:1/576, tbsp:1/288, tsp:1/96, mL:.05, dash:1/12, drops:1}
}

export function convertUnits(decimalValue, inputUnits, outputUnits){

    if(!convert[inputUnits]) throw new Error("invalid input units: " + String(inputUnits))
    if(!convert[outputUnits]) throw new Error("Invalid output units: " + String(outputUnits))

    return decimalValue * convert[inputUnits][outputUnits]
}

export function getClosestFraction(decimalValue) {
    //return early if whole number
    if(Number.isInteger(decimalValue)) return decimalValue

    //start with whole number
    let bestFraction = new Fraction(Math.round(decimalValue));
    let minError = Math.abs(bestFraction.valueOf() - decimalValue);

    //allowed denominators
    [2, 3, 4, 8, 16, 32].forEach(d => {
        //only allow fractions smaller than 1/8 if the current best fraction is 0
        if(d <= 8 || bestFraction.valueOf()==0){
            // Create a fraction for this specific denominator
            let f = new Fraction(Math.round(decimalValue * d), d);
            
            // Calculate the distance/error
            let error = Math.abs(f.valueOf() - decimalValue);
            
            if (error < minError ) {
                minError = error;
                bestFraction = f;
            }
        }
    });

    return bestFraction.toFraction(true);
}
