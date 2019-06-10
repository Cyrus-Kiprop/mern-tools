import React from 'react';
import IssueRow from './IssueRow.jsx';

export default function IssueTable({ issues }) {
  const issueRows = issues.map(issue => (<IssueRow key={issue.id} issue={issue} />));
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
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
);
}
