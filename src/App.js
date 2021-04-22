import React from 'react';
import './css/App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import Main from './components/Main';


function App() {
  return (
    <div className="App">
    <Header />
    <div className ="section">
    <div className ="columns">
      <SideNav />
      <main className="column">
        <Main />
      </main>
    </div>

    </div>

    </div>
  );
}

export default App;
