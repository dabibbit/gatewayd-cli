var PrettyPrintTable = require(__dirname+'/../views');

/**
* List Incoming Payments
*
* @returns [{RipplePayment}]
*/

module.exports = function(gatewayd) {

  return function listIncomingPayments() {
    gatewayd.api.listIncomingPayments(function(err, payments){
      PrettyPrintTable.payments(payments || []);
    });
  }
}

