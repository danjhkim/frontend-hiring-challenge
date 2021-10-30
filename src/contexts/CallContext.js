import React, { useState } from 'react';

export const CallContext = React.createContext();

//stored state with api context
export const CallStore = props => {
	const [menu, setMenu] = useState(1);
	const [list, setList] = useState();
	const [archivedFolder, setArchivedFolder] = useState();

	const changeMenu = e => {
		setMenu(e);
	};

	const setCallList = e => {
		setList(e);
	};
	const archiveSetter = e => {
		setArchivedFolder(e);
	};

	const filter = e => {
		if (e.direction === 'outbound') {
			return `Call to: ${e.from}`;
		} else if (e.to === null) {
			return 'N/A';
		} else if (e.from === null) {
			return 'N/A';
		} else {
			return `Call from: ${e.to}`;
		}
	};

	return (
		<CallContext.Provider
			value={{
				menu,
				changeMenu,
				list,
				setCallList,
				filter,
				archivedFolder,
				archiveSetter,
			}}>
			{props.children}
		</CallContext.Provider>
	);
};
