"use strict";

/**
* Enqueue Outgoing Payment
*
* @param {string} address
* @param {string} amount 
* @param {string} currency
* @param {string} issuer
* @returns {RippleTransaction}
*/

module.exports = function (gatewayd) {
  return function enqueueOutgoingPayment(address, amount, currency, issuer) {
    gatewayd.api.enqueueOutgoingPayment({
      amount: amount,
      currency: currency,
      address: address,
      isuser: issuer
    }, function (error, payment) {
      if (error) {
        logger.info("Error enqueuing outgoing payment");
        logger.error(error);
      } else {
        logger.info("Successfully enqueued outgoing payment");
        logger.info(payment.toJSON());
      }
    });
  };
};