import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const IssueEdit = ({ match }) => {
  return (
    <div>
      <p>{`This is a placeholder for editing issue ${match.params.id}`}</p>
      <Link to="/issues">Back to issue list</Link>
    </div>
  );
};
// validating the propTypes
// The param props is the one that has the id as an item
// IssueEdit.propTypes = {
//   match: PropTypes.objectOf(PropTypes.object()).isRequired
// };
export default IssueEdit;
