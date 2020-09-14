const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token present' });
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Token Authentication Failed' });
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
