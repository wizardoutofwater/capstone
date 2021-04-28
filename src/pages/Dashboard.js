import React from 'react';

import SideNav from '../components/SideNav';
import Main from '../components/Main';
import AddSnippet from '../components/AddSnippet';


function Dashboard() {
  return (
    <div className="Dashboard">
 
    <div className ="section main-content">
    <div className ="columns">
      <SideNav />
      <main className="column">
        {/* <Main /> */}
        <AddSnippet />
       
      </main>
    </div>

    </div>

    </div>
  );
}

export default Dashboard;
