import React from "react";
import "whatwg-fetch";
// cant get rid of the jsx extentions even though eslint keeps yelling at me....sorry reviewers also am too lazy to google
import IssueFilter from "./IssueFilter.jsx";
import IssueTable from "./IssueTable.jsx";
import IssueAdd from "./IssueAdd.jsx";

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch("/api/issues")
      .then(response => response.json())
      .then(data => {
        console.log("Total count of records:", data._metadata.total_count);
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
