import React, { useContext, useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { gsap } from 'gsap';
import lottie from 'lottie-web';
import { CallContext } from './contexts/CallContext';
import { postArchived } from './apis/calls';
import axios from 'axios';

import './css/mainscreen.css';

import Box from './icons/box.svg';
import tick from './icons/tick.json';

const MainScreen = ({ history }) => {
	const callcontext = useContext(CallContext);
	const checkRef = useRef();
	const [checkanim, setCheckAnim] = useState();
	const source = axios.CancelToken.source();

	useEffect(() => {
		const checked = lottie.loadAnimation({
			container: checkRef.current,
			renderer: 'svg',
			loop: false,
			autoplay: false,
			animationData: tick,
			rendererSettings: {
				preserveAspectRatio: 'none',
			},
		});
		setCheckAnim(checked);
	}, []);

	const animateBox = () => {
		if (callcontext.list) {
			let last = callcontext.list.at(-1);
			callcontext.list.map(item => {
				postArchived(item.id).then(res => {
					if (item === last) {
						console.log('success!');
						checkanim.playSegments([0, 88], true);
						callcontext.setCallList(null);
						history.push('/archived');
					}
				});
			});
		}

		var tl = gsap.timeline({ repeat: 0 });
		tl.to('.box', { xPercent: 4 });
		tl.to('.box', { xPercent: -4 });
		tl.to('.box', { xPercent: 0 });
		tl.duration(0.5);

		tl.play();
	};

	useEffect(() => {
		return () => {
			source.cancel('Operation canceled by the user.');
		};
	}, []);

	useEffect(() => {
		if (callcontext.menu === 1) {
			gsap.to('.archiveAll', {
				yPercent: 0,
			});
			gsap.to('.innerInbox', {
				display: 'block',
			});
		} else {
			gsap.to('.archiveAll', {
				yPercent: -100,
			});
			gsap.to('.innerInbox', {
				display: 'none',
			});
		}
	}, [callcontext.menu]);

	return (
		<div className='Inbox'>
			<div className='innerInbox' onClick={animateBox}>
				<div className='archiveAll'>
					<div className='boxBox'>
						<Box className='box' />
						<span className='textBox'>Archive all calls</span>
					</div>
					<div className='checkmark' ref={checkRef}></div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(MainScreen);
