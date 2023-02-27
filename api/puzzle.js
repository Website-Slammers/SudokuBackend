const express = require('express')
const { getPuzzleById } = require('../db/puzzleGen')
const puzzleRouter = express.Router()


// GET /api/puzzle
puzzleRouter.get('/',async(req,res,next)=>{
    const {id} = req.body;
    try{
        const puzzle = await getPuzzleById(id)
        res.send({puzzle})
    }catch({name, message}){
        next({name, message})
    }
})

module.exports = puzzleRouter;