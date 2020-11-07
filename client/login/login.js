const { useEffect, useState } = React;
const Form = ReactBootstrap.Form;
const Button = ReactBootstrap.Button;

const LoginPage = (props) => {
  //state
  const [csrf, setCsrf] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isSignup, setIsSignUp] = useState(false);

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

  const handleLogin = () => {
    //make sure all fields are filled
    if (isSignup) {
      if (username && password && password2) {
        let loginData = {
          username: username,
          pass: password,
          pass2: password2,
          _csrf: csrf,
        };
        sendAjax("POST", "/signup", loginData, redirect);
      }
    }
    else if (username && password) {
      let loginData = {
        username: username,
        pass: password,
        _csrf: csrf,
      };
      sendAjax("POST", "/login", loginData, redirect);
    }
  };

  //render
  return (
    <div>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
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

        {isSignup && (
          <Form.Group controlId="password2">
            <Form.Label>Retype Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Retype Password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </Form.Group>
        )}

        <Form.Group controlId="signup">
          <Form.Check
            type="checkbox"
            label="Sign Up"
            value={isSignup}
            onChange={() => {
              setIsSignUp(!isSignup);
            }}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </div>
  );
};

const rootElement = document.getElementById("content");
ReactDOM.render(<LoginPage />, rootElement);
