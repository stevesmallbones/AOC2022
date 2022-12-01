const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, '1.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n');
/*---- PART 1---*/

let elfCaloriesArray = [];
let elfIndex = 0;
let calCount = 0;

cleanInput.map(x => {
    let cals = parseInt(x, 10);
    if (isNaN(cals)) {
        // reached the end of this elf
        // store the value
        elfCaloriesArray[elfIndex] = calCount;

        // reset calorie count and iterate index to the next elf
        calCount = 0;
        elfIndex = elfIndex + 1;
    }
    else {
        // We're still finding food, add this elves food to the calorie count
        calCount += cals;
    }
})

console.log(Math.max(...elfCaloriesArray));

/*---- PART 2---*/

let orderedCaloriesArray = elfCaloriesArray.sort((a,b)=>b-a);

console.log(orderedCaloriesArray[0] + orderedCaloriesArray[1] + orderedCaloriesArray[2]);