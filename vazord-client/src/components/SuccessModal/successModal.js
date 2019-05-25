import React from 'react';
import Modal from 'react-modal';


const customStyles = {
    content : {
        top                   : '5%',
        left                  : '85%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        backgroundColor       : 'rgba(63, 195, 128, 0.8)',
        color                 : 'white',
        padding               : '15px',
    }
};

export default ({ isOpen, toggleModal, message }) => (
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