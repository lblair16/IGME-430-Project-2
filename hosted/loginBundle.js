"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _React = React,
    useEffect = _React.useEffect,
    useState = _React.useState;
var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;

var LoginPage = function LoginPage(props) {
  //state
  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      csrf = _useState2[0],
      setCsrf = _useState2[1];

  var _useState3 = useState(""),
      _useState4 = _slicedToArray(_useState3, 2),
      username = _useState4[0],
      setUsername = _useState4[1];

  var _useState5 = useState(""),
      _useState6 = _slicedToArray(_useState5, 2),
      password = _useState6[0],
      setPassword = _useState6[1];

  var _useState7 = useState(""),
      _useState8 = _slicedToArray(_useState7, 2),
      password2 = _useState8[0],
      setPassword2 = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isSignup = _useState10[0],
      setIsSignUp = _useState10[1]; //on load get security token


  useEffect(function () {
    getToken();
  }, []); //security token

  var getToken = function getToken() {
    sendAjax("GET", "/getToken", null, function (result) {
      setCsrf(result.csrfToken);
    });
  };

  var handleLogin = function handleLogin() {
    //make sure all fields are filled
    if (isSignup) {
      if (username && password && password2) {
        var loginData = {
          username: username,
          pass: password,
          pass2: password2,
          _csrf: csrf
        };
        sendAjax("POST", "/signup", loginData, redirect);
      }
    } else if (username && password) {
      var _loginData = {
        username: username,
        pass: password,
        _csrf: csrf
      };
      sendAjax("POST", "/login", _loginData, redirect);
    }
  }; //render


  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "username"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Username"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "text",
    placeholder: "Enter Username",
    value: username,
    onChange: function onChange(e) {
      return setUsername(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "password"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Password"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "password",
    placeholder: "Password",
    value: password,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  })), isSignup && /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "password2"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Retype Password"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "password",
    placeholder: "Retype Password",
    value: password2,
    onChange: function onChange(e) {
      return setPassword2(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "signup"
  }, /*#__PURE__*/React.createElement(Form.Check, {
    type: "checkbox",
    label: "Sign Up",
    value: isSignup,
    onChange: function onChange() {
      setIsSignUp(!isSignup);
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: handleLogin
  }, "Login")));
};

var rootElement = document.getElementById("content");
ReactDOM.render( /*#__PURE__*/React.createElement(LoginPage, null), rootElement);
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
