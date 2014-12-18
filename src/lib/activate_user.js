
/**
* Activate User
*
* @param userId Integer
* @returns {User}
*/

module.exports = function(gatewayd) {

  return function activateUser(userId) {
    gatewayd.api.activateUser(userId, function(err, user){
      if (err) {
        logger.error(err);
      } else {
        logger.info(user.toJSON());
      }
    });
  }
}


