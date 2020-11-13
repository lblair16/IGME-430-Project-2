const { useEffect, useState } = React;
const Navbar = ReactBootstrap.Navbar;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const ToggleButton = ReactBootstrap.ToggleButton;
const ButtonGroup = ReactBootstrap.ButtonGroup;

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
    let index = event.target.id.split('-');
    if(activeColors[0] === gameColors[index[0]][index[1]]){
      let tempGame = {...gameColors};
      tempGame[index[0]][index[1]] = "black";
      getAllActive(tempGame);
      setGameColors(tempGame);
    }
  }

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

  const levels = [
    { name: "3x3", value: "1" },
    { name: "4x4", value: "2" },
    { name: "5x5", value: "3" },
  ];

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
    </div>
  );
};

const rootElement = document.getElementById("content");
ReactDOM.render(<App />, rootElement);
