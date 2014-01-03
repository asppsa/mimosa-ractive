"use strict";

var path = require( 'path' )
  , config = require( './config' )
  , getExtensions = function ( mimosaConfig ) {
    return mimosaConfig.ractive.extensions;
  };

var prefix = function (mimosaConfig, libraryPath) {
  if ( mimosaConfig.template.wrapType === 'amd' ) {
    return "define(['" + libraryPath + "'], function (){ var templates = {};\n";
  }

  return "var templates = {};\n";
};

var suffix = function ( mimosaConfig ) {
  if ( mimosaConfig.template.wrapType === 'amd' ) {
    return "return templates; });";
  } else {
    if ( mimosaConfig.template.wrapType === "common" ) {
      return "module.exports = templates;";
    }
  }

  return "";
};

var compile = function ( mimosaConfig, file, cb ) {
  var error, output;

  try {
    output = mimosaConfig.ractive.lib.parse( file.inputFileText );
    output = JSON.stringify( output );
  } catch ( err ) {
    error = err;
  }

  cb( error, output );
};

module.exports = {
  name: "ractive",
  compilerType: "template",
  clientLibrary: path.join( __dirname, "client", "ractive.js" ),
  compile: compile,
  suffix: suffix,
  prefix: prefix,
  extensions: getExtensions,
  defaults: config.defaults,
  placeholder: config.placeholder,
  validate: config.validate
};