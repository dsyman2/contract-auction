/**
 * Created by Umar on 08/03/2017.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;
var url = 'http://localhost:8000';
var EC = protractor.ExpectedConditions;

function login(){

    browser.baseUrl = url;
    browser.driver.get(browser.baseUrl + '/login');

    browser.driver.findElement(by.name('username')).sendKeys('pedro');
    browser.driver.findElement(by.name('password')).sendKeys('123');
    browser.driver.findElement(by.tagName('button')).click();

    return browser.driver.wait(function () {
        return browser.driver.getCurrentUrl().then(function (url) {
            return /app/.test(url);
        });
    }, 1000);
}

describe('Post login tests', function() {
    this.timeout(100000);

    it('should have a title and a bid should be made with current value', function () {
        this.timeout(10000);
        expect(browser.getTitle()).to.eventually.equal('Contract Auction');

            return browser.driver.getCurrentUrl().then(function () {
                browser.driver.findElement(by.name('hello-bidVal')).sendKeys('11').then(
                    browser.driver.findElement(by.name('hello-bid')).click()
                );
            });
    });
});