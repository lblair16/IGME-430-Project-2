"use strict";

var _React = React,
    useEffect = _React.useEffect,
    useState = _React.useState;
var Button = ReactBootstrap.Button;

var App = function App(props) {
  var handleLogout = function handleLogout() {
    sendAjax("GET", "/logout", null, null);
  };

  return /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: handleLogout
  }, "Logout");
};

var rootElement = document.getElementById("content");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);
"use strict";

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
