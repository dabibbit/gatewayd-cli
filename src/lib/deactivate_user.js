
/**
* Deactivate User
*
* @param userId Integer
* @returns {User}
*/

module.exports = function(gatewayd) {

  return function deactivateUser(userId) {
    gatewayd.api.deactivateUser(userId, function(err, user){
      if (err) {
        logger.error(err);
      } else {
        logger.info(user.toJSON());
      }
    });
  }
}

