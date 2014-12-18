"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

module.exports = function (gatewayd) {
  return function getTrustLines() {
    gatewayd.api.getTrustLines(null, function (err, lines) {
      PrettyPrintTable.trustLines(lines);
    });
  };
};