"use strict";

module.exports = function (gatewayd) {
  return function () {
    gatewayd.api.restartGateway();
  };
};