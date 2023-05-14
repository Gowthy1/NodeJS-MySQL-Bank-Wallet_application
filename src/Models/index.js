const dbConnection = require('./getConnection')
const ULID = require('ulid')

const insertWallet = async (balance, name) => {
  try {
    const connection = await dbConnection()
    const date = new Date()

    const walletId = ULID.ulid()

    const insertResult = await connection.query(
      `INSERT INTO WALLET_INFO ( WALLET_ID, NAME, BALANCE, CREATION_DATE) VALUES(?, ?, ?, ?)`,
      [walletId, name, balance, date]
    )
    console.log(' INSERT Successful ', insertResult)
    console.log(' INSERT ---> ', insertResult[0].insertId)

    const selectInsertedRow = await connection.query(
      `SELECT * FROM WALLET_INFO WHERE WALLET_ID = ?`,
      [walletId]
    )

    console.log(' RESULT: ', selectInsertedRow[0])
    return selectInsertedRow[0]?.[0]
  } catch (error) {
    console.error(' FAILED in inserting wallet: ', error)
    throw error
  }
}

const createTransaction = async (walletId, amount, description) => {
  try {
    const connection = await dbConnection()
    const date = new Date()

    const transactionId = ULID.ulid()

    await connection.beginTransaction()

    const selectRow = await connection.query(
      `SELECT BALANCE FROM WALLET_INFO WHERE WALLET_ID = ?`,
      [walletId]
    )

    console.log(' Selected Row -> ', selectRow[0])
    console.log(' Selected Row -> ', selectRow[0][0].BALANCE)
    let updatedBalance = (selectRow[0]?.[0]?.BALANCE ?? 0) + amount

    console.log(' UpdatedBalance: ', updatedBalance)

    const updateRow = await connection.query(
      ' UPDATE WALLET_INFO SET BALANCE = ? WHERE WALLET_ID = ?',
      [ updatedBalance, walletId ]
    )

    console.log(' updateRow---> ', updateRow[0])

    const type = amount < 0 ? 'DEBIT' : 'CREDIT'
    const insertResult = await connection.query(
      `INSERT INTO TRANSACTION_INFO ( TRANSACTION_ID, WALLET_ID, AMOUNT, DESCRIPTION, TYPE, BALANCE) VALUES(?, ?, ?, ?, ?, ?)`,
      [ transactionId, walletId, amount, description, type, updatedBalance]
    )
    console.log(' INSERT Successful ', insertResult)

    await connection.commit()

    console.log(' RESULT--> : ', transactionId, updatedBalance )
    return { transactionId, balance: updatedBalance }
  } catch (error) {
    console.error(' FAILED in inserting wallet: ', error)
    throw error
  }
}

const fetchTransactions = async (walletId, skip, limit) => {
  try{
    const connection = await dbConnection()

    const fetchTransactions = await connection.query(
      ` SELECT * FROM TRANSACTION_INFO WHERE WALLET_ID = ? LIMIT ? OFFSET ?`,
      [walletId, limit, skip]
    )

    console.log(' RESULTANAT: ', fetchTransactions)
    return fetchTransactions[0]
  } catch(error){
    console.error(' FAILED in getTransactions: ', error)
    throw error
  }
}

const fetchWalletById = async (walletId) => {
  try{
    const connection = await dbConnection()

    const fetchWallet = await connection.query(
      ` SELECT * FROM WALLET_INFO WHERE WALLET_ID = ? `,
      [walletId]
    )

    console.log(' fetchWallet : ', fetchWallet)
    return fetchWallet[0]
  } catch(error){
    console.error(' FAILED in fetchWalletById: ', error)
    throw error
  }
}

module.exports = {
  insertWallet,
  createTransaction,
  fetchTransactions,
  fetchWalletById
}