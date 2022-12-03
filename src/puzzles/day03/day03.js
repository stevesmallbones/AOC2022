const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, '3.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n');

/*---- PART 1---*/

const letterPriorityMap = '0abcdefghijklmnopqrstuvwxyz';

const calculatePriority = (letter) => {
    let isUpperCase = (letter == letter.toUpperCase() ? true : false);
    let letterForcedLowerCase = letter.toLowerCase();
    
    return (isUpperCase ? letterPriorityMap.indexOf(letterForcedLowerCase)+26 : letterPriorityMap.indexOf(letter))
}

let matchedItems = [];
let priorityTotal = 0;

cleanInput.map(x => {

    let compartmentSizes = x.length/2;
    let firstCompartment = x.substring(0, compartmentSizes);
    let secondCompartment = x.substring(compartmentSizes, x.length);

    for (c of secondCompartment) {
        if (firstCompartment.includes(c)) {
            matchedItems.push(c);
            break;
        }
    }
})

matchedItems.map(x => {
    priorityTotal += calculatePriority(x);
})

console.log(priorityTotal);

/*---- PART 2---*/

let matchedItems_2 = [];
let priorityTotal_2 = 0;

const groups = cleanInput.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index/3)

    if(!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
    
      resultArray[chunkIndex].push(item)
    
      return resultArray
}, [])

groups.map(x => {
    let firstElf = x[0];
    let firstMatch = [];
    
    for (c of x[1]) {
        if (firstElf.includes(c)) {
            firstMatch.push(c);
        }
    }
    for (c of x[2]) {
        if (firstMatch.includes(c)) {
            matchedItems_2.push(c);
            break;
        }
    }
})

matchedItems_2.map(x => {
    priorityTotal_2 += calculatePriority(x);
})

console.log(priorityTotal_2);