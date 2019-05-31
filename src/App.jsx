const contentNode = document.getElementById("contents");
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the Issue Filter.</div>;
  }
}
// buliding and optimising props in react
function IssueRow(props) {
  const borderedStyle = { border: "1px solid silver", padding: 4 };
  return (
    <tr>
      <td style={borderedStyle}>{props.issue_id}</td>
      <td style={borderedStyle}>{props.issue_status}</td>
      <td style={borderedStyle}>{props.issue_owner}</td>
      <td style={borderedStyle}>{props.issue_created.toDateString()}</td>
      <td style={borderedStyle}>{props.issue_effort}</td>
      <td style={borderedStyle}>
        {props.issue_completion_date
          ? props.issue_completion_date.toDateString()
          : ""}
      </td>
      <td style={borderedStyle}>{props.issue_title}</td>
    </tr>
  );
}
// using the getter funcitons to come up with prop validation

//   static get propTypes() {
//     return {
//       issue_id: React.PropTypes.number.isRequired,
//       issue_title: React.PropTypes.string
//     };
//   }

// issue row validation
IssueRow.propTypes = {
  issue_id: React.PropTypes.number.isRequired,
  issue_title: React.PropTypes.string
};
//  or you can decide to declare inside the class definition

// stateless components
function IssueTable(props) {
  const testFile = props.testFile;
  const row_data = testFile.map((values, index) => {
    return (
      <IssueRow
        key={index}
        issue_id={values.id}
        issue_title={values.title}
        issue_owner={values.owner}
        issue_created={values.created}
        issue_effort={values.effort}
        issue_completion_date={values.completionDate}
        issue_status={values.status}
      />
    );
  });
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
      <tbody>{row_data}</tbody>
    </table>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date()
    });
    form.owner.value = "";
    form.title.value = "";
  }
  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
// Asynchronous state initialiation in react
class IssueList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [] // initialising the issue stater with an emty array which will later be populated using ajax calls
    };
    //
    this.createTestIssue = this.createTestIssue.bind(this);
    this.createIssue = this.createIssue.bind(this);
    // setTimeout(this.createTestIssue, 3000);
  }
  // createIssue(newIssue) {
  //   const original_issue = this.state.issues; // this preserves the original state of the issues array
  //   const newIssues = this.state.issues.slice(); // this one create a new  array
  //   newIssue.id = original_issue.length + 1;
  //   newIssues.push(newIssue);
  //   this.setState({
  //     issues: [...original_issue, Object.assign({}, { newIssues })]
  //   });
  // }
  createIssue(newIssue) {
    const newIssues = this.state.issues.slice(); // makes a copy of the initial array
    newIssue.id = this.state.issues.length + 1;
    newIssues.push(newIssue);
    this.setState({ issues: newIssues });
  }
  componentDidMount() {
    setTimeout(() => this.createTestIssue(), 1000);
  }
  // loadData() {
  //   setTimeout(() => {
  //     this.setState({
  //       issues: issues
  //     }),
  //       1000;
  //   });
  // }
  // this function invokes the createIssue function
  createTestIssue() {
    this.createIssue({
      status: "New",
      owner: "Pieta",
      title: "Completion date should be optional",
      status: "Open",
      created: new Date("2016-08-15"),
      effort: 5,
      completionDate: undefined
    });
  }
  render() {
    const dataFile = this.props.data;
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable testFile={this.state.issues} />
        <button onClick={this.createTestIssue}>Add</button>
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

// this is the mock data will be used in the creation of adynamic components
// this is an array of objects

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
ReactDOM.render(<IssueList data={issues} />, contentNode); // Render the component inside the content Node
