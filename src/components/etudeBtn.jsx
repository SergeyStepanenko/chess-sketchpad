import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* eslint-disable */
const database = firebase.database();
const rootRef = database.ref('/');
/* eslint-enable */
class EtudeBtn extends Component {

	updateState = (event) => {
		const {updateState} = this.props;

		rootRef.on('value', (snap) => {
			const obj = snap.val();
			updateState(obj[event.target.innerHTML].state);
		});
	}

	render() {
		const {
			name,
		} = this.props;

		return (
			<li
				className='etude-item'
				onClick={this.updateState}
			>
				{name}
			</li>
		);
	}
}

EtudeBtn.propTypes = {
	name: PropTypes.string,
	updateState: PropTypes.func,
};

export default EtudeBtn;
