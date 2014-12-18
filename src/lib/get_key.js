
module.exports = function(gatewayd) {
  return function getKey(){
    gatewayd.api.getKey(function(err, key){
      if (err) {
        logger.error(err);
        return;
      }
      logger.info(key);
    });
  }
}

