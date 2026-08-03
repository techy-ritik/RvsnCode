const sendErrorResponse = (res,err)=>{
 let statusCode = err.statusCode;
 let message = err.message;

 return res.status(statusCode).json({
    success : false,
    message : message,
 })
}

const sendResponse = (res, data , statusCode)=>{
    return res.status(statusCode).json({
        data:data,
        status : true,
    })
}



module.exports = {
    sendErrorResponse,
    sendResponse,
}