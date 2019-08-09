import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import queryString  from 'query-string';
import api from '../../../../axios';
import { uploadImage } from '../../../../firebase';


export default (props) => {

	const [ content, setContent ] = useState('');

	const onContentChange = value => setContent(value);

	const testim = (file, successFn, failFn) => {
		const fileName = file.name();
		const blob = file.blob();
		uploadImage(fileName, blob)
			.then(url => successFn(url))
			.catch(err => failFn(err));
	};

	const handleCreateArticle = () => {
		const { title, topic, url } =  queryString.parse(props.location.search);
		api
			.post('/article/create', { title, topicId: topic, publicUrl: url, content })
			.then(() => props.history.push('/admin/dashboard/articles'));
	};

	return (
		<div>
			<Editor
				value={content}
				apiKey="mwn0jbm0zvbw0f0dk3aw9y8ofrpj82d2prf7wxpzol5ubwb1"
				onEditorChange={onContentChange}
				init={{
					plugins: 'link table image',
					image_uploadtab: true,
					images_upload_handler: testim
				}}
			/>
			<div>
				<Button
					onClick={() => props.history.push('admin/dashboard/articles')}
					type="danger">Cancel
				</Button>
				<Button
					onClick={handleCreateArticle}
					type="primary">Save
				</Button>
			</div>
		</div>
	);
};
