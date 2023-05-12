const mysql        = require('mysql2/promise');
const dbConfig     = require('../Config/db.config')
const dbConnection = require('./getConnection')

const WALLET_DATABASE = "CREATE DATABASE WALLET"

const WALLET_TABLE = "CREATE TABLE IF NOT EXISTS WALLET_INFO ( WALLET_ID int PRIMARY KEY NOT NULL auto_increment, "
    + "NAME varchar(255) NOT NULL, BALANCE int NOT NULL, CREATION_DATE datetime )"

const TRANSACTION_TABLE = "CREATE TABLE IF NOT EXISTS TRANSACTION_INFO "
    + "( TRANSACTION_ID int NOT NULL UNIQUE, WALLET_ID int, AMOUNT int, DESCRIPTION varchar(255), TYPE varchar(10), BALANCE int,"
    + " TRANSACTION_DATE datetime, FOREIGN KEY(WALLET_ID) REFERENCES WALLET_INFO (WALLET_ID));"


const TABLE_QUERIES = [
    WALLET_TABLE,
    TRANSACTION_TABLE
]

class createResource {
    static async createDatabase() {
        try {
            const connection = await mysql.createConnection({
                host: dbConfig.HOST,
                user: dbConfig.USER,
                password: dbConfig.PASSWORD
            });

            const response = await connection.query(WALLET_DATABASE)
            console.log('DATABSE CREATED... ', response)
        } catch (error) {
            console.error(' Error in Database Creation ', error)
            throw error
        }
    }

    static async createTables() {
        try {
            const connection = await dbConnection()
            const response = await Promise.all([
                TABLE_QUERIES.map(async query => {
                    await connection.query(query)
                })
            ])

            console.log(' TABLE CREATED... ', response)
        } catch (error) {
            console.error(' Error in Table creation ', error)
            throw error
        }
    }
}

module.exports = createResource