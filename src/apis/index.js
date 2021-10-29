import axios from 'axios';

export const airCall = axios.create({
	baseURL: 'https://aircall-job.herokuapp.com/',
});
