import React, { useState, useEffect} from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import  SignUp from './pages/SignUp';
import  Login from './pages/Login';
import Dashboard from './pages/Dashboard';


function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('user-token');
    if (token) {
      setToken(token);
    }
  }, [])

  return (
    <div className="App">
    <Header token={token} />
    <div className ="section main-content">
    <Switch>
          <Route exact path="/">
            {/* <Landing /> */}
            <h1>this will be the homePage</h1>
          </Route>
          <Route path="/login" render={(props) => (
            <Login {...props} updateToken={setToken} />
          )}>
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <Dashboard token={token}/>
          </Route>
        </Switch>
   
    </div>

    </div>

  );
}

export default App;
