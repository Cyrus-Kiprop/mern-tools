import React from "react";

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
export default IssueRow;
