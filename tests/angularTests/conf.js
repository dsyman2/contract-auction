/**
 * Created by Umar on 08/03/2017.
 */

var url = 'http://localhost:8000';

exports.config = {
    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['testForApp.js'],
    mochaOpts: {
        slow: 3000
    },
    capabilities: {
        'browserName': 'chrome'
    },

    onPrepare: function () {

        browser.baseUrl = url;
        browser.driver.get(browser.baseUrl + '/login');

        browser.driver.findElement(by.name('username')).sendKeys('mike');
        browser.driver.findElement(by.name('password')).sendKeys('123');
        browser.driver.findElement(by.tagName('button')).click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /app/.test(url);
            });
        }, 1000);
    }
};