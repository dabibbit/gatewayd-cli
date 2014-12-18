
module.exports = function(gatewayd) {
  return function(){
    gatewayd.api.listProcesses({ json: false }, function(err, processes){
      gatewayd.logger.info(processes);
    }); 
  }
};
