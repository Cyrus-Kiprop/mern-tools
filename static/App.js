"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
          this.props.issue_title,
          this.props.child
        )
      );
    }
    //   using the getter funcitons to come up with prop validation

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
              "Title"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          React.createElement(
            IssueRow,
            {
              issue_id: 1,
              issue_title: "Error in console when clicking Add"
            },
            "this my dental formula "
          )
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

var IssueList = function (_React$Component5) {
  _inherits(IssueList, _React$Component5);

  function IssueList() {
    _classCallCheck(this, IssueList);

    return _possibleConstructorReturn(this, (IssueList.__proto__ || Object.getPrototypeOf(IssueList)).apply(this, arguments));
  }

  _createClass(IssueList, [{
    key: "render",
    value: function render() {
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
        React.createElement(IssueTable, null),
        React.createElement("hr", null),
        React.createElement(IssueAdd, null)
      );
    }
  }]);

  return IssueList;
}(React.Component);

ReactDOM.render(React.createElement(IssueList, null), contentNode); // Render the component inside the content Node