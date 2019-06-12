import axios from 'axios';
import { notification } from 'antd';


const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use(config => {
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
    response => response.data,
    error => {
        let message = 'something went wrong :(';
        if (error && error.response && error.response.data)
            message = error.response.data.message;
        showError(message);
        return Promise.reject(error);
    }
);


export default instance;
