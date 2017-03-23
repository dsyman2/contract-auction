/**
 * Created by Umar on 08/03/2017.
 */
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var app = require('../app.js');
var expect = chai.expect;
var should = chai.should();

