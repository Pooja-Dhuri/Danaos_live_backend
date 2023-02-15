// Not Found
const notFound = (req, res, next)=>{
    const error = new Error(`Not Found:${req.originalUrl}`)
    res.status(404)
    next(error)
}

//Error handler
const errorhandle =(err, req, res, next)=>{
const statuscode = res.statusCode == 200? 500: res.statusCode;
res.status(statuscode)
res.json({
    status:false,
    message: err?.message,
    stack:err?.stack
})
}

module.exports = {errorhandle, notFound}