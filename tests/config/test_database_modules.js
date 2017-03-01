/**
 * Created by Umar on 26/02/2017.
 */
var mysql = require('mysql');
var dbconfig = require('./test_database.js');

var connection = mysql.createConnection(dbconfig.connection);

module.exports = {
    createMockUser: function(userObj, callback){
        var insertQuery = 'INSERT INTO users SET ?';
        connection.query(insertQuery, userObj, function(err, res){
            if(err)
                throw err;
            console.log('Last insert ID: ' + res.insertId);
            callback();

        });
    },

    deleteDB : function(){
        connection.query('DROP DATABASE ' + dbconfig.database);
    },

    createDB : function(){
        var connection = mysql.createConnection(dbconfig.connection);

        connection.query('CREATE DATABASE ' + dbconfig.database);

        connection.query('\
            CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                `username` VARCHAR(255) NOT NULL, \
                `password` CHAR(60) NOT NULL, \
                `email` VARCHAR(255) NOT NULL,\
                `contactNumber` VARCHAR(255) NOT NULL,\
                `accountType` TINYTEXT NOT NULL,\
                `address` VARCHAR(255) NOT NULL,\
                    PRIMARY KEY (`id`), \
                UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
                UNIQUE INDEX `username_UNIQUE` (`username` ASC), \
                UNIQUE INDEX `email_UNIQUE` (`email` ASC), \
                UNIQUE INDEX `address_UNIQUE` (`address` ASC)\
            )');

        connection.query('\
            CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.auction_table + '` ( \
                `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                `name` TEXT NOT NULL, \
                `description` LONGTEXT NOT NULL,\
                `length` INT UNSIGNED NOT NULL, \
                `protocol` TEXT NOT NULL, \
                `creatorID` INT UNSIGNED NOT NULL, \
                `maxGuidePrice` TEXT, \
                `contractType` TEXT NOT NULL,\
                    PRIMARY KEY (`id`), \
                UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
                    CONSTRAINT `fk_PerAuction` FOREIGN KEY (`creatorID`)'
                        + ' REFERENCES `'
                        + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`) \
            )');

        connection.query('\
            CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.results_table + '` ( \
                `resultID` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                `id` INT UNSIGNED NOT NULL, \
                `name` TEXT NOT NULL, \
                `description` LONGTEXT NOT NULL,\
                `length` INT UNSIGNED NOT NULL, \
                `protocol` TEXT NOT NULL, \
                `creatorID` INT UNSIGNED NOT NULL, \
                `maxGuidePrice` TEXT, \
                `contractType` TEXT NOT NULL,\
                `price` TEXT NOT NULL,\
                `winnerID` INT UNSIGNED NOT NULL,\
                    PRIMARY KEY (`resultID`), \
                UNIQUE INDEX `id_UNIQUE` (`resultID` ASC), \
                    CONSTRAINT `fk_PerRes` FOREIGN KEY (`creatorID`)'
                        + ' REFERENCES `'
                        + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`), \
                    CONSTRAINT `fk_PerRes2` FOREIGN KEY (`winnerID`)'
                        + ' REFERENCES `'
                        + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`) \
            )');


        connection.query('\
            CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.unresolved_table + '` ( \
                `unresolvedID` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
                `id` INT UNSIGNED NOT NULL, \
                `name` TEXT NOT NULL, \
                `description` LONGTEXT NOT NULL,\
                `length` INT UNSIGNED NOT NULL, \
                `protocol` TEXT NOT NULL, \
                `creatorID` INT UNSIGNED NOT NULL, \
                `maxGuidePrice` TEXT, \
                `contractType` TEXT NOT NULL, \
                    PRIMARY KEY (`unresolvedID`), \
                UNIQUE INDEX `id_UNIQUE` (`unresolvedID` ASC), \
                    CONSTRAINT `fk_PerUnres` FOREIGN KEY (`creatorID`)'
                        + ' REFERENCES `'
                        + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`) \
            )');

        console.log('Success: Database Created!');

        connection.end();

    }
}