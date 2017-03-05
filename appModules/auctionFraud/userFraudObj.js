/**
 * Created by Umar on 02/03/2017.
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

UserFraudObj.prototype.updateBids = function (aucInfo) {
    this.bidsMade[this.bidsMade.length + 1] = {
        auctionID: aucInfo.auctionID,
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

    console.log('Trades: ' + this.tradeTypeCount[tradeType]);
    console.log('trade type count: ' + this.tradeTypeCount);
    this.calcTopTrade(tradeType);
    this.inspectBidTradeType(tradeType, aucInfo);
};

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
    console.log('top trade is: ' + this.topTrade);
    console.log('2nd top trade is: ' + this.secondTopTrade);
};

UserFraudObj.prototype.getIsSuspicious = function(){
    return this.isSuspicious;
};

UserFraudObj.prototype.inspectBidTradeType = function(tradeType, aucInfo){
    if(tradeType != this.topTrade && this.topTrade != undefined){
        if(tradeType != this.secondTopTrade && this.secondTopTrade != undefined){
            this.suspiciousBids.push({
                aucID: aucInfo.auctionID,
                reason: 'unusual trade type user usually bids on ' + this.topTrade + ' & occasionally '
                + this.secondTopTrade + 'but actually bid on ' + tradeType +'.',
                userID: this.userID,
                aucCreator: aucInfo.creatorID
            });
            this.isSuspicious = true;
        }
    }
};



module.exports = UserFraudObj;