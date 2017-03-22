/**
 * Created by Umar on 02/03/2017.
 *
 * This is a factory which holds all bids a user has made as well as the method of
 * calculating their suspicious status which is effected by the type of bids made
 */

/**
 * Constructor which needs the id to create object for specific user
 * @param id
 * @constructor
 */
function UserFraudObj(id) {
    this.userID = id;
    this.bidsMade = {};
    this.tradeTypeCount = {};
    this.topTrade = undefined;
    this.secondTopTrade = undefined;
    this.suspiciousBids = [];
    this.isSuspicious = false;
}

/**
 * Updates the bids made by the user
 * @param aucInfo
 */
UserFraudObj.prototype.updateBids = function (aucInfo) {
    this.bidsMade[this.bidsMade.length + 1] = {
        auctionID: aucInfo.id,
        tradeType: aucInfo.tradeType,
        contractType: aucInfo.contractType
    };

    var tradeType = aucInfo.tradeType;

    if(this.tradeTypeCount.hasOwnProperty(tradeType)){
        this.tradeTypeCount[tradeType] += 1;
    }
    else{
        this.tradeTypeCount[tradeType] = 1;
    }

    this.calcTopTrade(tradeType);
    this.inspectBidTradeType(tradeType, aucInfo);
};

/***
 * calculates the top bidded trade for this user
 * @param tradeType
 */
UserFraudObj.prototype.calcTopTrade = function (tradeType) {
    if(this.topTrade === undefined){
        this.topTrade = tradeType;
    }
    else {
        if(this.tradeTypeCount[tradeType] > this.tradeTypeCount[this.topTrade]){
            if(this.topTrade != tradeType){
                this.secondTopTrade = this.topTrade;
                this.topTrade = tradeType;
            }
            else{
                this.topTrade = tradeType;
            }
        }
        else if(tradeType === this.topTrade){
            this.topTrade = tradeType;
        }
        else if(this.secondTopTrade === undefined){
            this.secondTopTrade = tradeType;
        }
        else {
            if(this.tradeTypeCount[tradeType] > this.tradeTypeCount[this.secondTopTrade]){
                this.secondTopTrade = tradeType;
            }
        }
    }
};

/**
 * Returns the suspicious status of user
 * @returns {boolean}
 */
UserFraudObj.prototype.getIsSuspicious = function(){
    return this.isSuspicious;
};

/**
 * Inspects the bid made to see if it is inline with the usual bids made
 * by the user.
 * @param tradeType
 * @param aucInfo
 */
UserFraudObj.prototype.inspectBidTradeType = function(tradeType, aucInfo){
    if(tradeType != this.topTrade && this.topTrade != undefined){
        if(tradeType != this.secondTopTrade && this.secondTopTrade != undefined){
            this.suspiciousBids.push({
                aucID: aucInfo.id,
                aucName: aucInfo.name,
                reason: 'unusual trade type user usually bids on ' + this.topTrade + ' & occasionally '
                + this.secondTopTrade + ' but actually bid on ' + tradeType +'.',
                userID: this.userID,
                aucCreator: aucInfo.creatorID
            });
            this.isSuspicious = true;
        }
    }
};

module.exports = UserFraudObj;