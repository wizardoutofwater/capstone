import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import "./App.sass";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("user-token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route
            path="/login"
            render={(props) => <Login {...props} updateToken={setToken} />}
          ></Route>
          <Route
            path="/signup"
            render={(props) => <SignUp {...props} updateToken={setToken} />}
          ></Route>
          <Route path="/dashboard">
            {token && token != "" ? (
              <Dashboard token={token} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
