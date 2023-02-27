const {client} = require('./index');
const { generateNewPuzzle, getPuzzleById } = require('./puzzleGen')

async function createTables(){
    console.log('creating tables of arrays')

    try{
        await client.query(`
        CREATE TABLE puzzles(
            id SERIAL PRIMARY KEY,
            emptypuzzle VARCHAR(2000) NOT NULL, 
            answeredpuzzle VARCHAR(2000) UNIQUE NOT NULL,
            puzzletype VARCHAR(20)
        )`)
        console.log("tables successfully created!")
    }catch(error){
        console.log(error);
    }
}

async function dropTables(){
    console.log("dropping all tables")
    try{
        await client.query(`
            DROP TABLE IF EXISTS puzzles CASCADE;
            `)
            console.log("All tables dropped!")
    }catch(error){
        console.log(error)
    }
}

async function createInitialPuzzles(){
    try{
        console.log("creating sudoku boards")
        for(let i=0; i<357; i++){
            await generateNewPuzzle();
        }
        console.log("sudoku boards created")
    }catch(error){
        console.log(error)
    }
}


async function testDB(){
    console.log('testing database functions');
    await getPuzzleById(130)
}

async function rebuildDB(){
    client.connect();
    await dropTables();
    await createTables();
    await createInitialPuzzles();
    await testDB();
    client.end()
}

rebuildDB()