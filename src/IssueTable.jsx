import React from 'react';
import PropTypes from 'prop-types';
import IssueRow from './IssueRow.jsx';

export default function IssueTable({ issues, deleteIssue }) {
  const issueRows = issues.map(issue => (
    <IssueRow key={issue._id} issue={issue} deleteIssue={deleteIssue} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
          <th />
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}
IssueTable.propTypes = {
  issues: PropTypes.array.isRequired,
  deleteIssue: PropTypes.func
};
