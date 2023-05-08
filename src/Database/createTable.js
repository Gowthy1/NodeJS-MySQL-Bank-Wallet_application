const WALLET_TABLE = "CREATE TABLE WALLET_INFO ( WALLET_ID int PRIMARY KEY NOT NULL auto_increment, FIRSTNAME varchar(255) NOT NULL, LASTNAME varchar(255) NOT NULL, BALANCE int NOT NULL, CREATION_DATE datetime )"
const TRANSACTION_TABLE = "CREATE TABLE TRANSACTION_INFO ( TRANSACTION_ID int NOT NULL UNIQUE, WALLET_ID int, AMOUNT int, DESCRIPTION varchar(255), TYPE varchar(10), BALANCE int, TRANSACTION_DATE datetime, FOREIGN KEY(WALLET_ID) REFERENCES WALLET_INFO (WALLET_ID));"


const TABLE_QUERIES = [
    WALLET_TABLE,
    TRANSACTION_TABLE
]



module.exports = TABLE_QUERIES

/*

TABLE 1 

ID, NAME, BALANCE, TRANSACTION_ID, CREATION_DATE


TABLE 2

ID, AMOUNT, DESCRIPTION, TRANSACTION_ID, TYPE, BALANCE

CREATE DATABASE SISI;

USE SISI;
CREATE TABLE Persons (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);

INSERT INTO Persons( PersonID, LastName, FirstName, Address, City) VALUES(1,'PUPPALA','SISIRA','TEST ADDRESS', 'RJY');

SHOW TABLES;

SELECT * FROM Persons;
*/