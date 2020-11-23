const { useEffect, useState } = React;
const Navbar = ReactBootstrap.Navbar;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const ToggleButton = ReactBootstrap.ToggleButton;
const ButtonGroup = ReactBootstrap.ButtonGroup;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;
const OverlayTrigger = ReactBootstrap.OverlayTrigger;
const Tooltip = ReactBootstrap.Tooltip;
const Alert = ReactBootstrap.Alert;

//timer vars for scoring
let lastTime = 0;
let currTime = 0;

const Game = (props) => {
  const colors = [
    "#f54242",
    "#f58142",
    "#f5e042",
    "#bcf542",
    "#72f542",
    "#42f5a7",
    "#42f5f2",
    "#42a4f5",
    "#4542f5",
    "#8142f5",
    "#d442f5",
    "#f54281",
  ];

  const [activeColors, setActiveColors] = useState([]);
  const [gameColors, setGameColors] = useState({});
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);

  //initalize game
  useEffect(() => {
    createGame(true);
  }, [props.level]);

  //generate the the circle colors and positions for the given level
  const createGame = (newLevel) => {
    let tempGame = {};
    lastTime = 0;
    currTime = 0;
    if (props.level === "1") {
      for (let i = 0; i < 3; i++) {
        tempGame[i] = [];
        for (let j = 0; j < 3; j++) {
          tempGame[i].push(getfill());
        }
      }
    } else if (props.level === "2") {
      for (let i = 0; i < 4; i++) {
        tempGame[i] = [];
        for (let j = 0; j < 4; j++) {
          tempGame[i].push(getfill());
        }
      }
    } else if (props.level === "3") {
      for (let i = 0; i < 5; i++) {
        tempGame[i] = [];
        for (let j = 0; j < 5; j++) {
          tempGame[i].push(getfill());
        }
      }
    }
    setLastScore(newLevel ? 0 : score);
    setScore(400 + 100 * Number(props.level));
    getAllActive(tempGame);
    setGameColors(tempGame);
  };

  //get the fill for a circle, track all of the colors being used
  const getfill = () => {
    const index = Math.floor(Math.random() * Math.floor(colors.length));
    let currFill = colors[index];
    return currFill;
  };

  //get all of the active colors in the current game
  const getAllActive = (newGame) => {
    let allColors = [];
    for (let key of Object.keys(newGame)) {
      for (let color of newGame[key]) {
        if (!allColors.includes(color) && color !== "black") {
          allColors.push(color);
        }
      }
    }
    //reset the level when all the circles are gone
    if (allColors.length === 0) {
      props.addScore(score);
      createGame(false);
      return true;
    }
    setActiveColors(_.shuffle(allColors));
    return false;
  };

  //check to see if the user clicked on the correct circle, update game accordingly
  const circleClick = (event) => {
    let index = event.target.id.split("-");
    if (activeColors[0] === gameColors[index[0]][index[1]]) {
      currTime = Math.floor(Date.now() / 100);
      let diff = lastTime === 0 ? 0 : currTime - lastTime;
      let newScore = score;
      newScore = newScore - diff;
      setScore(newScore);
      lastTime = currTime;
      let tempGame = { ...gameColors };
      tempGame[index[0]][index[1]] = "black";
      let finished = getAllActive(tempGame);
      if (!finished) {
        setGameColors(tempGame);
      }
    }
  };

  return (
    <div>
      <Container>
        <Row style={{ marginTop: "10px" }}>
          <Col className="center-items">
            <h5>Last Score: {lastScore}</h5>
          </Col>
          <Col className="center-items">
            <h5>Score: {score}</h5>
          </Col>
          <Col className="center-items">
            <h5>Account Score: {props.currAccount.score}</h5>
          </Col>
        </Row>
        <Row>
          <Col className="center-items">
            <h5 className="target-label">Current Target</h5>
          </Col>
        </Row>
        <Row>
          <Col className="center-items">
            <svg height="100" width="100">
              <circle
                cx="50"
                cy="50"
                r="40"
                strokeWidth="3"
                fill={activeColors.length !== 0 ? activeColors[0] : "black"}
              />
            </svg>
          </Col>
        </Row>
        <div className="game-container">
          {Object.keys(gameColors).map((value) => (
            <Row key={value}>
              {gameColors[value].map((value2, index) => (
                <Col key={index} className="center-items">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      strokeWidth="3"
                      fill={value2}
                      onClick={circleClick}
                      id={`${value}-${index}`}
                    />
                  </svg>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      </Container>
    </div>
  );
};

const App = (props) => {
  const [currLevel, setCurrLevel] = useState("1");
  const [disabledLevels, setDisabledLevels] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [tab, setTab] = useState("home");
  const [password2, setPassword2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [csrf, setCsrf] = useState();
  const [currAccount, setCurrAccount] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [errorText, setErrorText] = useState("Error");

  const levels = [
    { name: "3x3", value: "1", points: 0 },
    { name: "4x4", value: "2", points: 10000 },
    { name: "5x5", value: "3", points: 20000 },
  ];

  //on load get security token
  useEffect(() => {
    getToken();
    getAccount();
  }, []);

  //update the available levels when the account is updated
  useEffect(() => {
    setDisabledLevels({
      1: false,
      2:
        currAccount.unlocked || (currAccount.score && currAccount.score > 10000)
          ? false
          : true,
      3:
        currAccount.unlocked || (currAccount.score && currAccount.score > 20000)
          ? false
          : true,
    });
  }, [currAccount]);

  //security token
  const getToken = () => {
    sendAjax("GET", "/getToken", null, (result) => {
      setCsrf(result.csrfToken);
    });
  };

  //active account
  const getAccount = () => {
    sendAjax("GET", "/getAccount", null, (result) => {
      setCurrAccount(result.account);
    });
  };

  //show an error alert with the message
  const handleError = (message) => {
    setShowAlert(true);
    setErrorText(message);
  };

  //change the account password
  const changePassword = () => {
    let passwordData = {
      oldPassword: password2,
      newPassword: newPassword,
      _csrf: csrf,
    };
    sendAjax(
      "POST",
      "/changePassword",
      passwordData,
      () => {
        setNewPassword("");
        setPassword2("");
      },
      handleError
    );
  };

  //unlocks the account so that all levels are available
  const unlockAccount = () => {
    sendAjax(
      "GET",
      "/unlockAccount",
      null,
      (result) => {
        if (result.account) {
          setCurrAccount(result.account);
        }
      },
      handleError
    );
  };

  //adds the score to the user's account 
  const addScore = (newScore) => {
    let scoreData = {
      score: newScore,
      _csrf: csrf,
    };
    sendAjax("POST", "/addScore", scoreData, (result) => {
      if (result.account) {
        setCurrAccount(result.account);
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Fast! Circle! Click!</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="/logout">Logout</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Tabs activeKey={tab} onSelect={(k) => setTab(k)}>
        <Tab eventKey="home" title="Home">
          <Container>
            <Row>
              <Col>
                <h3 className="levelHeader">Level Select</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonGroup toggle className="center-items">
                  {levels.map((level, idx) => {
                    if (
                      currAccount.score < level.points &&
                      !currAccount.unlocked
                    ) {
                      return (
                        <OverlayTrigger
                          key={idx}
                          placement="top"
                          overlay={
                            <Tooltip>
                              {currAccount.score}/{level.points} Points
                            </Tooltip>
                          }
                        >
                          <ToggleButton
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={level.value}
                            checked={currLevel === level.value}
                            onChange={(e) =>
                              setCurrLevel(e.currentTarget.value)
                            }
                            disabled={disabledLevels[level.value]}
                          >
                            {level.name}
                          </ToggleButton>
                        </OverlayTrigger>
                      );
                    } else {
                      return (
                        <ToggleButton
                          key={idx}
                          type="radio"
                          variant="secondary"
                          name="radio"
                          value={level.value}
                          checked={currLevel === level.value}
                          onChange={(e) => setCurrLevel(e.currentTarget.value)}
                          disabled={disabledLevels[level.value]}
                        >
                          {level.name}
                        </ToggleButton>
                      );
                    }
                  })}
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Game
                  level={currLevel}
                  currAccount={currAccount}
                  addScore={addScore}
                />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <Container className="account-container">
            {showAlert && (
              <Alert
                variant="danger"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>{errorText}</Alert.Heading>
              </Alert>
            )}
            <Row>
              <Col>
                <h3>Account Settings</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Change Password</h5>
                <Form>
                  <Form.Group controlId="oldPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Current Password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="outline-light" onClick={changePassword}>
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5>Unlock All Content</h5>
                {!currAccount.unlocked && (
                  <Button variant="outline-light" onClick={unlockAccount}>
                    Purchase
                  </Button>
                )}
                {currAccount.unlocked && <p>Purchased!</p>}
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

const rootElement = document.getElementById("content");
ReactDOM.render(<App />, rootElement);
