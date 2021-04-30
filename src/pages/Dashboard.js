import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import SideNav from "../components/SideNav";
import Main from "../components/Main";
import AddSnippet from "../components/AddSnippet";

function Dashboard({ token }) {
  let { path, url } = useRouteMatch();

  return (
    <div className="Dashboard">
      <div className="section main-content">
        <div className="columns">
          <SideNav />
          <main className="column">
            <Switch>
              <Route exact path={path} component={Main}/>

              <Route path={`${path}/add`} render={(props) => (
                  <AddSnippet {...props} token={token}/>
              )} />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
