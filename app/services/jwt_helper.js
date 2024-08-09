const { jwt } = require('./imports');
const { accessTokenExpiresIn, refreshTokenExpiresIn } = require('../config/config');

const signAccessToken = (payload) => {
    const privateKey = process.env.PRIVATE_KEY;
    return jwt.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: accessTokenExpiresIn });
};
const verifyAccessToken = (token) => {
    const privateKey = process.env.PRIVATE_KEY;
    return jwt.verify(token, privateKey);
};


module.exports = {
    signAccessToken,
    verifyAccessToken,
};
