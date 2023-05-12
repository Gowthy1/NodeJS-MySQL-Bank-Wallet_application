const express    = require('express')
const app        = express()
const Route      = require('./Router/index')
const SERVERPORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', Route)


app.listen( SERVERPORT, () => {
    console.log(' ********** Service Started ************ ')
})