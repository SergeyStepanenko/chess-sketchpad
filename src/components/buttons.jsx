import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Buttons extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			buttonStatus: false
		};
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
		} = this.props;

		firebase.database().ref(`etudes/`).set({
			state
		});
	}

	render() {

		return (
			<div className='buttons'>
				<button
					disabled={!this.state.buttonStatus}
					className='save-chess-sketchpad'
					onClick={this.sendData}
					>Сохранить этюд
				</button>
				<input
					type="text"
					placeholder='Введите название этюда'
					value={this.state.value}
					onChange={this.handleInputChange}
				/>
			</div>
		);
	}
}

Buttons.propTypes = {
	state: PropTypes.object,
};

export default Buttons;
