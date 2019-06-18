import React from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class IssueFilter extends React.Component {
  constructor(props) {
    super(props);
this.state ={
  bgcolor: ''
}
    // Binding the handler functions to access the this instance
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterNew = this.setFilterNew.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }
  // Handler methods
  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({ status: "Open" });
  }

  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({ status: "Assigned" });
  }

  setFilterNew(e) {
    e.preventDefault();
    this.props.setFilter({ status: "New" });
  }
  // this handles colorto green  change when the user clicks on the links
changeColor(){
  this.setState({
    bgcolor: 'green'
  });
}

  render() {
    const Separator = () => <span> | </span>;

    return (
      <div>
        <Link to="/issues">All Issues</Link>
        <Separator />
        <a href="#"  onClick={this.setFilterOpen}>
          Open Issues
        </a>
        <Separator />
        <a href="#" onClick={this.setFilterNew}>
          New Issues
        </a>
        <Separator />
        <a href="#" onClick={this.setFilterAssigned}>
          {" "}
          Assigned Issues
        </a>
      </div>
    );
  }
}
// prop validations
IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
}

export default IssueFilter;
