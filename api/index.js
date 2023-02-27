const express=require('express');
const apiRouter=express.Router()
require ('dotenv').config();
   
apiRouter.use('/',async(req,res,next)=>{
    console.log("api routers up");
    next()
});


const puzzleRouter = require('./puzzle')
apiRouter.use('/puzzle',puzzleRouter)

// Error handling
apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    });
});

module.exports=apiRouter;