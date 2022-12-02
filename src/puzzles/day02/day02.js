const { readFileSync } = require('fs');
const { resolve } = require('path');

const rawInput = readFileSync(resolve(__dirname, '2.txt'), 'utf8');
const cleanInput = rawInput.toString()
                            .trim()
                            .split('\n');

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
// The score for a single round is the score for the shape you selected (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the outcome of the round (0 if you lost, 3 if the round was a draw, and 6 if you won)

/*---- PART 1---*/

let totalScore = 0;
let shapeScore = 0;

cleanInput.map(x => {
    let myShape = x[2];
    let opponentShape = '';

    // converting to common letters so easier to do comparison
    if (x[0] == 'A') { opponentShape = 'X'; }
    else if (x[0] == 'B') { opponentShape = 'Y'; }
    else { opponentShape = 'Z'; }
    
    // Calculate shape score
    if (myShape == 'X') { //Rock
        shapeScore += 1;
    }
    else if (myShape == 'Y') { //Paper
        shapeScore += 2;
    }
    else if (myShape == 'Z') {
        shapeScore += 3;
    }

    // Calculate outcome score
    if (myShape == opponentShape) {
        totalScore += 3;
    }
    else if (myShape == 'X' && opponentShape == 'Z') { // Rock vs Scissors
        totalScore += 6;
    }
    else if (myShape == 'Y' && opponentShape == 'X'){ // Paper vs Rock
        totalScore += 6;
    }
    else if (myShape == 'Z' && opponentShape == 'Y') { // Scissors vs Paper
        totalScore += 6;
    }
});

console.log(shapeScore + totalScore);

/*---- PART 2---*/
// (1 for Rock, 2 for Paper, and 3 for Scissors)
let scoresArray = {
    'A X': 3, // Rock, lose (Scissors)
    'B X': 1, // Paper, lose (Rock)
    'C X': 2, // Scissors, lose (Paper)
    'A Y': 4, // Rock, draw
    'B Y': 5, // Paper, draw
    'C Y': 6, // Scissors, draw
    'A Z': 8, // Rock, win (Paper)
    'B Z': 9, // Paper, win (Scissors)
    'C Z': 7, // Scissors, win (Rock)
};

let totalScore_2 = 0;

cleanInput.map(x => {
    totalScore_2 += scoresArray[x];
})
console.log(totalScore_2);