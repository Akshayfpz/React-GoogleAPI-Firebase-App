import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import FirebaseHome from "./components/Firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


if ("serviceWorker" in navigator) {
	navigator.serviceWorker
	  .register("./../firebase-messaging-sw.js")
	  .then(function(registration) {
		console.log("Registration successful, scope is:", registration.scope);
	  })
	  .catch(function(err) {
		console.log("Service worker registration failed, error:", err);
	  });
  }

class App extends Component {
	render() {
		return (
			<div className="App">
				 <li><h2><a href="/google">Google API</a></h2></li>
				 <li><h2><a href="/firebase/tutorials">Firebase</a></h2></li>
				 <BrowserRouter>
					<Switch>
						<Route path="/google">
							<Home />
						</Route>
						<Route path="/firebase">
								<FirebaseHome />
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;