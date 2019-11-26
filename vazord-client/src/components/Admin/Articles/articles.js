import React, {useEffect, useState} from 'react';
import {Button, Input, Table} from 'antd';
import './articles.css';
import AddArticleModal from './AddArticleModal/addArticleModal';
import api from '../../../axios';
import ConfirmRemovingModal from '../Articles/ConfirmRemovingModal/confirmRemovingModal';
import { Notifications } from '../../../components';


export default (props) => {

    const [ isAdding, setIsAdding ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
    const [ editItem, setEditItem ] = useState(null);
    const [ isEditing, setIsEditing ] = useState(false);
    const [ newTitle, setNewTitle ] = useState('');
    const [ deleteItemIndex, setDeleteItemIndex ] = useState();
    const [ articles, setArticles ] = useState([]);

    useEffect(() => {
        getArticles();
    }, [ ]);

    const getArticles = () => {
        api
            .get('/article/all')
            .then(res => setArticles(res));
    };

    const handleAddArticleModalClose = ({ topicId, title, publicUrl}) =>
		props.history.push(`/admin/dashboard/create-article?topic=${topicId}&title=${title}&url=${publicUrl}`);

	const handleRemoveArticleModalClose = confirmed => {
		if (!confirmed) return setIsDeleting(false);
		api
			.post('/article/delete', { id: deleteItemIndex })
			.then(res => {
				Notifications.showSuccess('Article was deleted successfully!');
				setIsDeleting(false);
				getArticles();
			});
	};

	const handleArticleDelete = articleId => {
		setDeleteItemIndex(articleId);
		setIsDeleting(true);
	};

	const handleArticleEdit = ({ id, topicId, title, publicUrl, }) => {
		props.history.push(`/admin/dashboard/create-article?topic=${topicId}&title=${title}&url=${publicUrl}&article=${id}`);
	};

	const handleEditTitle = item => {
		setEditItem(item);
		setNewTitle(item.title);
		setIsEditing(true);
	};

	const handleTitleInputChange = e => setNewTitle(e.target.value);

	const handleTitleInputBlur = () => setIsEditing(false);

	const handleSaveNewTitle = () => {
		api
			.post('/article/update', { article: { id: editItem.id, title: newTitle } })
			.then(res => {
				Notifications.showSuccess('Title was successfully updated!');
				getArticles();
				setIsEditing(false);
				setEditItem(null);
				setNewTitle('');
		})
	};

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, item) => {
            	if (isEditing && item.id === editItem.id) {
            		return (
						<div>
							<div className="input-title">
								<Input
									name="title"
									type="text"
									onChange={handleTitleInputChange}
									value={newTitle}
									required
									placeholder="Enter New Title" />
							</div>
							<i onClick={handleTitleInputBlur}
							   className="fa fa-window-close"></i>
							<i onClick={handleSaveNewTitle}
							   className="fa fa-check-square"></i>
						</div>
					)
				}
            	return (
					<span>{text} <span onClick={() => handleEditTitle(item)}><i className="fa fa-edit"></i></span></span>
				)
			},
        },
		{
			title: 'Public Url',
			dataIndex: 'publicUrl',
			key: 'publicUrl',
		},
        {
            title: 'Parent Topic',
            dataIndex: 'parentTopic',
            key: 'parentTopic',
        },
        {
            title: 'Action',
            key: 'action',
            render: article => (
                <span>
                    <span
						onClick={() => handleArticleEdit(article)}
                        className="Link">Edit</span> |&nbsp;
                    <span
						onClick={() => handleArticleDelete(article.id)}
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
                    onClose={handleAddArticleModalClose}
                /> : null
            }
			{ isDeleting ?
				<ConfirmRemovingModal
					isOpen={isDeleting}
					entity='article'
					onClose={handleRemoveArticleModalClose}
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
