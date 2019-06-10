import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import api from '../../../../axios';


export default ({ isOpen, toggleModal, onClose }) => {

    const [ topicTitle, setTitle ] = useState('');

    const handleAddTopic = () => {
        api
            .post('/topic/create', { title: topicTitle})
            .then((res) => {
                onClose(res.message);
                toggleModal(false);
            });
    };

    return (
        <div>
            <Modal
                title="Add Topic"
                centered
                visible={isOpen}
                okText="Save"
                onOk={handleAddTopic}
                okButtonProps={{ disabled: !topicTitle }}
                onCancel={() => toggleModal(false)}
            >
                <div className="topic-input">
                    <Input
                        required
                        className="topic-input-item"
                        placeholder="Enter topic title"
                        value={topicTitle}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};
