const jwt = require('jsonwebtoken');

function generateAcessToken(user) {
    return jwt.sign(user, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.SECRET_REFRESH_TOKEN)
}

module.exports = { generateAcessToken, generateRefreshToken }