const { readFileSync } = require('fs');
const { resolve } = require('path');
const { start } = require('repl');

const rawInput = readFileSync(resolve(__dirname, '4.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n');

/*---- PART 1---*/

console.log(cleanInput);

function checkContainingSections(rawSections) {
    let firstSection = rawSections.split(',')[0];
    let firstSectionStart = parseInt(firstSection.split('-')[0]);
    let firstSectionEnd = parseInt(firstSection.split('-')[1]);

    let secondSection = rawSections.split(',')[1];
    let secondSectionStart = parseInt(secondSection.split('-')[0]);
    let secondSectionEnd = parseInt(secondSection.split('-')[1]);

    let hit = false;

    if (firstSectionStart <= secondSectionStart && firstSectionEnd >= secondSectionEnd) {
        // second fits within first
        hit = true;
    }
    else if (secondSectionStart <= firstSectionStart && secondSectionEnd >= firstSectionEnd) {
        // first fits within second
        hit = true;
    }

    return hit;
}

let sharedSections = 0;

cleanInput.map(x => {
    if (checkContainingSections(x)) {
        sharedSections++;
    }
})

console.log(sharedSections);

/*---- PART 2---*/

/*
.2345678..
..3456789.

start of second is between start and end of first
end of second is between start and end of first

start of first is between start and end of second
end of first is between start and end of second
*/

function checkOverlappingSections(rawSections) {
    let firstSection = rawSections.split(',')[0];
    let firstSectionStart = parseInt(firstSection.split('-')[0]);
    let firstSectionEnd = parseInt(firstSection.split('-')[1]);

    let secondSection = rawSections.split(',')[1];
    let secondSectionStart = parseInt(secondSection.split('-')[0]);
    let secondSectionEnd = parseInt(secondSection.split('-')[1]);

    let hit = false;

    // end of first is less than 


    if (secondSectionStart >= firstSectionStart && secondSectionStart <= firstSectionEnd) {
        // start of second is between start and end of first
        hit = true;
    }
    else if (secondSectionEnd >= firstSectionStart && secondSectionEnd <= firstSectionEnd) {
        // end of second is between start and end of first
        hit = true;
    }
    else if (firstSectionStart >= secondSectionStart && firstSectionStart <= secondSectionEnd) {
        // start of first is between start and end of second
        hit = true;
    }
    else if (firstSectionEnd >= secondSectionStart && firstSectionEnd <= secondSectionEnd) {
        // end of first is between start and end of second
        hit = true;
    }

    return hit;
}

let overlappingSections = 0;

cleanInput.map(x => {
    if (checkOverlappingSections(x)) {
        overlappingSections++;
    }
})

console.log(overlappingSections);