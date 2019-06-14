import React from "react";
import PropTypes from "prop-types";

const IssueRow = ({ issue }) => {
  // let date_created = new Date(issue.created);

  return (
    <tr>
      <td>{issue._id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.completionDate ? issue.completionDate.toDateString() : ""}</td>
      <td>{issue.title}</td>
    </tr>
  );
};
// IssueRow.propTypes = {
//   issue: PropTypes.objectOf(PropTypes.object()).isRequired
// };

export default IssueRow;
