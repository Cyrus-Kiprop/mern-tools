const express = require('express');
const bodyParser = require('body-parser');

// an instance of express
const app = express();

// mounting other middlewares into our server.js
app.use(express.static('dist'));

// bodyparser thingy

app.use(bodyParser.json());

// not validated post pointing to uri
// app.post('/api/issues', (req, res) => {
//     const newIssue = req.body;
//     newIssue.id = issues.length + 1;
//     newIssue.created = new Date();
//     if (!newIssue.status)
//         newIssue.status = 'New';
//     issues.push(newIssue);
//     res.json(validIssueStatus);
// });

// mock data to test the apis
const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2, status: 'Assigned', owner: 'Eddie',
        created: new Date('2016-08-16'), effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    },
];

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};
const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

function validateIssue(issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required.`;
        }
    }
    if (!validIssueStatus[issue.status])
        return `${issue.status} is not a valid status.`;
    return null;
}

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';
    const err = validateIssue(newIssue)
    if (err) {
        res.status(422).json({ message: `Invalid requrest: ${err}` });
        return;
    }
    issues.push(newIssue);
    res.json(issues);
});

app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length };
    res.json({ _metadata: metadata, records: issues });
});

app.listen(3001, () => {
    console.log('App started on port 3001');
});