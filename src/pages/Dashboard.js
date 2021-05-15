import React from "react";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import SideNav from "../components/SideNav";
import Main from "../components/Main";
import AddSnippet from "../components/AddSnippet";
import Search from "../components/Search";
import Library from "../components/Library";
import EditSnippet from "../components/EditSnippet";

function Dashboard({ token }) {
  let { path } = useRouteMatch();
  // let { id } = useParams();

  // console.log(id);

  return (
    <div className="Dashboard">
      <div className="section main-content">
        <div className="columns">
          <SideNav />
          <main className="column">
            <Switch>
              <Route exact path={path} component={Main} />

              <Route
                path={`${path}/add`}
                render={(props) => <AddSnippet {...props} token={token} />}
              />
                <Route    // proabbly need to look @ using useRouteMatch
                path={`${path}/snippet/:id`}
                 render={(props) => <EditSnippet {...props} token={token}/>}
                />              
              
              <Route
                path={`${path}/search`}
                render={(props) => <Search {...props} token={token} />}
              />
                <Route
                path={`${path}/library`}
                render={(props) => <Library {...props} token={token} />}
              />
            </Switch>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
