const apiResponse = {
    success: (res,options={})=>{
        const {
            data = null,
            message = "Success",
            statusCode = 200,
            meta = null
        } = options;
        return res.status(statusCode).json({
            success: true,
            data,
            message,
            meta,
            timestamp: new Date().toISOString()
        });
    },
    error: (res,options={})=> {
        const {
            message = "Something went wrong",
            statusCode = 500,
            errors = null
        } = options;
         
        return res.status(statusCode).json({
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString()
        });
    },
};

module.exports = {apiResponse};