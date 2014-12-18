"use strict";

module.exports = function (gatewayd) {
  return function removeCurrency(currency) {
    gateway.api.removeCurrency(currency, function (err, currencies) {
      for (var _currency in currencies) {
        logger.info(_currency);
      }
    });
  };
};