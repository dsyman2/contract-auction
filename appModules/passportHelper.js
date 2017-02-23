/**
 * Created by Umar on 22/02/2017.
 */
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports ={

    isUniqueInfo : function(address, req, callback){
        connection.query("SELECT * FROM " + dbconfig.database + "." + dbconfig.users_table + " WHERE email = ?", req.body.email, function(err, rows) {
            if(err)
                throw err;
            if(rows.length){
                callback(false, 'That username is already taken.');
                return;
            }
            else{
                connection.query("SELECT * FROM " + dbconfig.database + "." + dbconfig.users_table + " WHERE username = ?", req.body.username, function(err, rows) {
                    if(err)
                        throw err;
                    if(rows.length){
                        callback(false, 'That email is already taken.');
                        return;
                    }
                    else{
                        connection.query("SELECT * FROM " + dbconfig.database + "." + dbconfig.users_table + " WHERE contactNumber = ?", req.body.contactNumber, function(err, rows) {
                            if (err)
                                throw err;
                            if (rows.length) {
                                callback(false, 'That contact number is already taken.');
                                return;
                            }
                            else {
                                connection.query("SELECT * FROM " + dbconfig.database + "." + dbconfig.users_table + " WHERE address = ?", address, function(err, rows) {
                                    if (err)
                                        throw err;
                                    if (rows.length) {
                                        callback(false, 'That address is already taken.');
                                        return;
                                    }
                                });
                            }
                        });
                    }
                });
                callback(true, '');
                return;
            }
        });
    }


}