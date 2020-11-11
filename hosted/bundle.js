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
var Navbar = ReactBootstrap.Navbar;
var Container = ReactBootstrap.Container;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var ToggleButton = ReactBootstrap.ToggleButton;
var ButtonGroup = ReactBootstrap.ButtonGroup;

var Game = function Game(props) {
  var colors = ["#f54242", "#f58142", "#f5e042", "#bcf542", "#72f542", "#42f5a7", "#42f5f2", "#42a4f5", "#4542f5", "#8142f5", "#d442f5", "#f54281"];

  var getfill = function getfill() {
    var index = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[index];
  };

  return /*#__PURE__*/React.createElement("div", null, props.level === "1" && /*#__PURE__*/React.createElement(Container, null, [1, 2, 3].map(function (value) {
    return /*#__PURE__*/React.createElement(Row, {
      key: value
    }, [1, 2, 3].map(function (value2) {
      return /*#__PURE__*/React.createElement(Col, {
        key: value2,
        className: "center-items"
      }, /*#__PURE__*/React.createElement("svg", {
        height: "100",
        width: "100"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: "black",
        "stroke-width": "3",
        fill: getfill()
      })));
    }));
  })), props.level === "2" && /*#__PURE__*/React.createElement(Container, null, [1, 2, 3, 4].map(function (value) {
    return /*#__PURE__*/React.createElement(Row, {
      key: value
    }, [1, 2, 3, 4].map(function (value2) {
      return /*#__PURE__*/React.createElement(Col, {
        key: value2,
        className: "center-items"
      }, /*#__PURE__*/React.createElement("svg", {
        height: "100",
        width: "100"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: "black",
        "stroke-width": "3",
        fill: getfill()
      })));
    }));
  })), props.level === "3" && /*#__PURE__*/React.createElement(Container, null, [1, 2, 3, 4, 5].map(function (value) {
    return /*#__PURE__*/React.createElement(Row, {
      key: value
    }, [1, 2, 3, 4, 5].map(function (value2) {
      return /*#__PURE__*/React.createElement(Col, {
        key: value2,
        className: "center-items"
      }, /*#__PURE__*/React.createElement("svg", {
        height: "100",
        width: "100"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: "black",
        "stroke-width": "3",
        fill: getfill()
      })));
    }));
  })));
};

var App = function App(props) {
  var _useState = useState("1"),
      _useState2 = _slicedToArray(_useState, 2),
      currLevel = _useState2[0],
      setCurrLevel = _useState2[1];

  var _useState3 = useState({
    1: false,
    2: false,
    3: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      disabledLevels = _useState4[0],
      setDisabledLevels = _useState4[1];

  var levels = [{
    name: "3x3",
    value: "1"
  }, {
    name: "4x4",
    value: "2"
  }, {
    name: "5x5",
    value: "3"
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Navbar, {
    bg: "dark",
    variant: "dark"
  }, /*#__PURE__*/React.createElement(Navbar.Brand, null, "Fast! Circle! Click!"), /*#__PURE__*/React.createElement(Navbar.Collapse, {
    className: "justify-content-end"
  }, /*#__PURE__*/React.createElement(Navbar.Text, null, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Logout")))), /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("h3", {
    className: "levelHeader"
  }, "Level Select"))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement(ButtonGroup, {
    toggle: true,
    className: "center-items"
  }, levels.map(function (level, idx) {
    return /*#__PURE__*/React.createElement(ToggleButton, {
      key: idx,
      type: "radio",
      variant: "secondary",
      name: "radio",
      value: level.value,
      checked: currLevel === level.value,
      onChange: function onChange(e) {
        return setCurrLevel(e.currentTarget.value);
      },
      disabled: disabledLevels[level.value]
    }, level.name);
  })))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement(Game, {
    level: currLevel
  })))));
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
