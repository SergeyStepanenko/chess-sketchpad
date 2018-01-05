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
	onDrag: false,
	activeFigure: null,
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
let ordinalLetterNumber = 65; // A
for (let i = 0; i < 8; i++) {
	for (let j = 0; j < 8; j++) {
		STATE.cellIds.push(`${j + 1}${String.fromCharCode(ordinalLetterNumber)}`);
	}

	ordinalLetterNumber++;
}

// генерируем объект cells
let color = false;
STATE.cells = STATE.cellIds.reduce((res, acc, index) =>
({ ...res,
	[acc]: {
		id: acc,
		empty: true,
		figureId: null,
		white: index % 8 ? color = !color : color, // добавляем значение цвета (true = white, false = black )
	}
}), {});

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
STATE.figures = STATE.figureIds.reduce((res, acc, index) =>
({ ...res,
	[acc]: {
		id: acc,
		imageSrc: figuresSrcArr[index],
	}
}), {});

// задаем кол-во допустимых королей на доске
STATE.figures.kingB.quantity = 1;
STATE.figures.kingW.quantity = 1;

export default STATE;
