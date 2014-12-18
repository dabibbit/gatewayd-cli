
module.exports = function(gatewayd) {
  return function listCurrencies(){
    var currencies = gatewayd.config.get('CURRENCIES') || {};
    for (var _currency in currencies) {
      gatewayd.logger.info(_currency);
    }
  }
}

