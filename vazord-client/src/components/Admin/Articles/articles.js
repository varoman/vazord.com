import { Button, Table } from 'antd';
import React, {useEffect, useState} from 'react';
import './articles.css';
import AddArticleModal from './AddArticleModal/addArticleModal';
import { SuccessModal } from '../../../components';
import api from '../../../axios';

export default () => {

    const [ isAdding, setIsAdding ] = useState(false);
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        getArticles();
    }, [ ]);

    const getArticles = () => {
        api
            .get('/article/all')
            .then(res => setArticles(res));
    };

    const handleModalClose = message => {
        SuccessModal(message);
        getArticles();
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: text => <span>{text}</span>,
        },
        {
            title: 'Parent Topic',
            dataIndex: 'parentTopic',
            key: 'parentTopic',
        },
        {
            title: 'Action',
            key: 'action',
            render: topic => (
                <span>
                    <span
                        className="Link">Edit</span> |&nbsp;
                    <span
                        className="Link delete">Delete</span>
                </span>
            ),
        },
    ];

    const data = articles.reduce((acc, curr) => {
        acc.push({
            key: curr.id,
            parentTopic: curr.topic.title,
            ...curr
        });

        return acc;
    }, []);

    return (
        <div>
            { isAdding ?
                <AddArticleModal
                    isOpen={isAdding}
                    toggleModal={setIsAdding}
                    onClose={handleModalClose}
                /> : null
            }
            <h1>Articles</h1>
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
}
