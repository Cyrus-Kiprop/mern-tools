import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import queryStrings from 'query-string';

class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    let parsed_data = queryStrings.parse(this.props.initFilter.search);
    this.state = {
      status: '',
      effort_gte: '4',
      effort_lte: '20',
      changed: false
    };

    console.log(this.props.initFilter);

    console.log(parsed_data);
    // Binding the handler functions to access the this instance
    // this.setFilterOpen = this.setFilterOpen.bind(this);
    // this.setFilterNew = this.setFilterNew.bind(this);
    // this.setFilterAssigned = this.setFilterAssigned.bind(this);

    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  // Handler methods
  // setFilterOpen(e) {
  //   e.preventDefault();
  //   this.props.setFilter({ status: 'Open' });
  // }

  // setFilterAssigned(e) {
  //   e.preventDefault();
  //   this.props.setFilter({ status: 'Assigned' });
  // }

  // setFilterNew(e) {
  //   e.preventDefault();
  //   this.props.setFilter({ status: 'New' });
  // }
  // // this handles colorto green  change when the user clicks on the links
  // changeColor() {
  //   this.setState({
  //     bgcolor: 'green'
  //   });
  // }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value,
      changed: true
    });
  }

  onChangeEffortGte(e) {
    let range = e.target.value;
    if (range.match(/^\d*$/gm)) {
      this.setState({
        effort_gte: range,
        changed: true
      });
    }
  }

  onChangeEffortLte(e) {
    let range = e.target.value;
    if (range.match(/^\d*$/gm)) {
      this.setState({
        effort_lte: range,
        changed: true
      });
    }
  }
  clearFilter() {
    this.props.setFilter({});
  }
  applyFilter() {
    let filter = {};
    if (this.state.status) filter.status = this.state.status;
    if (this.state.effort_gte) filter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) filter.effort_lte = this.state.effort_lte;
    this.props.setFilter(filter);
  }

  // reset the filter their initial state
  resetFilter() {
    this.setState({
      status: this.props.status || '',
      effort_gte: this.props.effort_gte || '',
      effort_lte: this.props.effort_lte || '',
      changed: false
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(this.props)
    this.setState({
      status: nextProps.status || '',
      effort_gte: nextProps.effort_gte || '',
      effort_lte: nextProps.effort_lte || '',
      changed: false
    });
  }

  render() {
    return (
      <div>
        Status:
        <select value={this.state.status} onChange={this.onChangeStatus}>
          <option value="">(Any)</option>
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="Fixed">Fixed</option>
          <option value="Verified">Verified</option>
          <option value="Closed">Closed</option>
        </select>
        &nbsp;Effort between:
        <input
          size={15}
          value={this.state.effort_gte}
          onChange={this.onChangeEffortGte}
        />
        &nbsp;-&nbsp;
        <input
          size={15}
          value={this.state.effort_lte}
          onChange={this.onChangeEffortLte}
        />
        <button onClick={this.applyFilter}>Apply</button>
        <button onClick={this.resetFilter} disabled={!this.state.changed}>
          Reset
        </button>
        <button onClick={this.clearFilter}>Clear</button>
      </div>
    );
  }
}
// prop validations
IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired
};

export default IssueFilter;
