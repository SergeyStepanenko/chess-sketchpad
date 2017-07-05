import bishopB from '../../images/bishopB.png';
import bishopW from '../../images/bishopW.png';
import kingB from '../../images/kingB.png';
import kingW from '../../images/kingW.png';
import knightB from '../../images/knightB.png';
import knightW from '../../images/knightW.png';
import pawnB from '../../images/pawnB.png';
import pawnW from '../../images/pawnW.png';
import queenB from '../../images/queenB.png';
import queenW from '../../images/queenW.png';
import rookB from '../../images/rookB.png';
import rookW from '../../images/rookW.png';

const state = {
	cellIds: [],
	cells: {},
};

const figuresSrcArr = [
	kingB,
	queenB,
	rookB,
	bishopB,
	knightB,
	pawnB,
	kingW,
	queenW,
	rookW,
	bishopW,
	knightW,
	pawnW,
];

state.figureIds = [
	'kingB',
	'queenB',
	'rookB',
	'bishopB',
	'knightB',
	'pawnB',
	'kingW',
	'queenW',
	'rookW',
	'bishopW',
	'knightW',
	'pawnW',
];

let letter = 65; // A
for (let i = 0; i < 8; i++) {

	for (let j = 0; j < 8; j++) {
		state.cellIds.push(`${j + 1}${String.fromCharCode(letter)}`);
	}

	letter++;
}

for (let i = 0; i < state.cellIds.length; i++) {
	state.cells[state.cellIds[i]] = {
		id: state.cellIds[i],
		empty: true,
		figureId: null,
	};
}

let color = false;
for (let i = 0; i < state.cellIds.length; i++) {

	if ((i % 8)) {
		color = !color;
	}

	state.cells[state.cellIds[i]].white = color;
}

state.figures = {};

for (let i = 0; i < state.figureIds.length; i++) {
	state.figures[state.figureIds[i]] = {
		id: state.figureIds[i],
		imageSrc: figuresSrcArr[i]
	};
}

state.onDrag = false;
state.activeFigure = null;
state.figures.kingB.quantity = 1;
state.figures.kingW.quantity = 1;
// console.log(state);
export default state;
