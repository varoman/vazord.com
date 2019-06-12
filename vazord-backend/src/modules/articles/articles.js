const Article = require('../../db/models/article');
const Topic = require('../../db/models/topic');
const { CREATED, BAD_REQUEST, SERVER_ERR } = require('../../utils/codes');
const { ARTICLE_CREATED } = require('../../utils/messages');


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


module.exports = {
    create,
    list,
};
