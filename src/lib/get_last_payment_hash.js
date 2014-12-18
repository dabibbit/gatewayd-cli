
module.exports = function (gatewayd){
  return function() {
    gatewayd.api.getOrFetchLastPaymentHash()
      .then(function(hash){
        logger.info(hash);
      })
      .error(function(error){
        logger.error(error);
      });
  }
};
