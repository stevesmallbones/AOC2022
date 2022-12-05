const { readFileSync } = require('fs');
const { resolve } = require('path');
const { start } = require('repl');

const rawInput = readFileSync(resolve(__dirname, '5.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .split('\n');
                            
/*---- PART 1---*/

function buildStacks(raw) {
    let stacks = [];
    stacks[0] = '';
    raw.map(x => {
        if (x.includes('[')) {
        let cleanX = x.replaceAll('    ', '-').replaceAll('[', '').replaceAll(']','').replaceAll(' ', '');

        for (let i = 0; i < cleanX.length; i++ ) {
            if (cleanX[i] != '-') {
                if (!stacks[i+1]) { stacks[i+1] = [] };
                stacks[i+1].unshift(cleanX[i]);
            }
        }
        }
    })
    return stacks;
}

function getMoves(raw) {
    let moves = [];
    raw.map(x => {
        if (x.charAt(0) == 'm') {
            moves.push(x.match(/\d+/gi));
        }
    })
    return moves;
}

function handleMoves9000(count, startStackNum, endStackNum, stackArray ) {
    for (let i = 0; i < count; i++) {
        let letterToMove = stackArray[startStackNum].pop();
        stackArray[endStackNum].push(letterToMove);
       // console.log("moving: " + letterToMove + " from " + startStackNum + " to " + endStackNum);
    }
    return stackArray;
}

function getResult(finishedStacks) {
    let result = [];
    finishedStacks.reduce((resultArray, x, index) => {
        if (index >= 1) {
                result.push(x.pop());
        }
    })
    return result;
}

function Do1(){

    let stacksArray = buildStacks(cleanInput);
    let movesArray = getMoves(cleanInput);

    movesArray.map( x => {
        handleMoves9000(x[0], x[1], x[2], stacksArray);
    })

    console.log("PART 1: " + getResult(stacksArray).toString().replaceAll(',', ''));

};
Do1();
/*---- PART 2---*/

function handleMoves9001(count, startStackNum, endStackNum, stackArray ) {
    let tempValues = [];

    for (let i = 0; i < count; i++) {
        tempValues.push(stackArray[startStackNum][stackArray[startStackNum].length-1]);
        stackArray[startStackNum].pop();
    }
    let tempValuesOrdered = tempValues.reverse();
    stackArray[endStackNum].push(...tempValuesOrdered);

    return stackArray;
}

function Do2(){

    let stacksArray = buildStacks(cleanInput);
    let movesArray = getMoves(cleanInput);

    movesArray.map( x => {
        handleMoves9001(x[0], x[1], x[2], stacksArray);
    })

    console.log("PART 2: " + getResult(stacksArray).toString().replaceAll(',', ''));

};
Do2();