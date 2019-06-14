import ReactDOM from "react-dom";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from "react-router-dom";
// importing the modularized files from other directories
import IssueList from "./IssueList.jsx";
import Nav from "./Nav.jsx";
import IssueEdit from "./IssueEdit.jsx";

// some stateless components

const NoMatch = () => {
  return <p>There is no match of the queried url string</p>;
};
// This is our main component that will route all our apps

const RouteApp = () => {
  return (
    <Router>
      <div>
        <Nav />
        {/* <Switch> */}
        <Route path="/issues" exact strict component={IssueList} />
        <Route path="/issues/:id" strict component={IssueEdit} />
        <Route path="*" strict component={NoMatch} />
        {/* </Switch> */}
      </div>
    </Router>
  );
};

const contentNode = document.getElementById("contents");

ReactDOM.render(<RouteApp />, contentNode);
// this is for tracking any changes inour files so that HMR can rerender the new data to the web
if (module.hot) {
  module.hot.accept();
}
