"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

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
var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;
var Form = ReactBootstrap.Form;
var Button = ReactBootstrap.Button;
var OverlayTrigger = ReactBootstrap.OverlayTrigger;
var Tooltip = ReactBootstrap.Tooltip;
var Alert = ReactBootstrap.Alert; //timer vars for scoring

var lastTime = 0;
var currTime = 0;

var Game = function Game(props) {
  var colors = ["#f54242", "#f58142", "#f5e042", "#5f006e", "#72f542", "#42f5a7", "#42f5f2", "#42a4f5", "#4542f5", "#8142f5", "#d442f5", "#f54281"];

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      activeColors = _useState2[0],
      setActiveColors = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      gameColors = _useState4[0],
      setGameColors = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      score = _useState6[0],
      setScore = _useState6[1];

  var _useState7 = useState(0),
      _useState8 = _slicedToArray(_useState7, 2),
      lastScore = _useState8[0],
      setLastScore = _useState8[1]; //initalize game


  useEffect(function () {
    createGame(true);
  }, [props.level]); //generate the the circle colors and positions for the given level

  var createGame = function createGame(newLevel) {
    var tempGame = {};
    lastTime = 0;
    currTime = 0;

    if (props.level === "1") {
      for (var i = 0; i < 3; i++) {
        tempGame[i] = [];

        for (var j = 0; j < 3; j++) {
          tempGame[i].push(getfill());
        }
      }
    } else if (props.level === "2") {
      for (var _i2 = 0; _i2 < 4; _i2++) {
        tempGame[_i2] = [];

        for (var _j = 0; _j < 4; _j++) {
          tempGame[_i2].push(getfill());
        }
      }
    } else if (props.level === "3") {
      for (var _i3 = 0; _i3 < 5; _i3++) {
        tempGame[_i3] = [];

        for (var _j2 = 0; _j2 < 5; _j2++) {
          tempGame[_i3].push(getfill());
        }
      }
    }

    setLastScore(newLevel ? 0 : score);
    setScore(400 + 100 * Number(props.level));
    getAllActive(tempGame);
    setGameColors(tempGame);
  }; //get the fill for a circle, track all of the colors being used


  var getfill = function getfill() {
    var index = Math.floor(Math.random() * Math.floor(colors.length));
    var currFill = colors[index];
    return currFill;
  }; //get all of the active colors in the current game


  var getAllActive = function getAllActive(newGame) {
    var allColors = [];

    for (var _i4 = 0, _Object$keys = Object.keys(newGame); _i4 < _Object$keys.length; _i4++) {
      var key = _Object$keys[_i4];

      var _iterator = _createForOfIteratorHelper(newGame[key]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var color = _step.value;

          if (!allColors.includes(color) && color !== "black") {
            allColors.push(color);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } //reset the level when all the circles are gone


    if (allColors.length === 0) {
      props.addScore(score);
      createGame(false);
      return true;
    }

    setActiveColors(_.shuffle(allColors));
    return false;
  }; //check to see if the user clicked on the correct circle, update game accordingly


  var circleClick = function circleClick(event) {
    var index = event.target.id.split("-");

    if (activeColors[0] === gameColors[index[0]][index[1]]) {
      currTime = Math.floor(Date.now() / 100);
      var diff = lastTime === 0 ? 0 : currTime - lastTime;
      var newScore = score;
      newScore = newScore - diff;
      setScore(newScore);
      lastTime = currTime;

      var tempGame = _objectSpread({}, gameColors);

      tempGame[index[0]][index[1]] = "black";
      var finished = getAllActive(tempGame);

      if (!finished) {
        setGameColors(tempGame);
      }
    }
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: "10px"
    }
  }, /*#__PURE__*/React.createElement(Col, {
    className: "center-items"
  }, /*#__PURE__*/React.createElement("h5", null, "Last Score: ", lastScore)), /*#__PURE__*/React.createElement(Col, {
    className: "center-items"
  }, /*#__PURE__*/React.createElement("h5", null, "Score: ", score)), /*#__PURE__*/React.createElement(Col, {
    className: "center-items"
  }, /*#__PURE__*/React.createElement("h5", null, "Account Score: ", props.currAccount.score))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "center-items"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "target-label"
  }, "Current Target"))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    className: "center-items"
  }, /*#__PURE__*/React.createElement("svg", {
    height: "100",
    width: "100"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "40",
    strokeWidth: "3",
    fill: activeColors.length !== 0 ? activeColors[0] : "black"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "game-container"
  }, Object.keys(gameColors).map(function (value) {
    return /*#__PURE__*/React.createElement(Row, {
      key: value
    }, gameColors[value].map(function (value2, index) {
      return /*#__PURE__*/React.createElement(Col, {
        key: index,
        className: "center-items"
      }, /*#__PURE__*/React.createElement("svg", {
        height: "100",
        width: "100"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        stroke: "black",
        strokeWidth: "3",
        fill: value2,
        onClick: circleClick,
        id: "".concat(value, "-").concat(index)
      })));
    }));
  }))));
};

var App = function App(props) {
  var _useState9 = useState("1"),
      _useState10 = _slicedToArray(_useState9, 2),
      currLevel = _useState10[0],
      setCurrLevel = _useState10[1];

  var _useState11 = useState({
    1: false,
    2: false,
    3: false
  }),
      _useState12 = _slicedToArray(_useState11, 2),
      disabledLevels = _useState12[0],
      setDisabledLevels = _useState12[1];

  var _useState13 = useState("home"),
      _useState14 = _slicedToArray(_useState13, 2),
      tab = _useState14[0],
      setTab = _useState14[1];

  var _useState15 = useState(""),
      _useState16 = _slicedToArray(_useState15, 2),
      password2 = _useState16[0],
      setPassword2 = _useState16[1];

  var _useState17 = useState(""),
      _useState18 = _slicedToArray(_useState17, 2),
      newPassword = _useState18[0],
      setNewPassword = _useState18[1];

  var _useState19 = useState(),
      _useState20 = _slicedToArray(_useState19, 2),
      csrf = _useState20[0],
      setCsrf = _useState20[1];

  var _useState21 = useState({}),
      _useState22 = _slicedToArray(_useState21, 2),
      currAccount = _useState22[0],
      setCurrAccount = _useState22[1];

  var _useState23 = useState(false),
      _useState24 = _slicedToArray(_useState23, 2),
      showAlert = _useState24[0],
      setShowAlert = _useState24[1];

  var _useState25 = useState("Error"),
      _useState26 = _slicedToArray(_useState25, 2),
      errorText = _useState26[0],
      setErrorText = _useState26[1];

  var levels = [{
    name: "3x3",
    value: "1",
    points: 0
  }, {
    name: "4x4",
    value: "2",
    points: 10000
  }, {
    name: "5x5",
    value: "3",
    points: 20000
  }]; //on load get security token

  useEffect(function () {
    getToken();
    getAccount();
  }, []); //update the available levels when the account is updated

  useEffect(function () {
    setDisabledLevels({
      1: false,
      2: currAccount.unlocked || currAccount.score && currAccount.score > 10000 ? false : true,
      3: currAccount.unlocked || currAccount.score && currAccount.score > 20000 ? false : true
    });
  }, [currAccount]); //security token

  var getToken = function getToken() {
    sendAjax("GET", "/getToken", null, function (result) {
      setCsrf(result.csrfToken);
    });
  }; //active account


  var getAccount = function getAccount() {
    sendAjax("GET", "/getAccount", null, function (result) {
      setCurrAccount(result.account);
    });
  }; //show an error alert with the message


  var handleError = function handleError(message) {
    setShowAlert(true);
    setErrorText(message);
  }; //change the account password


  var changePassword = function changePassword() {
    var passwordData = {
      oldPassword: password2,
      newPassword: newPassword,
      _csrf: csrf
    };
    sendAjax("POST", "/changePassword", passwordData, function () {
      setNewPassword("");
      setPassword2("");
    }, handleError);
  }; //unlocks the account so that all levels are available


  var unlockAccount = function unlockAccount() {
    sendAjax("GET", "/unlockAccount", null, function (result) {
      if (result.account) {
        setCurrAccount(result.account);
      }
    }, handleError);
  }; //adds the score to the user's account


  var addScore = function addScore(newScore) {
    var scoreData = {
      score: newScore,
      _csrf: csrf
    };
    sendAjax("POST", "/addScore", scoreData, function (result) {
      if (result.account) {
        setCurrAccount(result.account);
      }
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Navbar, {
    bg: "dark",
    variant: "dark"
  }, /*#__PURE__*/React.createElement(Navbar.Brand, null, "Fast! Circle! Click!"), /*#__PURE__*/React.createElement(Navbar.Collapse, {
    className: "justify-content-end"
  }, /*#__PURE__*/React.createElement(Navbar.Text, null, /*#__PURE__*/React.createElement("a", {
    href: "/logout"
  }, "Logout")))), /*#__PURE__*/React.createElement(Tabs, {
    activeKey: tab,
    onSelect: function onSelect(k) {
      return setTab(k);
    }
  }, /*#__PURE__*/React.createElement(Tab, {
    eventKey: "home",
    title: "Home"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("h3", {
    className: "levelHeader"
  }, "Level Select"))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement(ButtonGroup, {
    toggle: true,
    className: "center-items"
  }, levels.map(function (level, idx) {
    if (currAccount.score < level.points && !currAccount.unlocked) {
      return /*#__PURE__*/React.createElement(OverlayTrigger, {
        key: idx,
        placement: "top",
        overlay: /*#__PURE__*/React.createElement(Tooltip, null, currAccount.score, "/", level.points, " Points")
      }, /*#__PURE__*/React.createElement(ToggleButton, {
        type: "radio",
        variant: "secondary",
        name: "radio",
        value: level.value,
        checked: currLevel === level.value,
        onChange: function onChange(e) {
          return setCurrLevel(e.currentTarget.value);
        },
        disabled: disabledLevels[level.value]
      }, level.name));
    } else {
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
    }
  })))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement(Game, {
    level: currLevel,
    currAccount: currAccount,
    addScore: addScore
  }))))), /*#__PURE__*/React.createElement(Tab, {
    eventKey: "account",
    title: "Account"
  }, /*#__PURE__*/React.createElement(Container, {
    className: "account-container"
  }, showAlert && /*#__PURE__*/React.createElement(Alert, {
    variant: "danger",
    onClose: function onClose() {
      return setShowAlert(false);
    },
    dismissible: true
  }, /*#__PURE__*/React.createElement(Alert.Heading, null, errorText)), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("h3", null, "Account Settings"))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("h5", null, "Change Password"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "oldPassword"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "Current Password"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "password",
    placeholder: "Current Password",
    value: password2,
    onChange: function onChange(e) {
      return setPassword2(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Form.Group, {
    controlId: "newPassword"
  }, /*#__PURE__*/React.createElement(Form.Label, null, "New Password"), /*#__PURE__*/React.createElement(Form.Control, {
    type: "password",
    placeholder: "New Password",
    value: newPassword,
    onChange: function onChange(e) {
      return setNewPassword(e.target.value);
    }
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "outline-light",
    onClick: changePassword
  }, "Submit")))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, null, /*#__PURE__*/React.createElement("h5", null, "Unlock All Content"), !currAccount.unlocked && /*#__PURE__*/React.createElement(Button, {
    variant: "outline-light",
    onClick: unlockAccount
  }, "Purchase"), currAccount.unlocked && /*#__PURE__*/React.createElement("p", null, "Purchased!"))))), /*#__PURE__*/React.createElement(Tab, {
    eventKey: "instructions",
    title: "Instructions"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    style: {
      marginTop: "20px"
    }
  }, /*#__PURE__*/React.createElement("h5", null, "How To Play"), /*#__PURE__*/React.createElement("p", {
    style: {
      backgroundColor: "black",
      padding: "10px",
      borderRadius: "10px"
    }
  }, "Click on the circle in the grid that matches the color of the target to get rid of that circle. The faster you can clear all of the circles the better your score will be. Collect more points to unlock all of the levels, or they can all be purchased in the account settings.")))))));
};

var rootElement = document.getElementById("content");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);
"use strict";

//redirect the window to the appropriate page
var redirect = function redirect(response) {
  window.location = response.redirect;
}; //default error handler if one isn't provided


var handleError = function handleError(message) {
  console.log(message);
}; //handle an ajax request


var sendAjax = function sendAjax(type, action, data, success, userError) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      userError ? userError(messageObj.error) : handleError(messageObj.error);
    }
  });
};
