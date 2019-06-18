import React from 'react';
import 'whatwg-fetch';
import queryString from 'query-string';
import PropTypes from 'prop-types';

// cant get rid of the jsx extentions even though eslint keeps yelling at me....sorry reviewers am also too lazy to google
import IssueFilter from './IssueFilter.jsx';
import IssueTable from './IssueTable.jsx';
import IssueAdd from './IssueAdd.jsx';

export default class IssueList extends React.Component {
  // _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { issues: [] };
    console.log(props);
    console.log(this.props.location.pathname);
    console.log(this.props.location.url);
    // binding methods created in the class component
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  // React Lifecycle methods
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadData();
    }
  }

  setFilter(query) {
    // very important to stringify the data
    const data_query = queryString.stringify(query);

    this.props.history.push(`${this.props.location.pathname}?${data_query}`);
  }

  loadData() {
    fetch(`/api/issues${this.props.location.search}`)
      .then(response => response.json())
      .then(data => {
        // console.log("Total count of records:", data._metadata.total_count);
        data.records.forEach(issue => {
          issue.created = new Date(issue.created);
          if (issue.completionDate) {
            issue.completionDate = new Date(issue.completionDate);
          }
        });
        this.setState({ issues: data.records });
      })
      .catch(err => {
        console.log(err);
      });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    })
      .then(response => {
        if (response.ok) {
          response.json().then(updatedIssue => {
            updatedIssue.created = new Date(updatedIssue.created);
            if (updatedIssue.completionDate) {
              updatedIssue.completionDate = new Date(
                updatedIssue.completionDate
              );
            }
            // this is destructuring the state object
            const { issues } = this.state;
            const newIssues = issues.concat(updatedIssue);
            this.setState({ issues: newIssues });
          });
        } else {
          response.json().then(error => {
            alert(`Failed to add issue: ${error.message}`);
          });
        }
      })
      .catch(err => {
        alert(`Error in sending data to server: ${err.message}`);
      });
  }

  render() {
    const { issues } = this.state;
    return (
      <div>
        <IssueFilter setFilter={this.setFilter} />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
// prop validations
IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
