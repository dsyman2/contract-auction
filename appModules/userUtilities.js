/**
 * Created by Umar on 12/02/2017.
 *
 * This module provides extra functions which are useful to do
 * user based tasks.
 */

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);

/**
 * This module provides extra functions which are useful to do user based tasks.
 * @type {{getIDFromName: module.exports.getIDFromName, updateUserProfile: module.exports.updateUserProfile}}
 */
module.exports = {

    /**
     * Converts user id to a username via the database
     * @param username
     * @param callback
     */
    getIDFromName : function (username, callback) {
        var query = ('SELECT id FROM ' + dbconfig.database + '.' + dbconfig.users_table + ' WHERE username = ?');
        connection.query(query, username, function (err, rows) {
            if (err)
                throw err;
            callback(rows[0].id);
        });
    },

    /**
     * Updates user details with the provided parameters
     * @param userId
     * @param profileInfo
     * @param callback
     */
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
                connection.query(query2, [profileInfo.email, profileInfo.contactNumber, userId], function (err) {
                    if (err)
                        throw err;
                    callback(true);
                });
            }
        });
    }

};

