import React from 'react';
import Draggable from 'react-draggable';

import '../styles/index.scss';
import kingW from './images/kingW.png';
import queenW from './images/queenW.png';
import bishopW from './images/bishopW.png';
import knightW from './images/knightW.png';
import rookW from './images/rookW.png';
import pawnW from './images/pawnW.png';
import kingB from './images/kingB.png';
import queenB from './images/queenB.png';
import bishopB from './images/bishopB.png';
import knightB from './images/knightB.png';
import rookB from './images/rookB.png';
import pawnB from './images/pawnB.png';

export default class App extends React.Component {
	constructor() {
		super();

		this.dragObject = {};

		this.state = {
			cellIds: [
				'1A',
				'1B',
				'1C',
				'1D',
				'1E',
				'1F',
				'1H'
			],
			cells: {
				'1A': {
					id: '1A',
					empty: true,
					figureId: null,
					color: 'white',
				},
				'1B': {
					id: '1B',
					empty: 'true',
					figureId: null,
					color: 'white',
				},
				'1C': {
					id: '1C',
					empty: true,
					figureId: null,
					color: 'white',
				}
			},
			figureIds: [
				'Knight',
				'King',
				'Queen'
			],
			figures: {
				knight: {
					id: 'knight',
					imageSrc: knightW,
					figureColor: 'white',
					count: 1,
				},
				king: {
					id: 'king',
					imageSrc: kingB,
					figureColor: 'black',
					count: 1,
				},
				queen: {
					id: 'queen',
					imageSrc: queenW,
					figureColor: 'white',
					count: 1,
				},
			},
			onDrag: false,
			activeFigure: null,
		};

		console.log('hi');
	}


	// onDragEnd = (e) => {
	// 	this.setState({
	// 		position: {
	// 			transform: `translate(${e.clientX - 262}px, ${e.clientY - 233}px)`
	// 		}
	// 	});
	// }
	//
	// onDrag = (e) => {
	// 	e.persist()
	// 	console.log('start');
	// 	// e.preventDefault();
	// 	// e.stopPropagation();
	// 	this.setState({
	// 		position: {
	// 			transform: `translate(${e.clientX - 262}px, ${e.clientY - 233}px)`
	// 		}
	// 	})
	// }

	createAvatar = (e) => {
		// запомнить старые свойства, чтобы вернуться к ним при отмене переноса
		const avatar = this.dragObject.elem;
		const old = {
			parent: avatar.parentNode,
			nextSibling: avatar.nextSibling,
			position: avatar.position || '',
			left: avatar.left || '',
			top: avatar.top || '',
			zIndex: avatar.zIndex || ''
		};

		// функция для отмены переноса
		avatar.rollback = function() {
			old.parent.insertBefore(avatar, old.nextSibling);
			avatar.style.position = old.position;
			avatar.style.left = old.left;
			avatar.style.top = old.top;
			avatar.style.zIndex = old.zIndex
		};

		return avatar;
	}

	startDrag = (e) => {
		const avatar = this.dragObject.avatar;

		document.body.appendChild(avatar);
		avatar.style.zIndex = 9999;
		avatar.style.position = 'absolute';

// debugger;
	}

	cloneNode = (node, parent) => {
		const clone = node.cloneNode(true);
		clone.setAttribute('test', 'lol');
		parent.appendChild(clone);
	}

	mouseDownEventHandler = (e) => {
		// e.persist()

		if (e.nativeEvent.which != 1) { // если клик правой кнопкой мыши
			return; // то он не запускает перенос
		}

		const elem = e.target.closest('.draggable');
		if (!elem) return; // не нашли, клик вне draggable-объекта

		if (e.target.parentNode.parentNode.classList[0] !== 'board') {
			const parentNode = e.target.closest('.draggable').parentNode;
			this.cloneNode(elem, parentNode);
		};

		debugger;

		// запомнить переносимый объект
		this.dragObject.elem = elem;

		// запомнить координаты, с которых начат перенос объекта
		this.dragObject.downX = e.pageX;
		this.dragObject.downY = e.pageY;
	}

	mouseMoveEventHandler = (e) => {
		if (!this.dragObject.elem) return; // элемент не зажат
		if ( !this.dragObject.avatar ) { // если перенос не начат...

		// посчитать дистанцию, на которую переместился курсор мыши
		const moveX = e.pageX - this.dragObject.downX;
		const moveY = e.pageY - this.dragObject.downY;
		if ( Math.abs(moveX) < 3 && Math.abs(moveY) < 3 ) {
			return; // ничего не делать, мышь не передвинулась достаточно далеко
		}

		this.dragObject.avatar = this.createAvatar(e); // захватить элемент
		if (!this.dragObject.avatar) {
			this.dragObject = {}; // аватар создать не удалось, отмена переноса

			return; // возможно, нельзя захватить за эту часть элемента
		}

		// аватар создан успешно
		// создать вспомогательные свойства shiftX/shiftY
		const coords = this.getCoords(this.dragObject.avatar);
		this.dragObject.shiftX = this.dragObject.downX - coords.left;
		this.dragObject.shiftY = this.dragObject.downY - coords.top;

		this.startDrag(e); // отобразить начало переноса
		}

		// отобразить перенос объекта при каждом движении мыши
		this.dragObject.avatar.style.left = e.pageX - this.dragObject.shiftX + 'px';
		this.dragObject.avatar.style.top = e.pageY - this.dragObject.shiftY + 'px';

		return false;
	}

	mouseUpEventHandler = (e) => {
		// (1) обработать перенос, если он идет
		if (this.dragObject.avatar) {
			const element = document.body.removeChild(this.dragObject.avatar);
			this.finishDrag(e, element);
		}

		// в конце mouseup перенос либо завершился, либо даже не начинался
		// (2) в любом случае очистим "состояние переноса" dragObject
		this.dragObject = {};
	}

	finishDrag = (e, element) => {
		const dropElem = this.findDroppable(e);

		if (dropElem && dropElem.children.length === 0) {
			element.style.left = '';
			element.style.top = '';
			dropElem.appendChild(element);
		} else {
			// this.onDragEnd(this.dragObject, dropElem);
		}
	}

	getCoords = (elem) => { // кроме IE8-
		const box = elem.getBoundingClientRect();

		return {
			top: box.top + pageYOffset,
			left: box.left + pageXOffset
		};
	}

	findDroppable = (e) => {
		// спрячем переносимый элемент
	    this.dragObject.avatar.hidden = true;

	    // получить самый вложенный элемент под курсором мыши
	    const elem = document.elementFromPoint(e.clientX, e.clientY);

	    // показать переносимый элемент обратно
	    this.dragObject.avatar.hidden = false;

	    if (elem == null) {
	      // такое возможно, если курсор мыши "вылетел" за границу окна
	      return null;
	    }

	    return elem.closest('.droppable');
	}

	render() {
		return (
			<div
				className='container'
				onMouseDown={this.mouseDownEventHandler}
				onMouseMove={this.mouseMoveEventHandler}
				onMouseUp={this.mouseUpEventHandler}
				>
				<div className='lettersOnTopAndBottom'>
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
						<li>F</li>
						<li>G</li>
						<li>H</li>
					</ul>
				</div>
				<div className='wrapper'>
					<div className='chess-figures'>
						<div className='cell' id='test'>
							<img className='chessFigure draggable' src={kingW}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={queenW}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={bishopW}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={knightW}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={rookW}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={pawnW}></img>
						</div>
					</div>
					<div className='digitsOnTheSide'>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
						</ul>
					</div>
					<div className='board'>
						<div id='A1' className='white droppable'></div>
						<div id='B1' className="black droppable"></div>
						<div id='C1' className="white droppable"></div>
						<div id='D1' className='black droppable'></div>
						<div id='E1' className='white droppable'></div>
						<div id='F1' className='black droppable'></div>
						<div id='G1' className='white droppable'></div>
						<div id='H1' className='black droppable'></div>

						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>

						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>

						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>

						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>

						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>


						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>

						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
						<div id='' className='black droppable'></div>
						<div id='' className='white droppable'></div>
					</div>
					<div className='digitsOnTheSide'>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
							<li>4</li>
							<li>5</li>
							<li>6</li>
							<li>7</li>
							<li>8</li>
						</ul>
					</div>
					<div className='chess-figures'>
						<div className='cell'>
							<img className='chessFigure draggable' src={kingB}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={queenB}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={bishopB}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={knightB}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={rookB}></img>
						</div>
						<div className='cell'>
							<img className='chessFigure draggable' src={pawnB}></img>
						</div>
					</div>
				</div>
				<div className='lettersOnTopAndBottom'>
					<ul>
						<li>A</li>
						<li>B</li>
						<li>C</li>
						<li>D</li>
						<li>E</li>
						<li>F</li>
						<li>G</li>
						<li>H</li>
					</ul>
				</div>
			</div>
		);
	}
}
