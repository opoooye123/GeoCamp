const { Error } = require("mongoose");

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'allucard') {
        next()
    } else { throw new Error('Password require') }
}

module.exports = verifyPassword