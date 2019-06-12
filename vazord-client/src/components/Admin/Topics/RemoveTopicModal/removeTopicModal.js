import React from 'react';
import { Modal, Icon } from 'antd';
import api from '../../../../axios';


export default ({ isOpen, toggleModal, selectedTopic, onClose }) => {

    const handleSave = () => {
        api
            .post('/topic/delete', { id: selectedTopic.key })
            .then(res => {
                onClose(res.message);
                toggleModal(false);
            });
    };

    return (
        <div>
            <Modal
                title={<span><Icon type='warning' style={{color: 'red'}}/> Delete Topic</span>}
                centered
                visible={isOpen}
                okText="Yes"
                onOk={() => handleSave()}
                onCancel={() => toggleModal(false)}
            >
                <p>You are going to delete <strong>{selectedTopic.title}</strong> topic.</p>
                { selectedTopic.articles > 0 ?
                    <div>
                        <p>This topic contains <strong>{selectedTopic.articles} articles</strong>.</p>
                    </div>
                    : null
                }
                <p>Are you sure?</p>
            </Modal>
        </div>
    );
};
