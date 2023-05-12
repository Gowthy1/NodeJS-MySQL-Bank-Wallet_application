const express = require('express')
const router  = express.Router()

const WalletController = require('./../Controller/index')
const DatabaseController = require('./../Controller/databaseController')

router.get('/sisira', (req, res) => {
    console.log(' SERVICE IS RUNINNG ')

    res.send(" Hey Puppala, our service is running ")
})

router.post('/create-database', DatabaseController.createDatabase)
router.post('/create-table', DatabaseController.createTables)
router.post('/setup', WalletController.createWallet)

module.exports = router