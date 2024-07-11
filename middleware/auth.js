const jwt = require('jsonwebtoken');
const secretKey = "GodsLovesChildren2010";

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).send('Access Denied: No Token Provided!');

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).send('Access Denied: Malformed Token!');

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
