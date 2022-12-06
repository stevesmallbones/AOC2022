const { readFileSync } = require('fs');
const { resolve } = require('path');
const { start } = require('repl');

const rawInput = readFileSync(resolve(__dirname, '6.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n')[0];
                            
/*---- PART 1---*/

console.log(cleanInput.length);

function hasUniques(array) {
    return (new Set(array)).size == array.length;
}

const findMarker = (datastream) => {
    let currentCharPos = 0;
    let currentBuffer = [];

    for (let i = 0; i < datastream.length; i++) {
        if (currentBuffer.length <= 3) {
            currentBuffer.push(datastream[i]);
        }
        else if (hasUniques(currentBuffer)) {
            currentCharPos = i;
            break;
        }
        else {
            currentBuffer.shift();
            currentBuffer.push(datastream[i]);
        }
    }
return currentCharPos;
}

console.log(findMarker(cleanInput));

/*---- PART 2---*/

const findMarker2 = (datastream) => {
    let currentCharPos = 0;
    let currentBuffer = [];

    for (let i = 0; i < datastream.length; i++) {
        if (currentBuffer.length <= 13) {
            currentBuffer.push(datastream[i]);
        }
        else if (hasUniques(currentBuffer)) {
            currentCharPos = i;
            break;
        }
        else {
            currentBuffer.shift();
            currentBuffer.push(datastream[i]);
        }
    }
return currentCharPos;
}

console.log(findMarker2(cleanInput));
