const mysql    = require('mysql2/promise');
const dbConfig = require('./../Config/db.config')

let connection

async function dbConnection() {
    if (!connection) {
        try {
            console.log('211111', process.env.DB_HOST , dbConfig.HOST)
            console.log('2222', process.env.DB_USER , dbConfig.USER)
            console.log('33333', process.env.DB_PASSWORD , dbConfig.PASSWORD)
            console.log('44444', process.env.DB_NAME , dbConfig.DATABASE)

            connection = await mysql.createConnection({
                host: process.env.DB_HOST || dbConfig.HOST,
                user: process.env.DB_USER || dbConfig.USER,
                password: process.env.DB_PASSWORD || dbConfig.PASSWORD,
                database: process.env.DB_NAME || dbConfig.DATABASE
            });

            console.log(' Connection created ');
        } catch (error) {
            console.error(' Error in creating db connection ', error)
            throw error
        }
    }
    return connection
}

module.exports = dbConnection