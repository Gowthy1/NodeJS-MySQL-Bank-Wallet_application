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

    static async createTransaction(req, res) {
        try{
            if(req?.params?.walletId && req?.body?.amount && req?.body?.description){
                const walletId      = req.params.walletId
                const amount        = Number(req.body.amount)
                const description   = req.body.description
    
                const response = WalletService.createTransaction(walletId, amount, description)
                console.log(' Transaction response: ', response)
                res.status(CREATED).send(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }
                if(req.body.amount === undefined){
                    errorResponse.push(Errors.AMOUNT_MISSING)
                }
                if(req.body.description === undefined){
                    errorResponse.push(Errors.DESCRIPTION_MISSING)
                }
    
                res.status(BAD_REQUEST).send({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in createTransactionCtrl: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }

    static async fetchTransactions(req, res) {
        try{
            if(req?.query?.walletId && req?.body?.amount && req?.body?.description){
                const walletId      = req.params.walletId
                const amount        = Number(req.body.amount)
                const description   = req.body.description
    
                const response = WalletService.fetchTransaction(walletId, amount, description)
                console.log(' Transaction response: ', response)
                res.status(CREATED).send(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }
                if(req.body.amount === undefined){
                    errorResponse.push(Errors.AMOUNT_MISSING)
                }
                if(req.body.description === undefined){
                    errorResponse.push(Errors.DESCRIPTION_MISSING)
                }
    
                res.status(BAD_REQUEST).send({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in createTransactionCtrl: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }

    static async fetchWalletById(req, res) {
        try{
            if(req?.params?.id){
                const walletId      = req.params.id
                const amount        = Number(req.body.amount)
                const description   = req.body.description
    
                const response = WalletService.fetchWallet(walletId, amount, description)
                console.log(' Transaction response: ', response)
                res.status(CREATED).send(response)
            }else{
                const errorResponse = []
    
                if(req.params.walletId === undefined){
                    errorResponse.push(Errors.WALLETID_MISSING)
                }    
                res.status(BAD_REQUEST).send({message: errorResponse})
            }
        } catch(error) {
            console.log('[Ctrl] Error in createTransactionCtrl: ', error)
            res.status(NOT_FOUND).send({message:error.message})
        }
    }
}

module.exports = WalletController