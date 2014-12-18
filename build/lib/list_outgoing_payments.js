"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* List Outgoing Payments
*
* @returns [{Deposits}]
*/
module.exports = function (gatewayd) {
  return function listOutgoingPayments() {
    gatewayd.api.listOutgoingPayments(function (err, payments) {
      PrettyPrintTable.payments(payments || []);
    });
  };
};