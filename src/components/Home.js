import React, { Component } from 'react';
import Map from './Map';

class Home extends Component {

	render() {
		return(
			<div>
				<Map
					google={this.props.google}
					center={{lat: 47.6062095, lng: -122.3320708}}
					height='300px'
					zoom={15}
				/>
			</div>
		);
	}
}

export default Home;