import { airCall } from './index.js';

export const getCalls = async () => {
	const res = await airCall.get('/activities/');
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const getDetails = async id => {
	const res = await airCall.get(`/activities/${id}`);
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};

export const postArchived = async id => {
	const res = await airCall.post(`/activities/${id}`, {
		is_archived: true,
	});

	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};

export const deleteArchived = async id => {
	const res = await airCall.post(`/activities/${id}`, {
		is_archived: false,
	});

	if (res.status !== 200) {
		throw new Error('Error, posting the data');
	}
};

export const clearAllArchived = async () => {
	const res = await airCall.get('/reset/');
	if (res.status !== 200) {
		throw new Error('Error, fetching the data');
	}
	return res.data;
};
