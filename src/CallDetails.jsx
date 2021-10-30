import React, { useEffect, useState, useContext, useCallback } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import LoaderComp from './LoaderComp.jsx';
import { getDetails } from './apis/calls';
import { postArchived } from './apis/calls';
import { deleteArchived } from './apis/calls';
import axios from 'axios';

import { CallContext } from './contexts/CallContext';

import './css/inbox.css';
import './css/details.css';

import Incoming from './icons/incoming.svg';
import Outgoing from './icons/outgoing.svg';
import Archive from './icons/archive.svg';
import Del from './icons/del.svg';

const CallDetails = ({ history }) => {
	const callcontext = useContext(CallContext);
	const { id } = useParams();
	const [details, setDetails] = useState();
	const source = axios.CancelToken.source();

	useEffect(() => {
		getDetails(id)
			.then(res => {
				setDetails(res);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		return () => source.cancel('Operation canceled by the user.');
		//cleans up all async functions if component is unmounted
	}, []);

	const archiveCall = useCallback(() => {
		postArchived(id).then(() => {
			callcontext.setCallList(null);
			history.push('/archived');
			// change behavior after archiving a call
		});
	}, []);

	const archiveDel = useCallback(() => {
		deleteArchived(id).then(() => {
			history.push('/archived');
			// change behavior after deleting a call from archive
		});
	}, []);

	const loadDetails = () => {
		if (details) {
			let date = new Date(details.created_at);
			const [month, day, year, hours, minutes] = [
				date.toLocaleString('default', { month: 'long' }),
				date.getDate(),
				date.getFullYear(),
				date.getHours(),
				date.getMinutes(),
			];
			return (
				<div className='mainList'>
					<h3 className='detailsHeader'>Details</h3>
					<div className='date'>
						<hr className='dotted' />
						{`${month}, ${day} ${year}`}
						<hr className='dotted' />
					</div>
					<div className='outerCallBoxDetails'>
						<div className='callBoxDetails'>
							<div className='leftSide'>
								{details.direction === 'outbound' ? (
									<Outgoing className='phone' />
								) : (
									<Incoming className='phone' />
								)}
								<div className='numberBox'>
									<div className='number'>
										{details.direction === 'outbound'
											? details.to
											: details.from}
									</div>
									<div className='textwrite'>
										{callcontext.filter(details)}
									</div>
								</div>
							</div>
							<div className='time'>{hours + ':' + minutes}</div>
						</div>
						<div className='detailsText'>
							Details: This call occured Lorem ipsum dolor sit
							amet consectetur adipisicing elit. Iure consectetur
							sed, quam temporibus quidem autem illum quae modi
							fugit quod, quaerat aperiam nam dolores, est
							voluptatibus totam? Illum, alias doloremque.
						</div>
						<div className='outerBoxArchive'>
							<div className='archive' onClick={archiveCall}>
								<Archive /> <span>Archive call</span>
							</div>
							<div className='archive' onClick={archiveDel}>
								<Del className='del' />
								<span>Delete Archive</span>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className='centerLoad'>
					<LoaderComp />
				</div>
			);
		}
	};

	return <div className='detailMain'>{loadDetails()}</div>;
};

export default withRouter(CallDetails);
