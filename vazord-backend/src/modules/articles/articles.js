const Article = require('../../db/models/article');
const Topic = require('../../db/models/topic');
const { CREATED, BAD_REQUEST, SERVER_ERR, NOT_FOUND, DELETED } = require('../../utils/codes');
const { ARTICLE_CREATED, ARTICLE_NOT_FOUND } = require('../../utils/messages');


const create = (req, res) => {
    const { title, topicId, publicUrl, content } = req.body;

    Article
        .create({ title, topicId, publicUrl, content })
        .then(() => res.status(CREATED).json({ message: ARTICLE_CREATED}))
        .catch(err => res.status(BAD_REQUEST).json({ message: err }));
};


const list = (req, res) => {
    Article
        .findAll({ include: [{ model: Topic, as: 'topic'} ]} )
        .then(articles => res.send(articles))
        .catch(err => {
            res.status(SERVER_ERR).json({ message: err })
        });
};

const getOne = (req, res) => {
	const { id } = req.params;
	Article
		.findOne({ where: { id } } )
		.then(articles => {
			if (!articles)
				return res.status(NOT_FOUND).json({ message: ARTICLE_NOT_FOUND});
			res.send(articles)
		})
		.catch(err => {
			res.status(SERVER_ERR).json({ message: err })
		});
};

const remove = (req, res) => {
	const { id } = req.body;
	Article
		.destroy({ where: { id } })
		.then(() => res.status(DELETED).end())
		.catch(err => res.status(BAD_REQUEST).json({ message: err.original.detail }));
};


module.exports = {
    create,
    list,
	getOne,
	remove,
};
