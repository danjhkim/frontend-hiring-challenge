import React, { useState } from 'react';

import Inbox from './Inbox.jsx';

import './css/calls.css';

const Calls = () => {
	const [activeCalls, setActiveCalls] = useState(true);
	return (
		<div className='callsMain'>
			<div className='callsTitle'>All Calls</div>
			<Inbox activeCalls={activeCalls} />
		</div>
	);
};

export default Calls;
