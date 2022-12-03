import { readStringList } from "./lib/utils";

const filename = '../inputs/2';

enum RESULT {
  WIN,
  LOSE,
  DRAW,
};

enum PLAY {
  ROCK = RESULT.DRAW + 1,
  PAPER,
  SCISSORS,
}

const PLAY_MAP = {
  'A': PLAY.ROCK,
  'B': PLAY.PAPER,
  'C': PLAY.SCISSORS,
  'X': PLAY.ROCK,
  'Y': PLAY.PAPER,
  'Z': PLAY.SCISSORS,
}

const SCORE_MAP = {
  [PLAY.ROCK]:     1,
  [PLAY.PAPER]:    2,
  [PLAY.SCISSORS]: 3,
  [RESULT.WIN]:    6,
  [RESULT.LOSE]:   0,
  [RESULT.DRAW]:   3,
}

const PLAY_TO_STRING = {
  [PLAY.ROCK]: 'ROCK',
  [PLAY.PAPER]: 'PAPER',
  [PLAY.SCISSORS]: 'SCISSORS',
}

const RESULT_TO_STRING = {
  [RESULT.WIN]: 'WIN',
  [RESULT.LOSE]: 'LOSE',
  [RESULT.DRAW]: 'DRAW',
}

function playMapV2(opponentPlay: PLAY, myPlayChar: string): PLAY {
  const [ WIN, LOSE, DRAW ] = [ 'Z', 'X', 'Y' ];

  if (myPlayChar === DRAW) {
    return opponentPlay;
  }

  switch (opponentPlay) {
    case PLAY.ROCK:
      return myPlayChar === WIN ? PLAY.PAPER : PLAY.SCISSORS;
    case PLAY.PAPER:
      return myPlayChar === WIN ? PLAY.SCISSORS : PLAY.ROCK;
    case PLAY.SCISSORS:
      return myPlayChar === WIN ? PLAY.ROCK : PLAY.PAPER;
    default:
      throw new Error('Invalid play char given');
  }
}

function playRound(opponentPlay: PLAY, myPlay: PLAY): RESULT {
  if (myPlay === opponentPlay) {
    return RESULT.DRAW;
  }

  switch (myPlay) {
    case PLAY.ROCK:
      return opponentPlay === PLAY.SCISSORS ? RESULT.WIN : RESULT.LOSE;
    case PLAY.PAPER:
      return opponentPlay === PLAY.ROCK ? RESULT.WIN : RESULT.LOSE;
    case PLAY.SCISSORS:
      return opponentPlay === PLAY.PAPER ? RESULT.WIN : RESULT.LOSE;
    default:
      throw new Error('Invalid play given');
  }
}

function main() {
  const rounds = readStringList(filename);
  let myScore = 0;

  for (let round of rounds) {
    if (round.length < 1) {
      continue;
    }

    let [opponentChar, myPlayChar] = round.split(' ');
    const opponentPlay: PLAY = PLAY_MAP[opponentChar];

    // const myPlay: PLAY = PLAY_MAP[myPlayChar]; // part 1
    const myPlay: PLAY = playMapV2(opponentPlay, myPlayChar); // part 2

    const roundResult = playRound(opponentPlay, myPlay);

    console.log(`${PLAY_TO_STRING[myPlay]} vs ${PLAY_TO_STRING[opponentPlay]}: ${RESULT_TO_STRING[roundResult]}`);
    const scoreAdd = SCORE_MAP[myPlay] + SCORE_MAP[roundResult];
    console.log(`${SCORE_MAP[myPlay]} + ${SCORE_MAP[roundResult]} = ${scoreAdd} points`);
    myScore += (SCORE_MAP[myPlay] + SCORE_MAP[roundResult]);
  }

  console.log(`2-2: ${myScore}`);
}

main();