import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps"; //InfoWindow can be used for showing name as tooltip
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { GoogleMapsAPI } from '../client-config';
Geocode.setApiKey( GoogleMapsAPI );
Geocode.enableDebug();

class Map extends Component{

	constructor( props ){
		super( props );
		this.state = {
			address: '',
			city: '',
			area: '',
			state: '',
			country: '',
			zipcode: '',
			mapPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			},
			markerPosition: {
				lat: this.props.center.lat,
				lng: this.props.center.lng
			}
		}
	}
	/**
	 * Get the current address from the default map position and set those values in the state
	 */
	componentDidMount() {
		Geocode.fromLatLng( this.state.mapPosition.lat , this.state.mapPosition.lng ).then(
			response => {
				const address = response.results[0].formatted_address,
				      addressArray =  response.results[0].address_components,
				      city = this.getCity( addressArray ),
				      area = this.getArea( addressArray ),
				      state = this.getState( addressArray ),
					  country = this.getCountry( addressArray ),
					  zipcode = this.getZipCode( addressArray );
				
				this.setState( {
					address: ( address ) ? address : '',
					area: ( area ) ? area : '',
					city: ( city ) ? city : '',
					state: ( state ) ? state : '',
					country: ( country ) ? country : '',
					zipcode: ( zipcode ) ? zipcode : '',
				} )
			},
			error => {
				console.error( error );
			}
		);
	};
	/**
	 * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
	 *
	 * @param nextProps
	 * @param nextState
	 * @return {boolean}
	 */
	shouldComponentUpdate( nextProps, nextState ){
		if (
			this.state.markerPosition.lat !== this.props.center.lat ||
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state ||
			this.state.country !== nextState.country
		) {
			return true
		} else if ( this.props.center.lat === nextProps.center.lat ){
			return false
		}
	}
	/**
	 * Get the city and set the city input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCity = ( addressArray ) => {
		let city = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0] && 'administrative_area_level_2' === addressArray[ i ].types[0] ) {
				city = addressArray[ i ].long_name;
				return city;
			}
		}
	};
	/**
	 * Get the area and set the area input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getArea = ( addressArray ) => {
		let area = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'sublocality_level_1' === addressArray[ i ].types[j] || 'locality' === addressArray[ i ].types[j] ) {
						area = addressArray[ i ].long_name;
						return area;
					}
				}
			}
		}
	};
	/**
	 * Get the address and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getState = ( addressArray ) => {
		let state = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'administrative_area_level_1' === addressArray[ i ].types[0] ) {
					state = addressArray[ i ].long_name;
					return state;
				}
			}
		}
	};

	/**
	 * Get the country and set the address input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getCountry = ( addressArray ) => {
		let country = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			for( let i = 0; i < addressArray.length; i++ ) {
				if ( addressArray[ i ].types[0] && 'country' === addressArray[ i ].types[0] ) {
					country = addressArray[ i ].long_name;
					return country;
				}
			}
		}
	};
		/**
	 * Get the zipcode and set the zipcode input value to the one selected
	 *
	 * @param addressArray
	 * @return {string}
	 */
	getZipCode = ( addressArray ) => {
		let zipcode = '';
		for( let i = 0; i < addressArray.length; i++ ) {
			if ( addressArray[ i ].types[0]  ) {
				for ( let j = 0; j < addressArray[ i ].types.length; j++ ) {
					if ( 'postal_code' === addressArray[ i ].types[j]) {
						zipcode = addressArray[ i ].long_name;
						return zipcode;
					}
				}
			}
		}
	};
	/**
	 * And function for city,state and address input
	 * @param event
	 */
	onChange = ( event ) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	/**
	 * This Event triggers when the marker window is closed
	 *
	 * @param event
	 */
	onInfoWindowClose = ( event ) => {

	};

	/**
	 * When the marker is dragged you get the lat and long using the functions available from event object.
	 * Use geocode to get the address, city, area and state from the lat and lng positions.
	 * And then set those values in the state.
	 *
	 * @param event
	 */
	// onMarkerDragEnd = ( event ) => {
	// 	let newLat = event.latLng.lat(),
	// 	    newLng = event.latLng.lng();

	// 	Geocode.fromLatLng( newLat , newLng ).then(
	// 		response => {
	// 			const address = response.results[0].formatted_address,
	// 			      addressArray =  response.results[0].address_components,
	// 			      city = this.getCity( addressArray ),
	// 			      area = this.getArea( addressArray ),
	// 			      state = this.getState( addressArray ),
	// 				  country = this.getCountry( addressArray ),
	// 				  zipcode = this.getZipCode( addressArray );

	// 			this.setState( {
	// 				address: ( address ) ? address : '',
	// 				area: ( area ) ? area : '',
	// 				city: ( city ) ? city : '',
	// 				state: ( state ) ? state : '',
	//				country: ( country ) ? country : '',
	// 				zipcode: ( zipcode ) ? zipcode : '',
	// 				markerPosition: {
	// 					lat: newLat,
	// 					lng: newLng
	// 				},
	// 				mapPosition: {
	// 					lat: newLat,
	// 					lng: newLng
	// 				},
	// 			} )
	// 		},
	// 		error => {
	// 			console.error(error);
	// 		}
	// 	);
	// };

	/**
	 * When the user types an address in the search box
	 * @param place
	 */
	onPlaceSelected = ( place ) => {

		console.log( 'Data', place );

		const address = place.formatted_address,
		      addressArray =  place.address_components,
		      city = this.getCity( addressArray ),
		      area = this.getArea( addressArray ),
		      state = this.getState( addressArray ),
			  country = this.getCountry( addressArray ),
			  zipcode = this.getZipCode( addressArray ),
		      latValue = place.geometry.location.lat(),
		      lngValue = place.geometry.location.lng();
		// Set these values in the state.
		this.setState({
			address: ( address ) ? address : '',
			area: ( area ) ? area : '',
			city: ( city ) ? city : '',
			state: ( state ) ? state : '',
			country: ( country ) ? country : '',
			zipcode: ( zipcode ) ? zipcode : '',
			markerPosition: {
				lat: latValue,
				lng: lngValue
			},
			mapPosition: {
				lat: latValue,
				lng: lngValue
			},
		})
	};


	render(){
		const AsyncMap = withScriptjs(
			withGoogleMap(
				props => (
					<GoogleMap google={ this.props.google }
					           defaultZoom={ this.props.zoom }
					           defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
							   options={{ gestureHandling: "none", keyboardShortcuts: false , scrollwheel: false,zoomControl: false,fullscreenControl: false,disableDefaultUI: true }}
					>
						{/* InfoWindow on top of marker */}
						{/* <InfoWindow
							onClose={this.onInfoWindowClose}
							position={{ lat: ( this.state.markerPosition.lat + 0.0018 ), lng: this.state.markerPosition.lng }}
						>
							<div>
								<span style={{ padding: 0, margin: 0 }}>{ this.state.address }</span>
							</div>
						</InfoWindow> */}
						{/*Marker*/}
						<Marker google={this.props.google}
						        draggable={false}
						        // onDragEnd={ this.onMarkerDragEnd }
						        position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
						/>
						<Marker />
						{/* For Auto complete Search Box */}
						<Autocomplete
							style={{
								width: '100%',
								height: '40px',
								paddingLeft: '16px',
								marginTop: '2px',
								marginBottom: '100px'
							}}
							defaultValue={this.state.address}
							onPlaceSelected={ this.onPlaceSelected }
							types={[]}
						/>
					</GoogleMap>
				)
			)
		);
		let map;
		if( this.props.center.lat !== undefined ) {
			map = <div>
				<div>
					<div className="form-group">
						<label htmlFor="">City</label>
						<input type="text" name="city" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.city }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Area</label>
						<input type="text" name="area" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.area }/>
					</div>
					<div className="form-group">
						<label htmlFor="">State</label>
						<input type="text" name="state" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.state }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Country</label>
						<input type="text" name="country" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.country }/>
					</div>
					<div className="form-group">
						<label htmlFor="">ZipCode</label>
						<input type="text" name="zipcode" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.zipcode }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Address</label>
						<input type="text" name="address" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.address }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Latitude</label>
						<input type="text" name="latitude" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.markerPosition.lat }/>
					</div>
					<div className="form-group">
						<label htmlFor="">Longitude</label>
						<input type="text" name="longitude" className="form-control" onChange={ this.onChange } readOnly="readOnly" value={ this.state.markerPosition.lng }/>
					</div>
				</div>

				<AsyncMap
					googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GoogleMapsAPI}&libraries=places`}
					loadingElement={
						<div style={{ height: `100%` }} />
					}
					containerElement={
						<div style={{ height: this.props.height }} />
					}
					mapElement={
						<div style={{ height: `100%` }} />
					}
				/>
			</div>
		} else {
			map = <div style={{height: this.props.height}} />
		}
		return( map )
	}
}
export default Map
