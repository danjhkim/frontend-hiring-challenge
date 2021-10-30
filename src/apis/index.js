import axios from 'axios';
const source = axios.CancelToken.source();

export const airCall = axios.create({
	baseURL: 'https://aircall-job.herokuapp.com/',
	cancelToken: source.token,
});
