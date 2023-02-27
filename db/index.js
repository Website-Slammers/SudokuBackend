const pg = require('pg');

const client = new pg.Client(process.env.DB_URL||`postgres://localhost:5432/sudoku`);

module.exports = {
    client
}
