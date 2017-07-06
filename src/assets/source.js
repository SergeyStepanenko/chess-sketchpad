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

const STATE = {
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

// генерируем id для доски А1 -> B2 -> и т.д.
let letter = 65; // A
for (let i = 0; i < 8; i++) {

	for (let j = 0; j < 8; j++) {
		STATE.cellIds.push(`${j + 1}${String.fromCharCode(letter)}`);
	}

	letter++;
}
// генерируем объект cells
for (let i = 0; i < STATE.cellIds.length; i++) {
	STATE.cells[STATE.cellIds[i]] = {
		id: STATE.cellIds[i],
		empty: true,
		figureId: null,
	};
}
// добавляем в объект cell значение цвета (white = true, black = false)
let color = false;
for (let i = 0; i < STATE.cellIds.length; i++) {

	if ((i % 8)) {
		color = !color;
	}

	STATE.cells[STATE.cellIds[i]].white = color;
}

// создаем объект фигурок с id и путем до картинок
STATE.figureIds = [
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

STATE.figures = {};

for (let i = 0; i < STATE.figureIds.length; i++) {
	STATE.figures[STATE.figureIds[i]] = {
		id: STATE.figureIds[i],
		imageSrc: figuresSrcArr[i]
	};
}

STATE.onDrag = false;
STATE.activeFigure = null;

// задаем кол-во допустимых королей на доске
STATE.figures.kingB.quantity = 1;
STATE.figures.kingW.quantity = 1;

export default STATE;
