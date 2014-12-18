"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

module.exports = function (gatewayd) {
  return function () {
    gatewayd.api.listCleared(function (err, deposits) {
      if (err) {
        logger.error(err);
        return;
      }
      PrettyPrintTable.clearedTransactions(deposits || []);
    });
  };
};