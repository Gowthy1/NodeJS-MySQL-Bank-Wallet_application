const database = require('./../Models/index')

class WalletService {
    static async createWallet(balance, name) {
        try {
            const dbResponse = await database.insertWallet(balance, name)
            console.log(' DB RESPONSE: ', dbResponse)
            const response = {
                id: dbResponse.WALLET_ID,
                name: dbResponse.NAME,
                balance: dbResponse.BALANCE,
                createdDate: dbResponse.CREATION_DATE
            }
            return response
        } catch (error) {
            console.error(` [Service] Error in creating wallet `, error)
            throw error
        }
    }

    static async createTransaction(walletId, amount, description) {
        try {
            const dbResponse = await database.updateWallet(walletId, amount, description)
            console.log(' DB RESPONSE: ', dbResponse)
            const response = {
                id: dbResponse.WALLET_ID,
                name: dbResponse.NAME,
                balance: dbResponse.BALANCE,
                createdDate: dbResponse.CREATION_DATE
            }
            return response
        } catch (error) {
            console.error(` [Service] Error in creating wallet `, error)
            throw error
        }
    }
}

module.exports = WalletService