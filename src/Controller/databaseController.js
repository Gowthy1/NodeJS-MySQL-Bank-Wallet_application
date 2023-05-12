const CreateResource = require('./../Models/createResource')

class DatabaseController {
    static async createDatabase(req, res) {
        try {
            await CreateResource.createDatabase()
            res.status(201).send({ message: ' Database Created ' })
        } catch (error) {
            console.error(' Error in Database creation ', error)
            res.status(500).send({ message: ' Unable to create database ' })
        }
    }

    static async createTables(req, res) {
        try {
            await CreateResource.createTables()
            res.status(201).send({ message: ' Tables Created ' })
        } catch (error) {
            console.error(' Error in Table creation ', error)
            res.status(500).send({ message: ' Unable to create tables ' })
        }
    }
}

module.exports = DatabaseController