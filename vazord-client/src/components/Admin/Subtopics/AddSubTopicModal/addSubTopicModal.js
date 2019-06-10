import React, { useEffect, useState } from 'react';
import { Input, Modal, Select } from 'antd';
import api from '../../../../axios';
import './addSubTopicModal.css';
const { Option } = Select;


const renderOptions = topics => topics
    .map(topic =>
        <Option
            value={topic.id}
            key={topic.id}
        >{topic.title}
        </Option>);


export default ({ isOpen, toggleModal, onClose }) => {

    const [ subTopicTitle, setSubTopicTitle ] = useState('');
    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        getTopics();
    }, [ ]);

    const handleAddTopic = () => {
        api
            .post('/topic/create', { title: subTopicTitle})
            .then((res) => {
                onClose(res.message);
                toggleModal(false);
            });
    };

    const getTopics = () => {
        api
            .get('/topic/all')
            .then(res =>  setTopics(res));
    };

    return (
        <div>
            <Modal
                title="Add Subtopic"
                centered
                visible={isOpen}
                okText="Save"
                onOk={handleAddTopic}
                okButtonProps={{ disabled: !subTopicTitle }}
                onCancel={() => toggleModal(false)}
            >
                <div className="select-topic">
                    {
                        topics.length ?
                            <Select
                                style={{ width: 200 }}
                                showSearch
                                placeholder="Select parent topic"
                                onChange={(value) => console.log(value, 'value')}
                            >
                                { renderOptions(topics) }
                            </Select>
                            : null
                    }
                </div>
                <div className="topic-input">
                    <Input
                        required
                        className="subtopic-input-item"
                        placeholder="Enter subtopic title"
                        value={subTopicTitle}
                        onChange={(e) => setSubTopicTitle(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};
