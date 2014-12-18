"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

module.exports = function (gatewayd) {
  return function refundColdWallet(amount, currency) {
    var options = {
      amount: amount,
      currency: currency
    };

    gateway.api.refundColdWallet(options, function () {
      gateway.api.getTrustLines(null, function (error, lines) {
        if (error) {
          return console.log("getTrustLines", error);
        }
        PrettyPrintTable.trustLines(lines);
      });
    });
  };
};