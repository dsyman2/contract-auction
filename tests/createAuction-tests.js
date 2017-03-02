/*
/!**
 * Created by Umar on 26/02/2017.
 *!/
var chai = require('chai');
var expect = chai.expect;
var dbFunctions = require('./config/test_database_modules.js');
var createAuction = require('../appModules/createAuction.js');
var mysql  = require('mysql');
var bcrypt = require('bcrypt-nodejs');

var password = 'helloPass';

var mockUser = {
    username: 'NotRealUser123',
    email: 'myemail@email.com',
    contactNumber: '07929345044',
    accountType: 'Contract Issuer',
    address: '23ML30PK',
    password: bcrypt.hashSync(password, null, null)// use the generateHash function in our user model
};

var auctionData = {
    name: 'auctionJOB',
    description: 'a job of some sorts',
    length: 12,
    protocol: 'English',
    maxGuidePrice: '12999',
    contractType: 'Commercial'
};

var auctionDataBad = {
    name: 'auctionJOB1',
    description: 'a job of some sorts ish',
    length: '11',
    protocol: 'English',
    maxGuidePrice: '12999',
    contractType: 'Commercial'
};


describe('createAuction', function(){

    var id_1;
    var id_2;

    before(function(){

        /!** setting up environment pre-testing**!/
        dbFunctions.createDB(function() {

            dbFunctions.createMockUser(mockUser, function () {
                id_1 = undefined;
                createAuction.addAuctionEntry('1', auctionData, function(insertData, insertId){
                    id_1 = insertId;
                    console.log('hi' + insertId);
                });

                createAuction.addAuctionEntry('1', auctionDataBad, function(insertData, insertId){
                    id_2 = insertId;
                    console.log('hi' + insertId);
                });

            });
        });


    });


    it('addAuctionEntry, basic testing to see if auction adds to DB', function(){
        expect(id_1).to.not.equal(null || 'undefined');
    });


    it('addAuctionEntry, error fields create crash or smart string number recognition', function(){
        expect(id_2).to.not.equal(null);
    });

    it('delete an auction entry that has been added above', function(){
       createAuction.deleteAuction('1', '1', function(deletedID){
           console.log(deletedID);
           expect(deletedID).to.not.equal(null);
       });

    });

    /!*after(function(){
        dbFunctions.deleteDB();
    });*!/
});

*/
