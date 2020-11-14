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

  //initalize game
  useEffect(() => {
    let tempGame = {};
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
    getAllActive(tempGame);
    setGameColors(tempGame);
  }, [props.level]);

  //get the fill for a circle, track all of the colors being used
  const getfill = () => {
    const index = Math.floor(Math.random() * Math.floor(colors.length));
    let currFill = colors[index];
    // if (!activeColors.includes(currFill)) {
    //   let newActive = [...activeColors];
    //   newActive.push(currFill);
    //   setActiveColors(newActive);
    // }
    return currFill;
  };

  //get all of the active colors at the start of a game
  const getAllActive = (newGame) => {
    let allColors = [];
    for (let key of Object.keys(newGame)) {
      for (let color of newGame[key]) {
        if (!allColors.includes(color) && color !== "black") {
          allColors.push(color);
        }
      }
    }
    setActiveColors(_.shuffle(allColors));
  };

  //check to see if the user clicked on the correct circle, update game accordingly
  const circleClick = (event) => {
    let index = event.target.id.split("-");
    if (activeColors[0] === gameColors[index[0]][index[1]]) {
      let tempGame = { ...gameColors };
      tempGame[index[0]][index[1]] = "black";
      getAllActive(tempGame);
      setGameColors(tempGame);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h5 className="target-label">Current Target</h5>
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [csrf, setCsrf] = useState();

  const levels = [
    { name: "3x3", value: "1" },
    { name: "4x4", value: "2" },
    { name: "5x5", value: "3" },
  ];

  //on load get security token
  useEffect(() => {
    getToken();
  }, []);

  //security token
  const getToken = () => {
    sendAjax("GET", "/getToken", null, (result) => {
      setCsrf(result.csrfToken);
    });
  };

  // const changeUsername = () => {
  //   let userData = {
  //     username: username,
  //     password: password,
  //     _csrf: csrf,
  //   };
  //   sendAjax("POST", "/changeUsername", userData, () => {
  //     setPassword("");
  //     setUsername("");
  //   });
  // };

  const changePassword = () => {
    let passwordData = {
      oldPassword: password2,
      newPassword: newPassword,
      _csrf: csrf,
    };
    sendAjax("POST", "/changePassword", passwordData, () => {
      setNewPassword("");
      setPassword2("");
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
                  {levels.map((level, idx) => (
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
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Game level={currLevel} />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="account" title="Account">
          <Container className="account-container">
            <Row>
              <Col>
                <h3>Account Settings</h3>
              </Col>
            </Row>
            {/* <Row>
              <Col>
                <h5>Change Username</h5>
                <Form>
                  <Form.Group controlId="username">
                    <Form.Label>New Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter New Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="outline-light" onClick={changeUsername}>
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row> */}
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
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

const rootElement = document.getElementById("content");
ReactDOM.render(<App />, rootElement);
