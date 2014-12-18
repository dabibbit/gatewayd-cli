"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* List Users
*
* @returns [{User}]
*/

module.exports = function (gatewayd) {
  return function listUsers() {
    gatewayd.api.listUsers(function (err, users) {
      if (err) {
        logger.error(err);
        return;
      }
      PrettyPrintTable.users(users);
    });
  };
};