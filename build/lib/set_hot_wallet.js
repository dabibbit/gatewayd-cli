"use strict";

module.exports = function (gatewayd) {
  return function setHotWallet(address, secret) {
    gatewayd.api.setHotWallet(address, secret, logger.info);
  };
};