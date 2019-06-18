import ReactDOM from 'react-dom';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

// importing the modularized files from other directories
import IssueList from './IssueList.jsx';
import Nav from './Nav.jsx';
import IssueEdit from './IssueEdit.jsx';

// some stateless components
const NoMatch = () => {
  return <p>There is no match of the queried url string</p>;
};
// This is our main component that will route all our apps

const App = ({ children }) => (
  <div>
    <div className="header">
      <h1>Issue Tracker</h1>
    </div>
    <div className="contents">{children}</div>
    <div className="footer">
      <a href="https://github.com/vasansr/pro-mern-stack">GitHub repository</a>
.
    </div>
  </div>
);
// App.propTypes = {
//   children: React.PropTypes.object.isRequired
// };

const RouteApp = () => {
  return (
    <Router>
      <div>
        <Redirect from="/" to="/issues" />
        <Switch>
          <App>
            {/* injecting a router to issuefilter with the withROuter methods */}
            <Route path="/issues" exact component={IssueList} />
            <Route path="/issues/:id" exact strict component={IssueEdit} />
            <Route path="*" component={NoMatch} />
          </App>
        </Switch>
      </div>
    </Router>
  );
};

const contentNode = document.getElementById('contents');

ReactDOM.render(<RouteApp />, contentNode);
// this is for tracking any changes in our files so that HMR can rerender the new data to the web
if (module.hot) {
  module.hot.accept();
}
