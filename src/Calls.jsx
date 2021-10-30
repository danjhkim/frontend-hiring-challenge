import React, { useState } from 'react';

import Inbox from './Inbox.jsx';

import './css/calls.css';

const Calls = () => {
	const [activeCalls, setActiveCalls] = useState(true);
	//Don't need setAtiveCalls, state is only active when Inbox is being mounted through Calls.jsx
	//little cheat to change call listing behaviour between inbox and all calls.
	return (
		<div className='callsMain'>
			<div className='callsTitle'>All Calls</div>
			<Inbox activeCalls={activeCalls} />
		</div>
	);
};

export default Calls;
