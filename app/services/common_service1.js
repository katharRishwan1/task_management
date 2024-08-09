const db = require('../model');

module.exports = {
    errorHandlerFunction: (res, error) => {
        console.log('error-----', error);
        if (error?.status) {
          if (error.status < 500) {
            return res.clientError({
              ...error.error,
              statusCode: error.status,
            })
          } else {
            return res.internalServerError({ ...error.error })
          }
        } else {
          return res.clientError({ msg:'something went wrong' })
        }
    },   
}


