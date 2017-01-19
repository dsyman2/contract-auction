
var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
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


console.log('Success: Database Created!')

connection.end();
