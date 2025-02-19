const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/login'); 
    }
    next();
};

module.exports = { authMiddleware };

module.exports = { authMiddleware };
