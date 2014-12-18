
module.exports = function(gatewayd) {
  return function() {
    var application = new gatewayd.Application();
    application.start();
  };
}

