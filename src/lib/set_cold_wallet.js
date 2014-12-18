
module.exports = function(gatewayd) {
  return function setColdWallet(address){
    var coldWallet = gatewayd.config.get('COLD_WALLET');
    if (coldWallet) {
      gatewayd.logger.info('cold wallet already set:', coldWallet);
    } else {
      gatewayd.config.set('COLD_WALLET', address);
      gatewayd.config.save(function(){
        gatewayd.logger.info('set cold wallet address to:', address);
      });
    }
  }
}

