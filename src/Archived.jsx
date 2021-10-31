import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoaderComp from './LoaderComp.jsx';
import { getCalls } from './apis/calls';
import { clearAllArchived } from './apis/calls';
import { CallContext } from './contexts/CallContext';
import Modal from 'react-modal';
import axios from 'axios';

import './css/inbox.css';
import './css/archive.css';
import Incoming from './icons/incoming.svg';
import Outgoing from './icons/outgoing.svg';
import Clear from './icons/clear.svg';
import Saved from './icons/saved.svg';

const customStyles = {
	content: {
		top: '25%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		transform: 'translate(-50%, -50%)',
		border: '1px solid rgb(202, 202, 202)',
		width: '12%',
		borderRadius: '7px',
		background: 'rgb(245, 245, 245)',
	},
	overlay: { zIndex: 1000 },
};

Modal.setAppElement('#app');

const Archived = ({ history }) => {
	const callcontext = useContext(CallContext);
	const [delay, setDelay] = useState(true);
	const [modalIsOpen, setIsOpen] = useState(false);
	const source = axios.CancelToken.source();

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	function refreshPage() {
		history.push('/');
		//change this to change behaviour after clean up archive page
	}

	setTimeout(() => {
		setDelay(false);
		//duration of completed modal. can remove or modify.
	}, 700);

	const clearAll = useCallback(async () => {
		clearAllArchived()
			.then(() => {
				openModal();
				setTimeout(() => {
					closeModal();
				}, 500);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		return () => source.cancel('Operation canceled by the user.');
		//cleans up all async functions if component is unmounted
	}, []);

	useEffect(() => {
		if (!callcontext.callList) {
			getCalls()
				.then(res => {
					callcontext.archiveSetter(res);
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			callcontext.archiveSetter(callcontext.list);
		}
	}, []);

	const renderTotal = () => {
		return (
			<div className='archiveMain'>
				<Modal
					closeTimeoutMS={500}
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					onAfterClose={refreshPage}
					style={customStyles}
					contentLabel='Clear Modal'>
					<div className='textBoxModal'>
						<h2 className='mess'>Clear all completed!</h2>
					</div>
				</Modal>
				<div className='titleArchiveHeader'>
					<div className='archiveTitle'>Archived Calls</div>
					<div className='options' onClick={clearAll}>
						<div className='clear'>
							<Clear className='clearbutton' />
							<span>Clear all</span>
						</div>
					</div>
				</div>
				{!delay ? loadSaveArchived() : null}
			</div>
		);
	};

	const loadSaveArchived = () => {
		if (callcontext.archivedFolder) {
			const callList = callcontext.archivedFolder.map((item, index) => {
				let date = new Date(item.created_at);
				const [month, day, year, hours, minutes] = [
					date.toLocaleString('default', { month: 'long' }),
					date.getDate(),
					date.getFullYear(),
					date.getHours(),
					date.getMinutes(),
				];
				if (item.is_archived) {
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
											<span>Archived</span>
										</div>
									) : null}
									{hours + ':' + minutes}
								</div>
							</Link>
						</div>
					);
				}
			});
			return callList;
		} else {
			return (
				<div className='centerLoad'>
					<LoaderComp />
				</div>
			);
		}
	};
	return <div className='archiveMain'>{!delay ? renderTotal() : null}</div>;
};

export default withRouter(Archived);
