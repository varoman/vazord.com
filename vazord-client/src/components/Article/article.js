import React, {useEffect, useState} from 'react';
import queryString  from 'query-string';
import api from '../../axios';

const createMarkup = content => ({__html: content});

export default (props) => {

	const { id } = queryString.parse(props.location.search);
	const [ article, setArticle ] = useState(null);

	useEffect(() => {
		api
			.get(`/article/${id}`)
			.then(res => setArticle(res))
			.catch(() => props.history.push('/'))
	}, [ id, props.history ]);



	return (
		<div>
			{ article && article.content ?
				<div dangerouslySetInnerHTML={createMarkup(article.content)}></div>
				: null
			}
		</div>

	);
}
