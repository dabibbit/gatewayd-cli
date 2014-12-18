var RippleRestClient = require('ripple-rest-client');
var PrettyPrintTable = require(__dirname+'/../views');
var async = require('async');

module.exports = function(gatewayd) {

  var rippleRestClient = new RippleRestClient({
    api: gatewayd.config.get('RIPPLE_REST_API'),
    account: gatewayd.config.get('HOT_WALLET').address
  });

  return function fundHotWallet(amount, currency, secret, callback) {
    var options = {
      amount: amount,
      currency: currency,
      secret: secret
    };

    async.waterfall([
      function(next){
        gatewayd.api.fundHotWallet(options, next);
      },
      function(){
        rippleRestClient.getAccountBalance(function(error, balances) {
          if (error) {
            return callback(error, null);
          } else {
            PrettyPrintTable.balances(balances.balances);
          }
        });
      }
    ], callback);

  }
}
