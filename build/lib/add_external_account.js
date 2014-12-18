"use strict";

/**
* Add External Account
*
* @param name
* @param userId
* @returns [{ExternalAccount}]
*/

module.exports = function (gatewayd) {
  return function addExternalAccount(name, userId) {
    gatewayd.data.externalAccounts.create({ name: name, user_id: userId }, function (err, account) {
      if (err) {
        gatewayd.logger.error(err);
      } else {
        gatewayd.logger.info(account);
      }
    });
  };
};