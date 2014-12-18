"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* List Failed Payments
*
* @returns [{RippleTransaction}]
*/
module.exports = function (gatewayd) {
  return function listFailedPayments() {
    gatewayd.api.listFailedPayments(function (err, transactions) {
      if (err) {
        logger.error("listFailedPayments:failed", err);
      } else {
        PrettyPrintTable.payments(transactions);
      }
    });
  };
};