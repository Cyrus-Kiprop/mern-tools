"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
// modularised the server files for easy reuse and usability
// this specically  hamdles the validation procedires of the server side 
var validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};
var issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

function cleanupIssue(issue) {
  var cleanedUpIssue = {};
  Object.keys(issue).forEach(function (field) {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
  return cleanedUpIssue;
}

function convertIssue(issue) {
  if (issue.created) issue.created = new Date(issue.created);
  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
  return cleanupIssue(issue);
}

function validateIssue(issue) {
  var errors = [];
  Object.keys(issueFieldType).forEach(function (field) {
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push("Missing mandatory field: ".concat(field));
    }
  });

  if (!validIssueStatus[issue.status]) {
    errors.push("".concat(issue.status, " is not a valid status."));
  }

  return errors.length ? errors.join('; ') : null;
} // EXPROTING THE UTILITY FUNCTIONS 


var _default = {
  validateIssue: validateIssue,
  cleanupIssue: cleanupIssue,
  convertIssue: convertIssue
};
exports["default"] = _default;
//# sourceMappingURL=Issue.js.map