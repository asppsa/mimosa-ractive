"use strict";

exports.defaults = function() {
  return {
    ractive: {
      extensions: [ "rtv","rac" ],
    }
  };
};

exports.placeholder = function() {
  return "\t\n\n"+
         "  # ractive:               # config settings for the Ractive compiler module\n" +
         "    # lib: undefined       # use this property to provide a specific version of Ractive\n" +
         "    # extensions: [\"rtv\",\"rac\"]  # default extensions for Ractive files\n";
};

exports.validate = function( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject( errors, "ractive config", config.ractive ) ) {

    if ( !config.ractive.lib ) {
      config.ractive.lib = require( 'ractive' );
    }

    if ( validators.isArrayOfStringsMustExist( errors, "ractive.extensions", config.ractive.extensions ) ) {
      if (config.ractive.extensions.length === 0) {
        errors.push( "ractive.extensions cannot be an empty array");
      }
    }
  }

  return errors;
};



