import React from "react";
import "whatwg-fetch";
import queryString from "query-string";
// cant get rid of the jsx extentions even though eslint keeps yelling at me....sorry reviewers am also too lazy to google
import IssueFilter from "./IssueFilter.jsx";
import IssueTable from "./IssueTable.jsx";
import IssueAdd from "./IssueAdd.jsx";

export default class IssueList extends React.Component {
  // _isMounted = false;
  constructor(props) {
    super(props);
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }
  // React Lifecycle methods
  componentDidUpdate(prevProps) {
    // the query strings have to be passed using query strings
    // const oldQuery = prevProps.location.query;
    // const parsed_oldQuery = queryString.parse(oldQuery);
    // console.log(parsed_oldQuery.status);
    // const newQuery = this.props.location.query;
    // const parsed_newQuery = queryString.parse(newQuery);
    // console.log(parsed_newQuery.status);
    // if (parsed_oldQuery.status === parsed_newQuery.status) {
    //   return;
    // }
    this.loadData();
  }
  // componentWillUnmount() {
  //   this._isMounted = false;
  // }

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
    fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}
