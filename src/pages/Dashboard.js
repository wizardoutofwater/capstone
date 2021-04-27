import React from 'react';
import './css/App.css';
import Header from './components/Header';
import HeaderTest from './components/HeaderTest';
import SideNav from './components/SideNav';
import Main from './components/Main';
import SideNavTest from './components/SideNavTest';



function Dashboard() {
  return (
    <div className="Dashboard">
    <Header />
    <div className ="section main-content">
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

export default Dashboard;
