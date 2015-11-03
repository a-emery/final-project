import $ from 'jquery';

$.ajaxSetup({
  beforeSend(xhr, options) {
    if(options.url.match(/api.parse.com/)) {
      xhr.setRequestHeader('X-Parse-Application-Id', 'F3fQj7yCA8fJ2Ffvlwp8MggUL34bYKjxWjagvKqV');
      xhr.setRequestHeader('X-Parse-REST-API-Key', 'qXZasPzBEOubXrdD1uY0PMevgzcZ3pf17DoOSCsV');
      if(localStorage.getItem('parse-session-token')) {
        xhr.setRequestHeader('X-Parse-Session-Token', localStorage.getItem('parse-session-token'));
      }
    }
    if(options.url.match(/trailapi-trailapi.p.mashape.com/)) {
      xhr.setRequestHeader('X-Mashape-Key', '54lXQ1oTXHmshd3CW3lqEEaJaIt4p1lmHYDjsncC76WrSHS0mp');
      xhr.setRequestHeader('Accept', 'text/plain');
    }
  }
});
