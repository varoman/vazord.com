import React, {useEffect, useState,} from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
// noinspection ES6CheckImport
import queryString  from 'query-string';
import api from '../../../../axios';
import { uploadImage } from '../../../../firebase';
import { SuccessModal } from '../../../../components/';


export default (props) => {

	const [ content, setContent ] = useState('');
	const [ editItemId, setEditItemId ] = useState();

	useEffect(() => {
		const { article } =  queryString.parse(props.location.search);
		setEditItemId(article);
		if (editItemId && !content) {
			api
				.get(`/article/${article}`)
				.then(res => setContent(res.content))
				.catch(() => props.history.push('articles'));
		}
	}, [ editItemId, content, props.history, props.location ]);


	const onContentChange = value => setContent(value);

	const uploadImageHandler = (file, successFn, failFn) => {
		const fileName = file.name();
		const blob = file.blob();
		uploadImage(fileName, blob)
			.then(url => successFn(url))
			.catch(err => failFn(err));
	};

	const handleCreateOrUpdateArticle = () => {
		const { title, topic, url } =  queryString.parse(props.location.search);
		let postParams, action;
		if (editItemId) {
			postParams = [ '/article/update', { article: { id: editItemId, content } } ];
			action = 'updated';
		} else {
			postParams = [ '/article/create', { title, topicId: topic, publicUrl: url, content } ];
			action = 'created';
		}
		api
			.post(...postParams)
			.then(() => {
				props.history.push('articles');
				SuccessModal('Article was successfully ' + action);
			});
	};

	return (
		<div>
			<Editor
				value={content}
				apiKey="mwn0jbm0zvbw0f0dk3aw9y8ofrpj82d2prf7wxpzol5ubwb1"
				onEditorChange={onContentChange}
				init={{
					height: 800,
					plugins: 'link table image preview emoticons media lists',
					image_uploadtab: true,
					images_upload_handler: uploadImageHandler
				}}
			/>
			<div>
				<Button
					className="mr20 mt20"
					onClick={() => props.history.push('articles')}
					type="danger">Cancel
				</Button>
				<Button
					className="mr20 mt20"
					onClick={handleCreateOrUpdateArticle}
					type="primary">Save
				</Button>
			</div>
		</div>
	);
};
