import React, { useEffect, useState } from 'react';
import { Input, Modal, Select } from 'antd';
import api from '../../../../axios';
import './addArticleModal.css';
const { Option } = Select;


const renderOptions = topics => topics
    .map(topic =>
        <Option
            value={topic.id}
            key={topic.id}
        >{topic.title}
        </Option>);


export default ({ isOpen, toggleModal, onClose }) => {

    const [ title, setArticleTitle ] = useState('');
    const [ publicUrl, setArticleUrl ] = useState('');
    const [ topicId, setTopicId ] = useState('');
    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        getTopics();
    }, [ ]);

    const getTopics = () => {
        api
            .get('/topic/all')
            .then(res =>  setTopics(res));
    };

    const handleArticleNameChange = (e) => {
        setArticleUrl(e.target.value.replace(/\s/g, '-'));
        setArticleTitle(e.target.value)
    };

    const handleTopicChange = id => setTopicId(id);

	const handleAddArticle = () => {
		onClose({ title, topicId, publicUrl });
		toggleModal(false);
	};

    return (
        <div>
            <Modal
                title="Add Article"
                centered
                visible={isOpen}
                okText="Create content"
                onOk={handleAddArticle}
                okButtonProps={{ disabled: !title || !topicId }}
                onCancel={() => toggleModal(false)}
            >
                <div className="select-topic">
                    {
                        topics.length ?
                            <Select
                                style={{ width: 200 }}
                                showSearch
                                placeholder="Select parent topic"
                                onChange={handleTopicChange}
                            >
                                { renderOptions(topics) }
                            </Select>
                            : null
                    }
                </div>
                <div className="topic-input">
                    <Input
                        required
                        className="article-input-item"
                        placeholder="Enter article title"
                        value={title}
                        onChange={handleArticleNameChange}
                    />
                    <Input
                        required
                        style={{ display: 'block'}}
                        className="article-input-item"
                        placeholder="Enter public url"
                        value={publicUrl}
                        onChange={(e) => setArticleUrl(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    );
};
