const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const TOKEN = authHeader && authHeader.split(' ')[1];
    if (TOKEN == null) return res.status(401).json({ success: false, message: "Unauthorized" })
    jwt.verify(TOKEN, process.env.SECRET_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Forbidden error" })
        res.user = user
        next()
    })
}

module.exports = authenticateToken;