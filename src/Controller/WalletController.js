const walletModel   = require('./../Models/index')
const WalletService = require('./../Service/index')

class WalletController {

    static async createWallet(req, res) {
        try {
            if (!req.body) {
                res.status(400).send({ message: "Request body cannot be empty" })
                return
            }
            if (!req.body.balance) {
                res.status(400).send({ message: "Balance is required" })
                return
            }
            if (!req.body.name) {
                res.status(400).send({ message: "Name is required" })
                return
            }

            const result = await WalletService.createWallet(req.body.balance, req.body.name)
            console.log('[ctrl] Create Wallet ', result)
            res.status(201).send({ message: result })
        } catch (error) {
            console.error(' Error in creating wallet : ', error);
            res.status(401).send({
                message: ' ERROR IN CREATION',
                error: error
            })
        }
    }
}

module.exports = WalletController