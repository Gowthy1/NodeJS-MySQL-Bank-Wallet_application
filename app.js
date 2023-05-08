const express   = require('express')
const app       = express()
const Route     = require('./src/Router/index')
const SERVERPORT = 3000
const dbConnection = require('./src/Database/index')
const tableQueries = require('./src/Database/createTable')

app.use(express.json())
app.use('/', Route)

app.get('/database', (req, res) => {
    // const queries = 'CREATE DATABASE wallet'
    // dbConnection.query(queries, (error, results) => {
    //     if (error) {
    //         console.log(' ERRRRRRRR ', error)
    //         throw error;
    //     }
    //     console.log(' RESULT: ', results)
    //     res.send(" SUCCESS")
    // });

    for(const tableQuery of tableQueries) {
        dbConnection.query(tableQuery, (error, results) => {
            if (error) {
                console.log(' ERRRRRRRR ', error)
                throw error;
            }
            console.log(' RESULT: ', results)
        });    
    }
    res.send(" SUCCESS")

})

app.listen( SERVERPORT, () => {
    console.log(' ********** Service Started ************ ')
})