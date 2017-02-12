
var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

/*connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(255) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
    `email` VARCHAR(255) NOT NULL,\
    `contactNumber` VARCHAR(255) NOT NULL,\
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC), \
    UNIQUE INDEX `email_UNIQUE` (`email` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.auction_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `name` TEXT NOT NULL, \
    `description` LONGTEXT NOT NULL,\
    `length` INT UNSIGNED NOT NULL, \
    `protocol` TEXT NOT NULL, \
    `creatorID` INT UNSIGNED NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
        CONSTRAINT `fk_PerAuction` FOREIGN KEY (`creatorID`)'
        + ' REFERENCES `'
        + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.results_table + '` ( \
    `auctionID` INT UNSIGNED NOT NULL, \
    `creatorID` INT UNSIGNED NOT NULL, \
    `winnerID` INT UNSIGNED NOT NULL, \
        CONSTRAINT `fk_PerResult` FOREIGN KEY (`creatorID`)'
                + ' REFERENCES `'
                + dbconfig.database + '`.`' + dbconfig.auction_table + '`(`creatorID`), \
        CONSTRAINT `fk_PerAucRes` FOREIGN KEY (`auctionID`)'
                + ' REFERENCES `'
                + dbconfig.database + '`.`' + dbconfig.auction_table + '`(`id`), \
        CONSTRAINT `fk_PerWin` FOREIGN KEY (`winnerID`)'
                + ' REFERENCES `'
                + dbconfig.database + '`.`' + dbconfig.users_table + '`(`id`) \
)');*/

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.results_table + '` ( \
    `resultID` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `id` INT UNSIGNED NOT NULL, \
    `name` TEXT NOT NULL, \
    `description` LONGTEXT NOT NULL,\
    `length` INT UNSIGNED NOT NULL, \
    `protocol` TEXT NOT NULL, \
    `creatorID` INT UNSIGNED NOT NULL, \
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


console.log('Success: Database Created!');

connection.end();
