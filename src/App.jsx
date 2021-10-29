import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MainScreen from './MainScreen.jsx';
import Inbox from './Inbox.jsx';
import CallDetails from './CallDetails.jsx';
import Calls from './Calls.jsx';
import Archived from './Archived.jsx';

import { CallStore } from './contexts/CallContext';

const App = () => {
	return (
		<div className='container'>
			<Router>
				<CallStore>
					<Header />
					<div className='container-view'>
						<MainScreen />
						<Switch>
							<Route exact path='/'>
								<Inbox />
							</Route>
							<Route exact path='/calls'>
								<Calls />
							</Route>
							<Route exact path='/calls/:id'>
								<CallDetails />
							</Route>
							<Route exact path='/archived'>
								<Archived />
							</Route>
						</Switch>
					</div>
					<Footer />
				</CallStore>
			</Router>
		</div>
	);
};

export default App;
