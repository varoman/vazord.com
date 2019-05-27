import React, {useState} from 'react';
import Modal from 'react-modal';
import { Input, Button } from 'antd';
import api from '../../../../axios';
import './editTopicModal.css';


export default ({ isOpen, toggleModal, selectedTopic, onClose }) => {

    const [ topicTitle, setTitle ] = useState(selectedTopic.title);

    const handleSave = () => {
        api
            .post('/topic/update', { title: topicTitle, id: selectedTopic.key })
            .then(res => {
                onClose(res.message);
                toggleModal(false);
            });
    };

    return (
        <div>
            <Modal
                className="edit-topic"
                isOpen={isOpen}
            >
                <h1 className='topic-title'>Edit Topic</h1>
                <div className='input-container'>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        minLength="1"
                        value={topicTitle} />
                </div>
                <div className="button-container">
                    <Button
                        disabled={!topicTitle}
                        onClick={handleSave}
                        type="primary">Save</Button>
                    <Button
                        onClick={() => toggleModal(false)}
                        type="danger">Cancel</Button>
                </div>
            </Modal>
        </div>
    );
};
