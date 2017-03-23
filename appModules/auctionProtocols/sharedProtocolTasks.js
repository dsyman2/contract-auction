/**
 * Created by Umar on 05/02/2017.
 */

module.exports = {

    moveCompletedAuction : function(auctionEventEmitter, aucInfo){
        auctionEventEmitter.emit('moveCompletedAuc', aucInfo);
    }
};