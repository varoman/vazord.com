import { Button, Table } from 'antd';
import React, { useState } from 'react';
import './sutopics.css';
import AddSubTopicModal from './AddSubTopicModal/addSubTopicModal';

export default () => {

    const [ isAdding, setIsAdding ] = useState(false);

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
                        className="Link">Edit</span> |&nbsp;
                    <span
                        className="Link delete">Delete</span>
                </span>
            ),
        },
    ];

    return (
        <div>
            { isAdding ?
                <AddSubTopicModal
                    isOpen={isAdding}
                    toggleModal={setIsAdding}
                    onClose={() => {} }
                /> : null
            }
            <h1>Subtopics</h1>
            <div className="create-subtopic">
                <Button
                    onClick={() => setIsAdding(true)}
                    icon="plus-circle"
                    type="primary">Create
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </div>
    );
}
