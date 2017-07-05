import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Etude from './etude.jsx';

const database = firebase.database();
const rootRef = database.ref('/');
let FIREBASEDATA = [];

class Buttons extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			buttonStatus: false,
			etudesList: []
		};
	}

	componentDidMount() {
		rootRef.on('value', (snap) => {
			const Obj = snap.val();

			FIREBASEDATA = [];

			for (const x in Obj) {
				if (Object.prototype.hasOwnProperty.call(Obj, x)) {
					FIREBASEDATA.push(x);
				}
			}

			this.setState({
				etudesList: FIREBASEDATA,
			});
		});
	}

	handleInputChange = (event) => {
		const value = event.target.value;

		this.setState({
			value: value
		});

		if (value.replace(/\s/g, '').length) {
			this.setState({
				buttonStatus: true
			});
		} else {
			this.setState({
				buttonStatus: false
			});
		}
	}

	sendData = () => {
		const {
			state,
			// updateState,
		} = this.props;

		firebase.database().ref(`${this.state.value}`).set({
			state
		});
	}

	render() {
		const {updateState} = this.props;

		return (
			<div className='buttons-container'>
				<button
					disabled={!this.state.buttonStatus}
					className='save-chess-sketchpad'
					onClick={this.sendData}
					>Сохранить этюд
				</button>
				<input
					className='input'
					type="text"
					placeholder='Введите название этюда'
					value={this.state.value}
					onChange={this.handleInputChange}
				/>
				<ul>
					<h3>Сохраненные этюды</h3>
					{ this.state.etudesList.map((name, index) => {
						return (
							<Etude
								key={index}
								name={name}
								updateState={updateState}
							/>
						);
					}) }
				</ul>
			</div>
		);
	}
}

Buttons.propTypes = {
	state: PropTypes.object,
	updateState: PropTypes.func
};

export default Buttons;
