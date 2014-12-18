"use strict";

module.exports = function (gatewayd) {
  return function setLastPaymentHash(hash) {
    gatewayd.api.setLastPaymentHash(hash).then(function (newlySetHash) {
      logger.info("set the last payment hash to", newlySetHash);
    }).error(function (error) {
      logger.error(error);
    });
  };
};