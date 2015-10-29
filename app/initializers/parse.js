import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'F3fQj7yCA8fJ2Ffvlwp8MggUL34bYKjxWjagvKqV');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'qXZasPzBEOubXrdD1uY0PMevgzcZ3pf17DoOSCsV');
      if(localStorage.getItem('parse-session-token')) {
        xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
      }
    };
    if(options.url.match(/outdoor-data-api.herokuapp.com/)) {
      xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
  }
});
