
module.exports = function(gatewayd) {
  return function() {
    gatewayd.api.generateWallet(function(error, wallet) {
      if (error) {
        throw new Error(error);
      } else {
        logger.info(wallet);
      }
    });
  }
};

