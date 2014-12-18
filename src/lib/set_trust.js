var PrettyPrintTable = require(__dirname+'/../views');

module.exports = function(gatewayd) {

  return function setTrustLine(currency, amount){

    gatewayd.api.setTrustLine({currency: currency, amount: amount}, function () {
      gatewayd.api.getTrustLines(null, function(err, lines){
        PrettyPrintTable.trustLines(lines);
      });
    });
  }
}

