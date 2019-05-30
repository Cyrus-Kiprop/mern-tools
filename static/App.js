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


var IssueRow = function (_React$Component2) {
  _inherits(IssueRow, _React$Component2);

  function IssueRow() {
    _classCallCheck(this, IssueRow);

    return _possibleConstructorReturn(this, (IssueRow.__proto__ || Object.getPrototypeOf(IssueRow)).apply(this, arguments));
  }

  _createClass(IssueRow, [{
    key: "render",
    value: function render() {
      var borderedStyle = { border: "1px solid silver", padding: 4 };
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_id
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_status
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_owner
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_created.toDateString()
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_effort
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_completion_date ? this.props.issue_completion_date.toDateString() : ""
        ),
        React.createElement(
          "td",
          { style: borderedStyle },
          this.props.issue_title
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

  }]);

  return IssueRow;
}(React.Component);
// issue row validation


IssueRow.propTypes = {
  issue_id: React.PropTypes.number.isRequired,
  issue_title: React.PropTypes.string
};
//  or you can decide to declare inside the class definition

var IssueTable = function (_React$Component3) {
  _inherits(IssueTable, _React$Component3);

  function IssueTable() {
    _classCallCheck(this, IssueTable);

    return _possibleConstructorReturn(this, (IssueTable.__proto__ || Object.getPrototypeOf(IssueTable)).apply(this, arguments));
  }

  _createClass(IssueTable, [{
    key: "render",
    value: function render() {
      var testFile = this.props.testFile;
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
  }]);

  return IssueTable;
}(React.Component);

var IssueAdd = function (_React$Component4) {
  _inherits(IssueAdd, _React$Component4);

  function IssueAdd() {
    _classCallCheck(this, IssueAdd);

    return _possibleConstructorReturn(this, (IssueAdd.__proto__ || Object.getPrototypeOf(IssueAdd)).apply(this, arguments));
  }

  _createClass(IssueAdd, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        "This is a placeholder for an Issue Add entry form."
      );
    }
  }]);

  return IssueAdd;
}(React.Component);
// Asynchronous state initialiation in react


var IssueList = function (_React$Component5) {
  _inherits(IssueList, _React$Component5);

  function IssueList(props) {
    _classCallCheck(this, IssueList);

    var _this5 = _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).call(this, props));

    _this5.state = {
      issues: [] // initialising the issue stater with an emty array which will later be populated using ajax calls
    };
    _this5.createTestIssue = _this5.createTestIssue.bind(_this5);
    setTimeout(_this5.createTestIssue, 3000);
    return _this5;
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
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this6 = this;

      setTimeout(function () {
        _this6.setState({
          issues: issues
        }), 500;
      });
    }
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
        React.createElement(IssueAdd, null)
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