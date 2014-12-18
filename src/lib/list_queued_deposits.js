var PrettyPrintTable = require(__dirname+'/../views');

/**
* List Deposits
*
* @returns [{Deposits}]
*/
module.exports = function(gatewayd) {;

  return function listQueuedDeposits() {
    gatewayd.api.listQueuedDeposits(function(err, deposits) {
      PrettyPrintTable.externalTransactions(deposits || []);
    });
  }

}

