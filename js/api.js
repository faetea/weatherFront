/*jshint node: true */
'use strict';

var api = {
  url: 'http://localhost:3000',

  ajax: function (config, cb) {
    $.ajax(config).done(function(data, textStatus, jqxhr) {
      cb(null, data);
    }).fail(function(jqxhr, status, error) {
      cb({jqxhr: jqxhr, status: status, error: error});
    });
  },

  register: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/signup',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
    }, callback);
  },

  login: function (credentials, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(credentials),
      xhrFields: { withCredentials: true } // tells jquery to use cookies
    }, callback);
  },

  sync: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/sync',
      contentType: 'application/json; charset=utf-8',
      xhrFields: { withCredentials: true } // tells jquery to use cookies
    }, callback);
  },

  pressure: function (callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/pressure',
      contentType: 'application/json; charset=utf-8',
      xhrFields: { withCredentials: true } // tells jquery to use cookies
    }, callback);
  },

  createEntry: function (newEntry, callback) {
    this.ajax({
      method: 'POST',
      url: this.url + '/entries',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(newEntry),
      xhrFields: { withCredentials: true } // tells jquery to use cookies
    }, callback);
  },

  showList: function(callback) {
    this.ajax({
      method: 'GET',
      url: this.url + '/entries',
      xhrFields: { withCredentials: true }
    }, callback);
  },

}; // end api
