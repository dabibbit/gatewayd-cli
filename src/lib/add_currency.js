
module.exports = function(gatewayd) {

  return function addCurrency(currency, amount){
    gateway.api.addCurrency(currency, amount, function(err, currencies){
      for (var _currency in currencies) {
        logger.info(_currency);
      }
    });
  }
}

