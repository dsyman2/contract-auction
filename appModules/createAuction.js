/**
 * Created by Umar on 24/01/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
var idSQL = null;

module.exports = {
     getIDFromName : function (username, callback) {
        console.log("we're just before query 1");
        var query = ('SELECT id FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE username = ?');
        connection.query(query, username, function (err, rows, fields) {
            if (err)
                throw err;
            console.log("YOUL: " + rows[0].id);
            idSQL = rows[0].id;
            console.log("HI -> " + idSQL);
            callback(rows[0].id);
        });
        //console.log(this.id);
        return idSQL;
    },
    addAuctionEntry : function (insertionData, username) {
        console.log("ShIR" + username);
       /* this.getIDFromName(username, function(returnVal){
            console.log(returnVal);
        })//;*/
        //console.log("IDSQL ----> " + idSQL);
       /* var query = ('INSERT INTO ' + dbconfig.database + '.' + dbconfig.auction_table + ' SET ?');
        connection.query(query, insertionData, function(err, res){
           if(err)
               throw err;
           console.log('Last insert ID: ' + res.insertId);
        });*/
    }


}