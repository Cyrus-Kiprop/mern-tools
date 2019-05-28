const contentNode = document.getElementById("contents");
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the Issue Filter.</div>;
  }
}
// buliding and optimising props in react
class IssueRow extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 4 };
    return (
      <tr>
        <td style={borderedStyle}>{this.props.issue_id}</td>
        <td style={borderedStyle}>{this.props.issue_title}</td>
      </tr>
    );
  }
  //   using the getter funcitons to come up with prop validation

  //   static get propTypes() {
  //     return {
  //       issue_id: React.PropTypes.number.isRequired,
  //       issue_title: React.PropTypes.string
  //     };
  //   }
}
// issue row validation
IssueRow.propTypes = {
  issue_id: React.PropTypes.number.isRequired,
  issue_title: React.PropTypes.string
};
//  or you can decide to declare inside the class definition
class IssueTable extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 6 };
    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={borderedStyle}>Id</th>
            <th style={borderedStyle}>Status</th>
            <th style={borderedStyle}>owner</th>
            <th style={borderedStyle}>Created</th>
            <th style={borderedStyle}>Effort</th>
            <th style={borderedStyle}>Completion Date</th>
            <th style={borderedStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow
            issue_id={1}
            issue_title="Error in console when clicking Add"
          />
          <IssueRow issue_id={2} issue_title="Missing bottom border on panel" />
        </tbody>
      </table>
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholder for an Issue Add entry form.</div>;
  }
}
class IssueList extends React.Component {
  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </div>
    );
  }
}

// this is the mock data will be used in the creation of adynamic components
const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking Add"
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel"
  }
];
ReactDOM.render(<IssueList />, contentNode); // Render the component inside the content Node
