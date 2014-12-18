var PrettyPrintTable = require(__dirname+'/../views');

/**
* Clear Withdrawal
* @param {integer} id
* @returns [{ExternalTransaction}]
*/

module.exports = function(gatewayd) {
  function clearWithdrawal(id){
    gatewayd.api.clearWithdrawal(id, function(err, withdrawal) {
      if (err) {
        gatewayd.logger.error('failed');
        return;
      }
      PrettyPrintTable.externalTransactions([withdrawal]);
    });
  }
}

