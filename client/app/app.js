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

  const getfill = () => {
    const index = Math.floor(Math.random() * Math.floor(colors.length));
    return colors[index];
  };
  return (
    <div>
      {props.level === "1" && (
        <Container>
          {[1, 2, 3].map((value) => (
            <Row key={value}>
              {[1, 2, 3].map((value2) => (
                <Col key={value2} className="center-items">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill={getfill()}
                    />
                  </svg>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      )}
      {props.level === "2" && (
        <Container>
          {[1, 2, 3, 4].map((value) => (
            <Row key={value}>
              {[1, 2, 3, 4].map((value2) => (
                <Col key={value2} className="center-items">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill={getfill()}
                    />
                  </svg>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      )}
      {props.level === "3" && (
        <Container>
          {[1, 2, 3, 4, 5].map((value) => (
            <Row key={value}>
              {[1, 2, 3, 4, 5].map((value2) => (
                <Col key={value2} className="center-items">
                  <svg height="100" width="100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="black"
                      stroke-width="3"
                      fill={getfill()}
                    />
                  </svg>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      )}
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
