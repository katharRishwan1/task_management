const responseMessages = require('./response-messages');
const { verifyAccessToken } = require('../services/jwt_helper');
module.exports = {
    checkSetToken: () => async (req, res, next) => {
        const ignorePaths = ['signup', 'signin'];
        const getRouteStart = req.url.split('/');
        if (ignorePaths.includes(getRouteStart[1])) {
            return next();
        }
        let token = req.headers.Authorization || req.headers.authorization;
        if (token) {
            token = token.substr('Bearer '.length);
            try {
                const decoded = await verifyAccessToken(token);
                console.log('decpded--------', decoded);
                if (decoded) {
                    req.decoded = decoded;
                    return next()
                }
                return res.unauthorized({ msg: responseMessages[1012] });
            } catch (error) {
                return res.unauthorized({ msg: responseMessages[1013] });
            }
        } else {
            return res.unauthorized({ msg: responseMessages[1014] });
        }
    }
};
