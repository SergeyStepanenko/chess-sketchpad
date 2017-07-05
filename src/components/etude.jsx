import React, { Component } from 'react';
import PropTypes from 'prop-types';

const database = firebase.database();
const rootRef = database.ref('/');

class Etude extends Component {

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

Etude.propTypes = {
	name: PropTypes.string,
	updateState: PropTypes.func,
};

export default Etude;
