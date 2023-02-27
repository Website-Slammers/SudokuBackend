const {client} = require('./index');


async function createTables(){
    console.log('creating tables of arrays')

    try{
        await client.query(`
        CREATE TABLE boards(
            id SERIAL PRIMARY KEY,
            emptypuzzle VARCHAR(2000) UNIQUE NOT NULL, 
            answeredpuzzle VARCHAR(2000) UNIQUE 
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
            DROP TABLE IF EXISTS boards CASCADE;
            `)
            console.log("All tables dropped!")
    }catch(error){
        console.log(error)
    }
}

async function createInitialPuzzles(){
    try{
        console.log("creating sudoku boards")
        console.log("sudoku boards created")
    }catch(error){
        console.log(error)
    }
}


async function testDB(){
    console.log('testing database functions');
}

async function rebuildDB(){
    client.connect();
    await dropTables();
    await createTables();
    client.end()
}

rebuildDB()