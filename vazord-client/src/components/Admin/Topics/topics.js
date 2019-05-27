import React, { useState, useEffect } from 'react';
import { Input, Table, Button } from 'antd';
import api from '../../../axios';
import { SuccessModal } from '../../../components';
import EditTopicModal from './EditTopicModal/editTopicModal';
import './topics.css';


export default () => {

    const [ newTopic, setNewTopic ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ isOpen, toggleSuccessModal ] = useState(false);
    const [ topics, setTopics ] = useState([]);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ selectedTopic, setSelectedTopic ] = useState(null);

    useEffect(() => {
        getTopics();
    }, [ ]);

    const getTopics = () => {
        api
            .get('/topic/all')
            .then(res =>  setTopics(res));
    };

    const handleAddTopic = () => {
        api
            .post('/topic/create', { title: newTopic})
            .then((res) => {
                setMessage(res.message);
                setNewTopic('');
                toggleSuccessModal(true);
                getTopics();
            });
    };

    const handleUpdateTopic = message => {
        toggleSuccessModal(true);
        setMessage(message);
        getTopics();
    };

    const handleTopicEdit = topic => {
        setIsEditing(true);
        setSelectedTopic(topic);
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Subtopics',
            dataIndex: 'subtopics',
            key: 'subtopics',
        },
        {
            title: 'Articles',
            dataIndex: 'articles',
            key: 'articles',
        },
        {
            title: 'Action',
            key: 'action',
            render: topic => (
                <span>
                    <span
                        onClick={() => handleTopicEdit(topic)}
                        className="Link">Edit
                    </span> |&nbsp;
                     <span className="Link delete">Delete</span>
                </span>
            ),
        },
    ];

    const data = topics.reduce((acc, curr) => {
        acc.push({
            key: curr.id,
            title: curr.title,
            subtopics: 0,
            articles: 0
        });

        return acc;
    }, []);

    return (
        <div>
            <SuccessModal
                message={message}
                isOpen={isOpen}
                toggleModal={toggleSuccessModal}
            />
            { isEditing ?
                <EditTopicModal
                    isOpen={isEditing}
                    toggleModal={setIsEditing}
                    selectedTopic={selectedTopic}
                    onClose={handleUpdateTopic}
                /> : null
            }
            <h1>Topics</h1>
            <div className="topic-input">
                <Input
                    required
                    className="topic-input-item"
                    placeholder="Enter topic title"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                />
                <Button
                    disabled={!newTopic}
                    type="primary"
                    htmlType="submit"
                    onClick={handleAddTopic}
                >Add</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
};
