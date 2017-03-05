/**
 * Created by Umar on 02/03/2017.
 */
var UserFraudObj = require('./userFraudObj');
var users = {};
var count = 0;

module.exports = {

    updateUserBids : function(id, username, aucInfo){
        if(users[username]){
            count++;
            //update that user
            users[username].updateBids(aucInfo);
            console.log('i worked old user');
            console.log('count is: ' + count)
        }
        else{
            //create the user
            count++;
            users[username] = new UserFraudObj(id);
            users[username].updateBids(aucInfo);
            console.log('i worked new user');
            console.log('count is: ' + count)
        }
    },

    getUsers : function() {
        return users;
    },

    getAllSuspiciousUsers : function() {
        var suspiciousUsers = {};

        for(var user in users){
            if(users.hasOwnProperty(user)){
                if(users[user].getIsSuspicious() === true){
                    console.log(users[user].suspiciousBids);
                    suspiciousUsers[user] = (users[user].suspiciousBids);
                   // suspiciousUsers.push(user)
                }
            }
        }

        return suspiciousUsers;
    }

};