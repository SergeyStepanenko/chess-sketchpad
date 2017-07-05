import React, { Component } from 'react';
import PropTypes from 'prop-types';

const database = firebase.database();
const rootRef = database.ref('/');

class Etude extends Component {
	constructor() {
		super();

		// this.state = {
		// 	style: ''
		// };

	}

	updateState = (event) => {
		const {updateState} = this.props;

		rootRef.on('value', (snap) => {
			const obj = snap.val();
			updateState(obj[event.target.innerHTML].state);
		});

		// this.addStyleToClickedBtn();
	}

	// addStyleToClickedBtn = () => {
	// 	this.setState({
	// 		style: '1px solid #3c3c3c'
	// 	});
	// }

	render() {
		const {
			name,
		} = this.props;

		return (
			<li
				className='etude-item'
				onClick={this.updateState}
				// style={{border: this.state.style}}
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
