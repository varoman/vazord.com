import React, { useState, useEffect } from 'react';
import { Input, Table, Button } from 'antd';
import api from '../../../axios';
import { SuccessModal } from '../../../components';
import './topics.css';


const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Subtitles',
        dataIndex: 'subtitles',
        key: 'subtitles',
    },
    {
        title: 'Articles',
        dataIndex: 'articles',
        key: 'articles',
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <span>
                <span className="Link">Edit</span> | <span className="Link delete">Delete</span>
            </span>
        ),
    },
];

export default () => {

    const [ newTopic, setNewTopic ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ isOpen, toggleModal ] = useState(false);
    const [ topics, setTopics ] = useState([]);

    useEffect(() => {
        api.get('/topic/all')
            .then(res =>  setTopics(res));
    }, [ ]);

    const handleAddTopic = () => {
        api
            .post('/topic/create', { title: newTopic})
            .then((res) => {
                setMessage(res.message);
                setNewTopic('');
                toggleModal(true);
            });
    };

    const data = topics.reduce((acc, curr,) => {
        acc.push({
            key: curr.id,
            title: curr.title,
            subtitles: 0,
            articles: 0
        });

        return acc;
    }, []);

    return (
        <div>
            <SuccessModal
                message={message}
                isOpen={isOpen}
                toggleModal={toggleModal}
            />
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
            <Table columns={columns} dataSource={data} pagination={false} />
        </div>
    );
};