const express=require('express');
const apiRouter=express.Router()
require ('dotenv').config();

// set 'req.user' if possible
// USE /api/
   
apiRouter.use('/',async(req,res,next)=>{
    console.log("api routers up");
    next()
});


const boardRouter = require('./boards')
apiRouter.use('/boards',boardRouter)

// Error handling
apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

module.exports=apiRouter;