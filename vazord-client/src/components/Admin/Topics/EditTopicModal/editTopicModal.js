import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import api from '../../../../axios';


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
                title="Edit Topic"
                centered
                visible={isOpen}
                okText="Yes"
                onOk={handleSave}
                onCancel={() => toggleModal(false)}
            >
                <div className='input-container'>
                    <Input
                        onChange={(e) => setTitle(e.target.value)}
                        minLength="1"
                        value={topicTitle} />
                </div>
            </Modal>
        </div>
    );
};
