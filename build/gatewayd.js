"use strict";

var gatewayd = require("gatewayd");

gatewayd.config.file("~/.gatewayd/config.json");

module.exports = gatewayd;