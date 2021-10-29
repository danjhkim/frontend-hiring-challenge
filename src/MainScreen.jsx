import React, { useContext, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import lottie from 'lottie-web';
import { CallContext } from './contexts/CallContext';
import { getCalls } from './apis/calls';
import { postArchived } from './apis/calls';

import './css/mainscreen.css';

import Box from './icons/box.svg';
import tick from './icons/tick.json';

const MainScreen = () => {
	const callcontext = useContext(CallContext);
	const checkRef = useRef();
	const arhiveRef = useRef();
	const innerRef = useRef();
	const [checkanim, setCheckAnim] = useState();

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
			callcontext.list.map((item, index) => {
				postArchived(item.id).then(() => {
					checkanim.playSegments([0, 88], true);
				});
			});
		} else {
			getCalls().then(res => {
				res.map(item => {
					postArchived(item.id).then(() => {
						checkanim.playSegments([0, 88], true);
					});
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

	const ScreenSwitcher = () => {
		if (callcontext.menu === 1) {
			gsap.to(arhiveRef.current, {
				yPercent: 0,
			});
			gsap.to(innerRef.current, {
				display: 'block',
			});
		} else {
			gsap.to(arhiveRef.current, {
				yPercent: -100,
			});
			gsap.to(innerRef.current, {
				display: 'none',
			});
		}
	};

	return (
		<div className='Inbox'>
			<div className='innerInbox' onClick={animateBox} ref={innerRef}>
				<div className='archiveAll' ref={arhiveRef}>
					<div className='boxBox'>
						<Box className='box' />
						<span className='textBox'>Archive all calls</span>
					</div>
					<div className='checkmark' ref={checkRef}></div>
				</div>
			</div>
			{ScreenSwitcher()}
		</div>
	);
};

export default MainScreen;
