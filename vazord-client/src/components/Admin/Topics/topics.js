import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import api from '../../../axios';
import { Notifications } from '../../../components';
import EditTopicModal from './EditTopicModal/editTopicModal';
import RemoveTopicModal from './RemoveTopicModal/removeTopicModal';
import AddTopicModal from './AddTopicModal/addTopicModal';
import './topics.css';


export default () => {

    const [ topics, setTopics ] = useState([]);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ isAdding, setIsAdding ] = useState(false);
    const [ selectedTopic, setSelectedTopic ] = useState(null);

    useEffect(() => {
        getTopics();
    }, [ ]);

    const getTopics = () => {
        api
            .get('/topic/all')
            .then(res =>  setTopics(res));
    };

    const handleModalClose = message => {
        Notifications.showSuccess(message);
        getTopics();
    };

    const handleTopicEdit = topic => {
        setIsEditing(true);
        setSelectedTopic(topic);
    };

    const handleTopicDelete = topic => {
        setIsDeleting(true);
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
                        className="Link">Edit</span> |&nbsp;
                    <span
                        onClick={() => handleTopicDelete(topic)}
                        className="Link delete">Delete</span>
                </span>
            ),
        },
    ];

    const data = topics.reduce((acc, curr) => {
        acc.push({
            key: curr.id,
            title: curr.title,
            articles: curr.articles.length
        });

        return acc;
    }, []);

    return (
        <div>
            { isEditing ?
                <EditTopicModal
                    isOpen={isEditing}
                    toggleModal={setIsEditing}
                    selectedTopic={selectedTopic}
                    onClose={handleModalClose}
                /> : null
            }
            { isDeleting ?
                <RemoveTopicModal
                    isOpen={isDeleting}
                    toggleModal={setIsDeleting}
                    selectedTopic={selectedTopic}
                    onClose={handleModalClose}
                /> : null
            }
            { isAdding ?
                <AddTopicModal
                    isOpen={isAdding}
                    toggleModal={setIsAdding}
                    onClose={handleModalClose}
                /> : null
            }
            <h1>Topics</h1>
            <div className="create-article">
                <Button
                    onClick={() => setIsAdding(true)}
                    icon="plus-circle"
                    type="primary">Create
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    );
};
