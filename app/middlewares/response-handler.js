/**
 * HTTP Status codes
 */
const statusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
};

const responseHandler = () => async (req, res, next) => {
    res.success = ({ statusCode, result = null, msg = null }) => {
        const responseStatus =
            statusCode && statusCode < statusCodes.MULTIPLE_CHOICES && statusCode >= statusCodes.OK
                ? statusCode
                : statusCodes.OK;

        return res.status(responseStatus).json({
            result,
            msg,
            success:true
        });
    };

    res.clientError = ({ /* 400 responses */ statusCode, error = null, msg = null }) => {
        const responseStatus =
            statusCode && statusCode < statusCodes.INTERNAL_SERVER_ERROR && statusCode >= statusCodes.BAD_REQUEST
                ? statusCode
                : statusCodes.BAD_REQUEST;

        return res.status(responseStatus).json({
            msg,
            error,
            success:false
        });
    };

    res.serverError = ({ /* 500 responses */ statusCode, result = null, error = null, msg = null }) => {
        const responseStatus =
            statusCode && statusCode >= statusCodes.INTERNAL_SERVER_ERROR ? statusCode : statusCodes.INTERNAL_SERVER_ERROR;

        return res.status(responseStatus).json({
            result,
            msg,
            error,
            success:false

        });
    };

    res.ok = (params = {}) => {
        res.success({
            ...params,
            statusCode: statusCodes.OK,
            success:true
        });
    };

    res.created = (params = {}) => {
        res.success({
            ...params,
            statusCode: statusCodes.CREATED,
            success:true
        });
    };

    res.unauthorized = (params = {}) => {
        res.clientError({
            ...params,
            statusCode: statusCodes.UNAUTHORIZED,
            success:false
        });
    };

    res.internalServerError = (params = {}) => {
        res.serverError({
            ...params,
            statusCode: statusCodes.INTERNAL_SERVER_ERROR,
            success:false
        });
    };
    next();
};

module.exports = responseHandler;
