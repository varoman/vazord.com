const Topic = require('../../db/models/topic');
const { CREATED, BAD_REQUEST, SERVER_ERR, OK } = require('../../utils/codes');
const { TOPIC_CREATED, TOPIC_UPDATED } = require('../../utils/messages');


const create = (req, res) => {
    const { title } = req.body;

    Topic
        .create({ title })
        .then(() => res.status(CREATED).json({ message: TOPIC_CREATED}))
        .catch(err => res.status(BAD_REQUEST).json({ message: err.errors[0].message }));
};

const update = (req, res) => {
    const { title, id } = req.body;
    Topic
        .update({ title }, { where: { id } })
        .then(() => res.status(OK).json({ message: TOPIC_UPDATED}))
        .catch(err => res.status(BAD_REQUEST).json({ message: err.errors[0].message }));
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
    update,
};
