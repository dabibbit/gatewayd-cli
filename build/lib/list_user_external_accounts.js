"use strict";

var PrettyPrintTable = require(__dirname + "/../views");

/**
* List User External Accounts
*
* @param userId
* @returns [{ExternalAccount}]
*/

module.exports = function (gatewayd) {
  ;

  return function listUserExternalAccounts(userId) {
    gatewayd.api.listUserExternalAccounts(userId, function (err, accounts) {
      if (err) {
        logger.error(err);
        return;
      }
      PrettyPrintTable.externalAccounts(accounts);
    });
  };
};