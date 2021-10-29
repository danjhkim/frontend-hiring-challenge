import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { CallContext } from './contexts/CallContext';

import { getCalls } from './apis/calls';

import './css/inbox.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Incoming from './icons/incoming.svg';
import Outgoing from './icons/outgoing.svg';
import Saved from './icons/saved.svg';

const Inbox = ({ activeCalls }) => {
	const callcontext = useContext(CallContext);

	useEffect(() => {
		setTimeout(() => {
			getCalls().then(res => {
				callcontext.setCallList(res);
			});
		}, 800);
		//just to show loader, remove setTimeout in production
	}, []);

	const loadList = () => {
		if (callcontext.list) {
			const callList = callcontext.list.map((item, index) => {
				let date = new Date(item.created_at);
				const [month, day, year, hours, minutes] = [
					date.toLocaleString('default', { month: 'long' }),
					date.getDate(),
					date.getFullYear(),
					date.getHours(),
					date.getMinutes(),
				];
				return (
					<div className='mainList' key={item.id}>
						<div className='date'>
							<hr className='dotted' />
							{`${month}, ${day} ${year}`}
							<hr className='dotted' />
						</div>
						<Link
							to={`/calls/${item.id}`}
							className='callBox'
							onClick={() => callcontext.changeMenu(2)}>
							<div className='leftSide'>
								{item.direction === 'outbound' ? (
									<Outgoing className='phone' />
								) : (
									<Incoming className='phone' />
								)}
								<div className='numberBox'>
									<div className='number'>
										{item.direction === 'outbound'
											? item.to
											: item.from}
									</div>
									<div className='textwrite'>
										{callcontext.filter(item)}
									</div>
								</div>
							</div>

							<div className='time'>
								{item.is_archived ? (
									<div className='saved'>
										<Saved className='savedBox' />
										<span>archived</span>
									</div>
								) : null}
								{hours + ':' + minutes}
							</div>
						</Link>
					</div>
				);
			});
			return callList;
		} else {
			return (
				<div className='centerLoad'>
					<Loader
						type='TailSpin'
						color='#2c2c2c'
						height={70}
						width={70}
					/>
				</div>
			);
		}
	};

	return (
		<div className='mainInbox'>
			{activeCalls ? null : <div className='inboxTitle'>Inbox</div>}
			{loadList()}
		</div>
	);
};

export default Inbox;
