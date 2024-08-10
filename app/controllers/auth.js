const responseMessages = require('../middlewares/response-messages');
const db = require('../model');
const { errorHandlerFunction } = require('../services/common_service1');
const { bcrypt } = require('../services/imports');
const jwtHelper = require('../services/jwt_helper');
const validator = require('../validators/auth');
module.exports = {
    signin: async (req, res) => {
        try{
            const { error, validateData } = await validator.validateSignin(req.body);
            if(error){
                return res.clientError({
                    msg: error
                });
            };
            const { email,password} = req.body;
            const filterQuery = { isDeleted: false,email };
            const checkExist = await db.user.findOne(filterQuery);
            if(!checkExist){
                return res.clientError({
                    msg:responseMessages[1011]
                })
            };
            const passwordIsValid = bcrypt.compareSync(password, checkExist.password);
            if (!passwordIsValid) {
                return res.clientError({ msg: responseMessages[1011] });
            };
            const payload = { user_id: checkExist._id, name:checkExist.name}
            const token = jwtHelper.signAccessToken(payload);
            const userDetails = {
                name:checkExist.name,
                mobile: checkExist.mobile,
                email: checkExist.email
            };            
            return res.success({
                msg:responseMessages[1016],
                result:{
                    token,
                    userDetails
                }
            });
        } catch (error){
            console.log('error-----', error);
            errorHandlerFunction(error)
        }
    },
    signup: async (req, res) => {
        try{
            const { email,mobile} = req.body;
            const { error, validateData } = await validator.validateSignup(req.body);
            if(error){
                return res.clientError({
                    msg: error
                });
            };
            console.log('signin--------',req.body);
            
            const filterQuery = { isDeleted: false,$or:[{email,mobile}]};
            const checkEixst = await db.user.findOne(filterQuery);
            if(checkEixst){
                return res.clientError({
                    msg:responseMessages[1014]
                })
            };
            req.body.password = await bcrypt.hashSync(req.body.password,8)
            const data = await db.user.create(req.body);
            if(data){
                return res.success({
                    msg:responseMessages[1010],
                });
            };
            return res.clientError({
                msg:responseMessages[1003]
            });
        } catch (error) {
            console.log('error------', error);
            errorHandlerFunction(error);
        }
    },
}

