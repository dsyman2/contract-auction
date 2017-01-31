/**
 * Created by Umar on 27/01/2017.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = {
    getAllCurrentAuctionsFromDB : function(callback){
        var results = [];
        var query = 'SELECT * FROM ' + dbconfig.database + '.' + dbconfig.auction_table;
        connection.query(query, function(err, rows){
            if (err)
                throw err;
            console.log(rows);
            for(var i = 0; i < rows.length; i++){
                var result = {
                    id          : rows[i].id,
                    name        : rows[i].name,
                    description : rows[i].description,
                    length      : rows[i].length,
                    protocol    : rows[i].protocol,
                    creatorID   : rows[i].creatorID
                };
                results.push(result);
            }
            //console.log(results);
            callback(results);
        });
    }
};