// all api calls
import { airCall } from './index.js';
import axios from 'axios';
const source = axios.CancelToken.source();

export const getCalls = async () => {
	const res = await airCall.get('/activities/', {
		cancelToken: source.token,
	});

	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const getDetails = async id => {
	const res = await airCall.get(`/activities/${id}`, {
		cancelToken: source.token,
	});
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const postArchived = async id => {
	const res = await airCall.post(`/activities/${id}`, {
		is_archived: true,
		cancelToken: source.token,
	});

	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};

export const deleteArchived = async id => {
	const res = await airCall.post(`/activities/${id}`, {
		is_archived: false,
		cancelToken: source.token,
	});

	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};

export const clearAllArchived = async () => {
	const res = await airCall.get('/reset/', {
		cancelToken: source.token,
	});
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};
