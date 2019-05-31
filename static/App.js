"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById("contents");

var IssueFilter = function (_React$Component) {
  _inherits(IssueFilter, _React$Component);

  function IssueFilter() {
    _classCallCheck(this, IssueFilter);

    return _possibleConstructorReturn(this, (IssueFilter.__proto__ || Object.getPrototypeOf(IssueFilter)).apply(this, arguments));
  }

  _createClass(IssueFilter, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "This is a placeholder for the Issue Filter."
      );
    }
  }]);

  return IssueFilter;
}(React.Component);
// buliding and optimising props in react


function IssueRow(props) {
  var borderedStyle = { border: "1px solid silver", padding: 4 };
  return React.createElement(
    "tr",
    null,
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_id
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_status
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_owner
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_created.toDateString()
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_effort
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_completion_date ? props.issue_completion_date.toDateString() : ""
    ),
    React.createElement(
      "td",
      { style: borderedStyle },
      props.issue_title
    )
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
  var testFile = props.testFile;
  var row_data = testFile.map(function (values, index) {
    return React.createElement(IssueRow, {
      key: index,
      issue_id: values.id,
      issue_title: values.title,
      issue_owner: values.owner,
      issue_created: values.created,
      issue_effort: values.effort,
      issue_completion_date: values.completionDate,
      issue_status: values.status
    });
  });
  var borderedStyle = { border: "1px solid silver", padding: 6 };

  return React.createElement(
    "table",
    { style: { borderCollapse: "collapse" } },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          { style: borderedStyle },
          "Id"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "Status"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "owner"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "Created"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "Effort"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "Completion Date"
        ),
        React.createElement(
          "th",
          { style: borderedStyle },
          "Title"
        )
      )
    ),
    React.createElement(
      "tbody",
      null,
      row_data
    )
  );
}

var IssueAdd = function (_React$Component2) {
  _inherits(IssueAdd, _React$Component2);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    var _this2 = _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).call(this));

    _this2.handleSubmit = _this2.handleSubmit.bind(_this2);
    return _this2;
  }

  _createClass(IssueAdd, [{
    key: "handleSubmit",
    value: function handleSubmit(event) {
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
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "form",
          { name: "issueAdd", onSubmit: this.handleSubmit },
          React.createElement("input", { type: "text", name: "owner", placeholder: "Owner" }),
          React.createElement("input", { type: "text", name: "title", placeholder: "Title" }),
          React.createElement(
            "button",
            null,
            "Add"
          )
        )
      );
    }
  }]);

  return IssueAdd;
}(React.Component);
// Asynchronous state initialiation in react


var IssueList = function (_React$Component3) {
  _inherits(IssueList, _React$Component3);

  function IssueList(props) {
    _classCallCheck(this, IssueList);

    var _this3 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this, props));

    _this3.state = {
      issues: [] // initialising the issue stater with an emty array which will later be populated using ajax calls
    };
    //
    _this3.createTestIssue = _this3.createTestIssue.bind(_this3);
    _this3.createIssue = _this3.createIssue.bind(_this3);
    // setTimeout(this.createTestIssue, 3000);
    return _this3;
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


  _createClass(IssueList, [{
    key: "createIssue",
    value: function createIssue(newIssue) {
      var newIssues = this.state.issues.slice(); // makes a copy of the initial array
      newIssue.id = this.state.issues.length + 1;
      newIssues.push(newIssue);
      this.setState({ issues: newIssues });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this4 = this;

      setTimeout(function () {
        return _this4.createTestIssue();
      }, 1000);
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

  }, {
    key: "createTestIssue",
    value: function createTestIssue() {
      var _createIssue;

      this.createIssue((_createIssue = {
        status: "New",
        owner: "Pieta",
        title: "Completion date should be optional"
      }, _defineProperty(_createIssue, "status", "Open"), _defineProperty(_createIssue, "created", new Date("2016-08-15")), _defineProperty(_createIssue, "effort", 5), _defineProperty(_createIssue, "completionDate", undefined), _createIssue));
    }
  }, {
    key: "render",
    value: function render() {
      var dataFile = this.props.data;
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h1",
          null,
          "Issue Tracker"
        ),
        React.createElement(IssueFilter, null),
        React.createElement("hr", null),
        React.createElement(IssueTable, { testFile: this.state.issues }),
        React.createElement(
          "button",
          { onClick: this.createTestIssue },
          "Add"
        ),
        React.createElement("hr", null),
        React.createElement(IssueAdd, { createIssue: this.createIssue })
      );
    }
  }]);

  return IssueList;
}(React.Component);

// this is the mock data will be used in the creation of adynamic components
// this is an array of objects

var issues = [{
  id: 1,
  status: "Open",
  owner: "Ravan",
  created: new Date("2016-08-15"),
  effort: 5,
  completionDate: undefined,
  title: "Error in console when clicking Add"
}, {
  id: 2,
  status: "Assigned",
  owner: "Eddie",
  created: new Date("2016-08-16"),
  effort: 14,
  completionDate: new Date("2016-08-30"),
  title: "Missing bottom border on panel"
}];
ReactDOM.render(React.createElement(IssueList, { data: issues }), contentNode); // Render the component inside the content Node