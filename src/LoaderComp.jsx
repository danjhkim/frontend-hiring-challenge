import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const LoaderComp = () => {
	return <Loader type='TailSpin' color='#808080' height={70} width={70} />;
};

export default LoaderComp;
