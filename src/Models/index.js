const dbConnection = require('./getConnection')

const insertWallet = async (balance, name) => {
  try {
    const connection = await dbConnection()
    const date = new Date()

    const insertResult = await connection.query(
      `INSERT INTO WALLET_INFO ( NAME, BALANCE, CREATION_DATE) VALUES(?, ?, ?)`,
      [name, balance, date]
    )
    // console.log(' INSERT Successful ', insertResult)
    // console.log(' INSERT ---> ', insertResult[0].insertId)

    const selectInsertedRow = await connection.query(
      `SELECT * FROM WALLET_INFO WHERE WALLET_ID = ?`,
      [insertResult[0].insertId]
    )

    console.log(' RESULT: ', selectInsertedRow[0])
    return selectInsertedRow[0]?.[0]
  } catch (error) {
    console.error(' FAILED in inserting wallet: ', error)
    throw error
  }
}

const updateWallet = async (walletId, amount, description) => {
  try {
    const connection = await dbConnection()
    const date = new Date()

    const insertResult = await connection.query(
      `INSERT INTO WALLET_INFO ( NAME, BALANCE, CREATION_DATE) VALUES(?, ?, ?)`,
      [name, balance, date]
    )
    // console.log(' INSERT Successful ', insertResult)
    // console.log(' INSERT ---> ', insertResult[0].insertId)

    const selectInsertedRow = await connection.query(
      `SELECT * FROM WALLET_INFO WHERE WALLET_ID = ?`,
      [insertResult[0].insertId]
    )

    console.log(' RESULT: ', selectInsertedRow[0])
    return selectInsertedRow[0]?.[0]
  } catch (error) {
    console.error(' FAILED in inserting wallet: ', error)
    throw error
  }
}

module.exports = {
  insertWallet,
  updateWallet
}