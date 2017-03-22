/**
 * Created by Umar on 02/03/2017.
 *
 * This Script provides a module which controls the creation
 * of user fraud objects. it also contains functions to access
 * them as well maintaining them.
 */

var UserFraudObj = require('./userFraudObj');
var users = {};
var count = 0;

/***
 * Export to be used in caller script.
 * @type {{updateUserBids: module.exports.updateUserBids, getAllSuspiciousUsers: module.exports.getAllSuspiciousUsers}}
 */
module.exports = {
    /**
     * Updates the list of userFraud Objects with a new bid,
     * creates a new userFraud Object if one does not exist
     * for the user
     * @param id
     * @param username
     * @param aucInfo
     */
    updateUserBids : function(id, username, aucInfo){
        if(users[username]){
            //update that user
            users[username].updateBids(aucInfo);
        }
        else{
            //create the user
            users[username] = new UserFraudObj(id);
            users[username].updateBids(aucInfo);
        }
    },

    /**
     * Gets all the users who are deemed suspicious
     * @returns suspicious users in an object of objects
     */
    getAllSuspiciousUsers : function() {
        var suspiciousUsers = {};

        for(var user in users){
            if(users.hasOwnProperty(user)){
                if(users[user].getIsSuspicious() === true){
                    suspiciousUsers[user] = (users[user].suspiciousBids);
                }
            }
        }

        return suspiciousUsers;
    }

};