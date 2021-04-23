import React from 'react';
import './css/App.css';
import Header from './components/Header';
import HeaderTest from './components/HeaderTest';
import SideNav from './components/SideNav';
import Main from './components/Main';
import SideNavTest from './components/SideNavTest';


function App() {
  return (
    <div className="App">
    <Header />
    <div className ="section">
    <div className ="columns">
      <SideNavTest />
      <main className="column">
        <Main />
      </main>
    </div>

    </div>

    </div>
  );
}

export default App;
