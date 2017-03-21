/**
 * Created by Umar on 08/03/2017.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Protractor Demo App', function() {
    this.timeout(10000);
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));
    var history = element.all(by.repeater('result in memory'));

    function add(a, b) {
        firstNumber.sendKeys(a);
        secondNumber.sendKeys(b);
        goButton.click();
    }

    beforeEach(function(){
        browser.get('');
    });

    it('should have a history', function() {
        add(1, 2);
        add(3, 4);

        expect(history.count()).to.eventually.equal(2);

        add(5, 6);

        expect(history.count()).to.eventually.equal(3); // This is wrong!
        expect(history.last().getText()).to.eventually.contain('1 + 2');
        expect(history.first().getText()).to.eventually.contain('5 + 6');
    });

});