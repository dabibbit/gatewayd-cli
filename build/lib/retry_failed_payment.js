"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* Retry Failed Payment
*
* @param rippleTransactionId Integer
* @returns {RippleTransaction}
*/
module.exports = function (gatewayd) {
  return function retryFailedPayment(rippleTransactionId) {
    gatewayd.logger.info("in retry failed payment");
    gatewayd.api.retryFailedPayment(rippleTransactionId, function (err, transaction) {
      logger.info("called retry failed payment api call.");
      if (err) {
        gatewayd.logger.error(err);
      } else {
        PrettyPrintTable.payments([transaction]);
      }
    });
  };
};