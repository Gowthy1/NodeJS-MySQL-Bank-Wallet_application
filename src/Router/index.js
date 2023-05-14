const express = require('express')
const router  = express.Router()

const { DatabaseController, WalletController } = require('./../Controller/index')

router.get('/sisira', (req, res) => {
    console.log(' SERVICE IS RUNINNG ')
    res.send(" Hey Puppala, our service is running ")
})

router.post('/create-database',     DatabaseController.createDatabase)
router.post('/create-table',        DatabaseController.createTables)
router.post('/setup',               WalletController.createWallet)
router.post('/transact/:walletId',  WalletController.createTransaction)
router.get('/transactions',         WalletController.fetchTransactions);
router.get('/wallet/:id',           WalletController.fetchWalletById);

module.exports = router