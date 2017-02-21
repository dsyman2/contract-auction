/**
 * Created by Umar on 12/02/2017.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

module.exports = {
    getIDFromName : function (username, callback) {
        console.log("we're just before query 1");
        var query = ('SELECT id FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE username = ?');
        connection.query(query, username, function (err, rows, fields) {
            if (err)
                throw err;
            console.log("YOUL: " + rows[0].id);
            callback(rows[0].id);
        });
    },

    updateUserProfile : function (userId, profileInfo, callback) {
        var query = ('SELECT * FROM ' + dbconfig.database + '.' + dbconfig.users_table
        + ' WHERE email = ? OR contactNumber = ?');

        connection.query(query, [profileInfo.email, profileInfo.contactNumber], function(err, rows) {
            if (err)
                throw err;
            if (rows.length) {
                callback(false);
            } else {
                var query2 = ('UPDATE ' + dbconfig.database + '.' + dbconfig.users_table
                + ' SET email = ?, contactNumber = ? WHERE id = ?');
                connection.query(query2, [profileInfo.email, profileInfo.contactNumber, userId], function (err, rows) {
                    if (err)
                        throw err;
                    console.log(rows[0]);
                    callback(true);
                });
            }
        });
    }

};

