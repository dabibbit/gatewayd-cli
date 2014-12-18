"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* List Withdrawals
*
* @returns [{ExternalTransaction}]
*/

module.exports = function (gatewayd) {
  return function listQueuedWithdrawals() {
    gateway.api.listQueuedWithdrawals(function (err, withdrawals) {
      if (err) {
        logger.error("listQueuedWithdrawals:failed");
        return;
      }

      PrettyPrintTable.externalTransactions(withdrawals);
    });
  };
};