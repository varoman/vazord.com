import axios from 'axios';
import { notification } from 'antd';

const { REACT_APP_NODE_ENV } = process.env;

const baseURL  = REACT_APP_NODE_ENV === 'heroku' ? 'https://vazord-api.herokuapp.com/api' : 'http://localhost:5000/api';


const instance = axios.create({ baseURL });

instance.interceptors.request.use(config => {
	document.body.classList.add('loading-indicator');

	const token = (localStorage.getItem('token') || '');
    config.headers.Authorization = `JWT ${token}`;
    return config;
},  (error) => {
    return Promise.reject(error);
});

const showError = text => {
    notification.error({
        message: 'Error',
        description: text.toString()
    });
};

instance.interceptors.response.use(
    response => {
		document.body.classList.remove('loading-indicator');
		return response.data
	},
    error => {
		document.body.classList.remove('loading-indicator');
		let message = 'something went wrong :(';
        if (error && error.response && error.response.data)
            message = error.response.data.message;
        showError(message);
        return Promise.reject(error);
    }
);


export default instance;
