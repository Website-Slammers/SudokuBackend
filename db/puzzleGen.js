const { client } = require(".")
const {sudGenerator} = require ('./puzzleGenerator/sudGenerator/SudGenerator')
const {sudPuzAlgo} =  require ('./puzzleGenerator/sudGenerator/SudPuzAlgo')


async function generateNewPuzzle(){

    let answeredPuzzle = sudGenerator()
    const emptyPuzzle = JSON.stringify(sudPuzAlgo(answeredPuzzle))
    answeredPuzzle = JSON.stringify(answeredPuzzle)
    console.log("answeredPuzzle, " , answeredPuzzle, emptyPuzzle)

    try{
        const{ rows: [ puzzle ]} = await client.query(`
        INSERT INTO puzzles (emptypuzzle, answeredpuzzle,puzzletype)
        VALUES ($1, $2, $3)
        ON CONFLICT (answeredpuzzle) DO NOTHING
        RETURNING*;
        `,[emptyPuzzle, answeredPuzzle, 'easy'])
        console.log(puzzle)
        return puzzle;
    }catch(error){
        console.log(error);
    }
}

async function getPuzzleById(id){
    try{
        const{ rows: [puzzle] } = await client.query(`
        SELECT * FROM puzzles
        WHERE id = $1
        `, [id])
        
        //need to ask matt about this one.
        // console.log(puzzle)
        // let puzzleSolution = JSON.parse(JSON.parse(puzzle.answeredPuzzle))
        // let emptyPuzzle = JSON.parse(JSON.parse(puzzle.emptyPuzzle))
        // console.log(emptyPuzzle)
        // const puzzleParsed={
        //     'id': puzzle.id,
        //     'puzzleSolution',
        // }
        console.log(puzzle)
        return puzzle
    }catch(error){
        console.log(error);
    }
}



module.exports={
    generateNewPuzzle,
    getPuzzleById
}