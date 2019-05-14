const login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password, 'email, password');
    res.end();
};


module.exports = {
    login,
};
