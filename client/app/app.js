const { useEffect, useState } = React;
const Button = ReactBootstrap.Button;

const App = (props) => {
  const handleLogout = () => {
    sendAjax("GET", "/logout", null, null);
  };
  return (
    <Button variant="primary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

const rootElement = document.getElementById("content");
ReactDOM.render(<App />, rootElement);
