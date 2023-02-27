const { client } = require(".")
const {sudGenerator} = require ('./puzzleGenerator/boardGenerator/SudGenerator')
const {sudPuzAlgo} =  require ('./puzzleGenerator/boardGenerator/SudPuzAlgo')


async function generateNewPuzzle(){

    let answeredPuzzle = sudGenerator()
    const emptyPuzzle = JSON.stringify(sudPuzAlgo(answeredPuzzle))
    answeredPuzzle = JSON.stringify(answeredPuzzle)
    // console.log("answeredPuzzle, " , answeredPuzzle, emptyPuzzle)


    try{
        const{ rows: [ puzzle ]} = await client.query(`
        INSERT INTO puzzles (emptypuzzle, answeredpuzzle)
        VALUES ($1, $2)
        ON CONFLICT (answeredpuzzle) DO NOTHING
        RETURNING*;
        `,[emptyPuzzle, answeredPuzzle])
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
        console.log("here is my puzzle ", puzzle);
        return puzzle
    }catch(error){
        console.log(error);
    }
}



module.exports={
    generateNewPuzzle,
    getPuzzleById
}