import React from 'react';
import Modal from 'react-modal';
import { Input, Button } from 'antd';
import './editTopicModal.css';


export default ({ isOpen, toggleModal, selectedTopic }) => console.log(selectedTopic, 'selectedTopic') || (
    <Modal
        className="edit-topic"
        isOpen={isOpen}
    >
        <h1 className='topic-title'>Edit Topic</h1>
        <div className='input-container'>
            <Input
                value/>
        </div>
        <div className="button-container">
            <Button type="primary">Save</Button>
            <Button
                onClick={() => toggleModal(false)}
                type="danger">Cancel</Button>
        </div>
    </Modal>
);