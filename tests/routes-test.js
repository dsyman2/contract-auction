/**
 * Created by Umar on 26/02/2017.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app.js');
var expect = chai.expect;
var should = chai.should();
var postAucDataGetter = require('../appModules/postAuctionDataGetter.js');

describe('post auc data getter tests', function(){

   it('should get all auctions that are completed that the user has created', function(done){
       chai.request(app)
           .get('/contactDetails')
           .query({id: '1'})
           .end(function(err, res){
               //expect(res.status).to.equal(200);
               expect(res.status).to.equal(200);
               expect(res.body.username).to.not.equal(null);
               res.should.have.status(200);
               res.body.should.be.a('object');
               done();
           });
   });

   it('should get results depending on user type as array', function(done){
        postAucDataGetter.getResultsByUserID('1', 'winner', function(res){
            res.should.be.a('array');
        });

       postAucDataGetter.getResultsByUserID('1', 'creator', function(res){
           res.should.be.a('array');
           done();
       });
   });

   it('should get a list of unresolved auctions', function(done){
       postAucDataGetter.getUnresolvedByUserID('1', function(res){
            res.should.be.a('array');
       });

       postAucDataGetter.getUnresolvedByUserID('3', function(res){
           expect(res.length).to.equal(0);
           done();
       });
   });

   /*it('it should return all unresolved auctions the user has created', function(done){
       chai.request(app)
           .get('/unresolvedAuctions')
           .send({ user: 'pedro', password: '123' })
           .end(function(err, res){
               //expect(res.status).to.equal(200);
               expect(res.status).to.equal(200);
               expect(res.body.username).to.not.equal(null);
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           });
   });*/
});
