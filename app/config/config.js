const envConfigs = {
    port: process.env.PORT,
    enviroment: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    accessTokenExpiresIn:process.env.ACCESS_TOKEN_EXPIRE_TIME
};
console.log('datadase key----', process.env.MONGODB_DEV_URI);
module.exports = { ...envConfigs }