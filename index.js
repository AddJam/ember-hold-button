/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-hold-button',
  included: function(app) {
    this._super.included(app);
  },
  isDevelopingAddon: function() {
    return true;
  }
};
