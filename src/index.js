var program = require('commander');
const requireAll = require('require-all-to-camel');
var cli = requireAll(__dirname+'/lib');
var promptly = require('promptly');

module.exports = function(gatewayd) {
  var CLI = {};
  Object.keys(cli).forEach(function(key) {
    CLI[key] = cli[key](gatewayd);
  });

  program
    .version('1.1.0')
    .option('-j, --json', 'json format');

  program
    .command('list_incoming_payments')
    .description('list incoming ripple payments in the queue to be processed')
    .action(CLI.listIncomingPayments);

  program
    .command('list_cleared')
    .description('get cleared transactions')
    .action(CLI.listCleared);

  program
    .command('list_queued_withdrawals')
    .description('get queued withdrawals to external accounts')
    .action(CLI.listQueuedWithdrawals);

  program
    .command('clear_withdrawal <external_transaction_id>')
    .description('clear pending withdrawal to external account')
    .action(CLI.clearWithdrawal);

  program
    .command('fund_hot_wallet <amount> <currency>')
    .description('issue funds from cold wallet to hot wallet') 
    .action(function(amount, currency) {
      promptly.password('Cold wallet secret: ', function(err, secret) {
        if (!err) {
          CLI.fundHotWallet(amount, currency, secret);
        }
      });
    });

  program
    .command('record_deposit <amount> <currency> <external_account_id>')
    .description('record a deposit in the deposit processing queue')
    .action(CLI.recordDeposit);

  program
    .command('list_queued_deposits')
    .description('list deposits in the deposit processing queue')
    .action(CLI.listQueuedDeposits);

  program
    .command('list_outgoing_payments')
    .description('list the outgoing ripple payments.')
    .action(CLI.listOutgoingPayments);

  program
    .command('list_users')
    .description('list registered users')
    .action(CLI.listUsers);

  program
    .command('list_user_external_accounts <userId>')
    .description('list external accounts for a user')
    .action(CLI.listUserExternalAccounts);

  program
    .command('add_external_account <name> <userId>')
    .description('add an external account to a user')
    .action(CLI.addExternalAccount);

  program
    .command('register_user <username> <password> <ripple_address>')
    .description('create a user with a ripple address')
    .action(CLI.registerUser);

  program
    .command('start') 
    .description('start the gatewayd processes')
    .action(CLI.startGateway);

  program
    .command('stop') 
    .description('stop the gatewayd processes')
    .action(CLI.stopGateway);

  program
    .command('restart') 
    .description('restart the gatewayd processes')
    .action(CLI.restartGateway);

  program
    .command('set_postgres_url <url>')
    .description('set the url of the postgres database')
    .action(function(url){
      gatewayd.config.set('DATABASE_URL', url);
      gatewayd.config.save(function(){
        logger.info(gatewayd.config.get('DATABASE_URL'));
      });
    });

  program
    .command('get_postgres_url')
    .description('get the url of the postgres database')
    .action(function (){
      logger.info(gatewayd.config.get('DATABASE_URL'));
    });

  program
    .command('set_ripple_rest_url <url>')
    .description('set the url of the ripple rest api')
    .action(function(url){
      gatewayd.config.set('RIPPLE_REST_API', url);
      gatewayd.config.save(function () {
        logger.info('set the ripple rest api url');
        logger.info(gatewayd.config.get('RIPPLE_REST_API'));
      });
    });

  program
    .command('get_ripple_rest_url')
    .description('get the url of the ripple rest api')
    .action(function (){
      logger.info(gatewayd.config.get('RIPPLE_REST_API'));
    });

  program
    .command('set_domain <DOMAIN>')
    .description('set the DOMAIN name of the gatewayd')
    .action(function(DOMAIN){
      gatewayd.config.set('DOMAIN', DOMAIN);
      gatewayd.config.save(function() {
        logger.info(gatewayd.config.get('DOMAIN'));
      });
    });

    program
      .command('get_domain')
      .description('get the DOMAIN name of the gatewayd')
      .action(function(){
        logger.info(gatewayd.config.get('DOMAIN'));
      });

    program
      .command('generate_wallet')
      .description('generate a random ripple wallet')
      .action(CLI.generateWallet);

    program
      .command('set_hot_wallet <address> <secret>')
      .description('set the gatewayd hot wallet')
      .action(CLI.setHotWallet);

    program
      .command('get_hot_wallet')
      .description('get the address of the gatewayd hot wallet')
      .action(function(){
        var key = 'HOT_WALLET';
        var hot_wallet = gatewayd.config.get(key);
        if (hot_wallet.address) {
          logger.info(hot_wallet.address);
        } else {
          logger.error('hot wallet not yet set');
          logger.error('use bin/gatewayd set_hot_wallet <address> <secret>');
        }
      });

    program
      .command('get_hot_wallet_secret')
      .description('get the secret of the gatewayd hot wallet')
      .action(function(){
        var key = 'HOT_WALLET';
        var hot_wallet = gatewayd.config.get(key);
        if (hot_wallet.secret) {
          logger.info(hot_wallet.secret);
        } else {
          logger.error('hot wallet not yet set');
          logger.error('use bin/gatewayd set_hot_wallet <address> <secret>');
        }
      });

  program
    .command('set_cold_wallet <address>')
    .description('set the gatewayd cold wallet')
    .action(CLI.setColdWallet);

  program
    .command('get_cold_wallet')
    .description('get the gatewayd cold wallet')
    .action(function(){
      var key = 'COLD_WALLET';
      var cold_wallet = gatewayd.config.get(key);
      if (cold_wallet) {
        logger.info(cold_wallet);
      } else {
        logger.error('cold wallet not yet set');
        logger.error('use bin/gatewayd set_cold_wallet <address>');
      }
    });

  program
    .command('set_key')
    .description('set the admin api key')
    .action(CLI.setKey);

  program
    .command('get_key')
    .description('get the admin api key')
    .action(CLI.getKey);

  program
    .command('list_currencies')
    .description('List all currencies supported by the gatewayd')
    .action(CLI.listCurrencies);

  program
    .command('add_currency <currency> <amount>')
    .description('add support for a currency and trustline amount')
    .action(CLI.addCurrency);

  program
    .command('remove_currency <currency>')
    .description('remove support for a currency')
    .action(CLI.removeCurrency);

  program
    .command('set_trust <currency> <amount>')
    .description('set level of trust from hot to cold wallet') 
    .action(CLI.setTrustLine);

  program
    .command('get_trust_lines')
    .description('get the trust lines from hot wallet to cold wallet')
    .action(CLI.getTrustLines);

  program
    .command('set_last_payment_hash <hash>')
    .description('set the last encountered payment hash for incoming processing.')
    .action(CLI.setLastPaymentHash);

  program
    .command('get_last_payment_hash')
    .description('get the last encountered payment hash for incoming processing.')
    .action(CLI.getLastPaymentHash);

  program
    .command('refund_cold_wallet <amount> <currency>')
    .description('send back funds from the hot wallet to cold wallet')
    .action(CLI.refundColdWallet);

  program
    .command('list_processes')
    .description('list the processes currently run by ripple-gatewayd')
    .action(CLI.listProcesses);

  program
    .command('activate_user')
    .description('enable a user to use the ripple gatewayd')
    .action(CLI.activateUser);

  program
    .command('deactivate_user <userId>')
    .description('disable a user from using the ripple gatewayd')
    .action(CLI.deactivateUser);

  program
    .command('list_failed_payments')
    .description('list outgoing ripple transactions that failed')
    .action(CLI.listFailedPayments);

  program
    .command('retry_failed_payment <ripple_transaction_id>')
    .description('retry an outgoing ripple transaction that failed')
    .action(CLI.retryFailedPayment);

  program
    .command('setup')
    .description('run the setup wizard using the current configuration')
    .action(CLI.setup);

  program
    .command('enqueue_outgoing_payment <address> <amount> <currency>')
    .description('run the setup wizard using the current configuration')
    .action(CLI.enqueueOutgoingPayment);

  program
    .command('db_ripple_tx_seed <how_many>')
    .description('create x number of transaction records with random data')
    .action(CLI.dbRippleTxSeed);

  program.parse(process.argv);
}

