import React, { Component } from 'react';
import { messaging } from "./../init-fcm";
import { Switch, Route, Link } from "react-router-dom";
import AddTutorial from "./add-tutorial.component";
import TutorialsList from "./tutorials-list.component";

class FirebaseHome extends Component {

	async componentDidMount() {
		// Getting token
		messaging.requestPermission()
		  .then(async function() {
			const token = await messaging.getToken();
			console.log('Token: '+token);
		  })
		  .catch(function(err) {
			console.log("Unable to get permission to notify.", err);
		  });
	  //to see if you have any notification this event Listener will trigger if your app is in focus, if it is not in focus it will show notification.
	  navigator.serviceWorker.addEventListener("message", (message) => console.log(message));

	  // Receiving messages
		
	  }

	render() {
		return(
			<div>
				<h2>Firebase Home Page</h2>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
					<Link to={"/firebase/tutorials"} className="nav-link">
					Tutorial List
					</Link>
					</li>
					<li className="nav-item">
					<Link to={"/firebase/add"} className="nav-link">
						Add
					</Link>
					</li>
				</div>
				</nav>

				<div className="container mt-3">
				<Switch>
					<Route exact path={["/", "/firebase/tutorials"]} component={TutorialsList} />
					<Route exact path="/firebase/add" component={AddTutorial} />
				</Switch>
				</div>
			</div>
		);
	}
}

export default FirebaseHome;