const responseMessages = require('../middlewares/response-messages');
const db = require('../model');
const { errorHandlerFunction } = require('../services/common_service1');
const validator = require('../validators/task');
module.exports = {
    create: async(req, res) => {
        try{
            const { name, toWhom } = req.body;
            const { error, validateData } = await validator.validateCreate(req.body);
            if(error){
                return res.clientError({
                    msg: error
                });
            };
            const filterQuery = { isDeleted: false, name,toWhom };
            const checkExist = await db.task.findOne(filterQuery);
            if(checkExist){
            return res.clientError({
               msg:responseMessages[1001] 
            })};
            req.body.createdBy = req.decoded.user_id;
            const data = await db.task.create(req.body);
            if(data){
                return res.ok({
                    msg:responseMessages[1002],
                    result: data
                })
            };
            return res.clientError({
                msg:responseMessages[1003]
            })
        } catch (error) {
            errorHandlerFunction(res,error)
        }
    },
    get: async(req, res) => {
        try{
            const _id = req.params.id;
            const populateValues = [{path:'toWhom',select:'name'},{path:'createdBy', select:'name'}];
            const filterQuery = { isDeleted: false,  };
            if(_id){
                filterQuery._id = _id;
                const findSingle = await db.task.findOne(filterQuery).populate(populateValues);
                if(findSingle){
                    return res.success({
                        msg: responseMessages[1004],
                        result:findSingle
                    })
                };
                return res.clientError({
                    msg: responseMessages[1005]
                })
            };
            const data = await db.task.find(filterQuery).populate(populateValues);
            if(data.length){
                return res.success({
                    msg: responseMessages[1004],
                    result:data
                })
            };
            return res.success({
                msg: responseMessages[1005]
            })
        } catch (error){
            errorHandlerFunction(res,error)

        }
    },
    update: async(req, res) => {
        try{
            const _id = req.params.id;
            const { error, validateData } = await validator.validateCreate(req.body);
            if(error){
                return res.clientError({
                    msg: error
                });
            };
            const filterQuery = { isDeleted: false,_id };
            const checkEixst = await db.task.findOne(filterQuery);
            if(!checkEixst){
                return clientError({
                    msg:responseMessages[1005]
                });
            };
            const data = await db.task.updateOne(filterQuery,req.body);
            if(data.modifiedCount){
                return res.success({
                    msg:responseMessages[1006]
                });
            };
            return clientError({
                msg:responseMessages[1007]
            });
        } catch (error){
            errorHandlerFunction(res,error)

        }
    },
    delete: async(req, res) => {
        try{
            const _id = req.params.id;
            const filterQuery = { isDeleted: false,_id };
            const checkEixst = await db.task.findOne(filterQuery);
            if(!checkEixst){
                return clientError({
                    msg:responseMessages[1005]
                });
            };
            const data = await db.task.updateOne(filterQuery,{isDeleted:true});
            if(data.modifiedCount){
                return res.success({
                    msg:responseMessages[1008]
                });
            };
            return clientError({
                msg:responseMessages[1007]
            });
        } catch (error){
            errorHandlerFunction(res,error)

        }
    }
}