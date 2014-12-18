"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* Record the deposit of an asset
*
* @param {decimal} amount
* @param {string} currency
* @param {intenger} external_account_id
* @param {function(err, deposit)} callback
* @returns {Deposit}
*/
module.exports = function (gatewayd) {
  ;

  return function recordDeposit(amount, currency, external_account_id) {
    gatewayd.api.recordDeposit({
      amount: amount,
      currency: currency,
      external_account_id: external_account_id
    }, function (err, deposit) {
      PrettyPrintTable.externalTransactions([deposit]);
    });
  };
};