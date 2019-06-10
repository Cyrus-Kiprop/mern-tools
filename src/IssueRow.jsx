import React from 'react';

export default function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created ? issue.created.toDateString() : ''}</td>
      <td>{issue.effort}</td>
      <td>
        {issue.completionDate ? issue.completionDate.toDateString() : ''}
      </td>
      <td>{issue.title}</td>
    </tr>
);
}
