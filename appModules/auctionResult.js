/**
 * Created by Umar on 12/02/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
//var idSQL = null;
var userUtilities = require('../appModules/userUtilities');

module.exports = {
    getResultsByUserID : function(username, callback){
        userUtilities.getIDFromName(username, function(id){
            var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.results_table + ' WHERE creatorID = ? OR winnerID = ?');
            connection.query(query, [id,id], function(err, rows){
                if(err)
                    throw err;
                callback(rows);
            });
        });
    }
};
