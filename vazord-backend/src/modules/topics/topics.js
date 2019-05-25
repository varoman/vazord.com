const Topic = require('../../db/models/topic');
const { CREATED, BAD_REQUEST, SERVER_ERR } = require('../../utils/codes');
const { TOPIC_CREATED } = require('../../utils/messages');


const create = (req, res) => {
    const { title } = req.body;

    Topic
        .create({ title })
        .then(() => res.status(CREATED).json({ message: TOPIC_CREATED}))
        .catch(err => res.status(BAD_REQUEST).json({ message: err }));
};

const list = (req, res) => {
    Topic
        .findAll()
        .then(topics => res.send(topics))
        .catch(err => res.status(SERVER_ERR).json({ message: err }));
};


module.exports = {
    create,
    list,
};