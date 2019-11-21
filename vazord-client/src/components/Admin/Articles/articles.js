import React, {useEffect, useState} from 'react';
import { Button, Table } from 'antd';
import './articles.css';
import AddArticleModal from './AddArticleModal/addArticleModal';
import api from '../../../axios';
import ConfirmRemovingModal from '../Articles/ConfirmRemovingModal/confirmRemovingModal';
import { SuccessModal } from '../../../components';


export default (props) => {

    const [ isAdding, setIsAdding ] = useState(false);
    const [ isDeleting, setIsDeleting ] = useState(false);
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
				SuccessModal('Article was deleted successfully!');
				setIsDeleting(false);
				getArticles();
			});
	};

	const handleArticleDelete = articleId => {
		setDeleteItemIndex(articleId);
		setIsDeleting(true);
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
            render: article => (
                <span>
                    <span
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
