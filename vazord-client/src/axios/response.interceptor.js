import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from './index';


Modal.setAppElement('#root');

const customStyles = {
    content : {
        top                   : '5%',
        left                  : '85%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        backgroundColor       : 'rgba(255,0,0, 0.8)',
        color                 : 'white',
        padding               : '15px',
    }
};

export default () => {

    const [ isOpen, toggleModal ] = useState(false);
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        toggleModal(false);
    }, [ isOpen ]);

    api.interceptors.response.use(
        response => response.data,
        error => {
            let message = 'something went wrong :(';
            if (error && error.response && error.response.data)
                message = error.response.data.message;
            toggleModal(true);
            setMessage(message.toString());
            return Promise.reject(error);
        });

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            overlayClassName="modal-overlay"
            closeTimeoutMS={3000}
            onAfterOpen={() => toggleModal(false)}
        >
         <p>{message}</p>
        </Modal>
    );
};