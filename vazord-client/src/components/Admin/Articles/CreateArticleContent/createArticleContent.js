import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button } from 'antd';
import queryString  from 'query-string';
import api from '../../../../axios'


export default (props) => {

	const [ content, setContent ] = useState('');

	const onContentChange = (value, b) => {
		setContent(value);
		console.log(content, 'content')
	};

	const testim = (blob, scs, fl) => {
		console.log(blob.base64(), 'blob');
		console.log(scs, 'sc');
		console.log(fl, 'fl')
	};

	const handleCreateArticle = () => {
		const { title, topic, url } =  queryString.parse(props.location.search);
		api
			.post('/article/create', { title, topicId: topic, publicUrl: url, content })
			.then((res) => {
				props.history.push('admin/dashboard/articles');
			});
	};

	return (
		<div>
			<Editor
				value={content}
				apiKey="mwn0jbm0zvbw0f0dk3aw9y8ofrpj82d2prf7wxpzol5ubwb1"
				init={{
					plugins: 'link table image',
					image_uploadtab: true,
					images_upload_url: 'test.me',
					images_upload_handler: testim}}
				onEditorChange={onContentChange}
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
