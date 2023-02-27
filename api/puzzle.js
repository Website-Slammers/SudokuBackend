const express = require('express')
const { getPuzzleById } = require('../db/puzzleGen')
const puzzleRouter = express.Router()


// GET /api/puzzle
puzzleRouter.get('/:id',async(req,res,next)=>{
    const {id} = req.params;
    try{
        const puzzle = await getPuzzleById(id)
        // console.log("puzzle",typeof (puzzle.emptypuzzle))
        puzzle.emptypuzzle = JSON.parse(puzzle.emptypuzzle)
        puzzle.answeredpuzzle = JSON.parse(puzzle.answeredpuzzle) 
        

        res.send(puzzle)
    }catch({name, message}){
        next({name, message})
    }
})

module.exports = puzzleRouter;