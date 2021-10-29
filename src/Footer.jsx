import React, { useState } from 'react';
import { gsap } from 'gsap';

import './css/footer.css';
import './css/tooltip.css';

import Phone from './icons/phone.svg';
import Contact from './icons/contact.svg';
import Menu from './icons/menu.svg';
import Cog from './icons/cog.svg';

const Footer = () => {
	const [onOff, setOnOff] = useState(true);

	const MenuClick = () => {
		console.log('boom!');
		gsap.from('.dotFill', {
			rotation: 0,
		});
		gsap.to('.dotFill', {
			rotation: 180,
			ease: 'Linear.easeNone',
			duration: 0.5,
		});
	};

	return (
		<footer>
			<div className='footerback'>
				<div className='button'>
					<Phone />
				</div>
				<div className='button'>
					<Contact />
				</div>

				<div className='outerNavCircle' onClick={MenuClick}>
					<div className='circleNav'>
						<Menu className='dotFill' />
					</div>
				</div>
				<div className='filler'></div>
				<div className='button'>
					<Cog />
				</div>

				<div className='tooltip'>
					<div
						className='onlineDot'
						onClick={() => {
							setOnOff(!onOff);
						}}>
						<div
							className={`innerCircle ${
								onOff ? 'green' : 'red'
							}`}></div>
					</div>
					<span className='tooltiptext'>
						Status: {onOff ? 'Online' : 'Offline'}
					</span>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
