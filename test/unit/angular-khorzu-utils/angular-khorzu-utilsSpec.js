'use strict';

describe('', function() {

  var module;
  var dependencies;
  dependencies = [];

  var hasModule = function(module) {
  return dependencies.indexOf(module) >= 0;
  };

  beforeEach(function() {

  // Get module
  module = angular.module('angular-khorzu-utils');
  dependencies = module.requires;
  });

  it('should load config module', function() {
    expect(hasModule('angular-khorzu-utils.config')).to.be.ok;
  });

  
  it('should load filters module', function() {
    expect(hasModule('angular-khorzu-utils.filters')).to.be.ok;
  });
  

  
  it('should load directives module', function() {
    expect(hasModule('angular-khorzu-utils.directives')).to.be.ok;
  });
  

  
  it('should load services module', function() {
    expect(hasModule('angular-khorzu-utils.services')).to.be.ok;
  });
  

  
    it('should load controllers module', function() {
      expect(hasModule('angular-khorzu-utils.controllers')).to.be.ok;
    });
  

});
