// source: https://gitlab.com/ready-education-public/ready-integration-js/-/blob/master/libs/ready-integration.js
var ReadyIntegration = ReadyIntegration || {};

ReadyIntegration.getCookie = function (k) {
  var key = k + '=';
  var cookies = document.cookie
    .split(';')
    .map(function (c) {
      return c.trim();
    })
    .filter(function (c) {
      return c.indexOf(key) === 0;
    });
  return cookies.length ? decodeURIComponent(cookies[0].slice(key.length)) : undefined;
};

ReadyIntegration.getUserToken = function () {
  var userTokenKey = 'rea.user_token';
  return ReadyIntegration.getCookie(userTokenKey);
};

export default ReadyIntegration;
