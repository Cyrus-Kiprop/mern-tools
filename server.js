const express = require('express');
const app = express();
const bodyParser = require('body-parser')
let data = (req, res) => {

}


// mounting of middlewares
app.use(express.static('static'));
app.use(bodyParser.json());
// this is the mock data
const issues = [
    {
        id: 1, status: 'Open', owner: 'Ravan',
        created: new Date('2016-08-15'),
        effort: 5,
        completionDate: undefined,
        title: 'Error in console when clicking Add',
    },
    {
        id: 2,
        status: 'Assigned',
        owner: 'Eddie',
        created: new Date('2016-08-16'),
        effort: 14,
        completionDate: new Date('2016-08-30'),
        title: 'Missing bottom border on panel',
    },
];
// the list apis
app.get('/api/issues', (req, res) => {
    const metadata = { total_count: issues.length }
    res.json({ metadata, issues });
});

// the create api(involves post http method)
app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.id = issues.length + 1;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'new'
    }
    // here we add in the processed and defaulted req body issue form the client
    issues.push(newIssue);
    res.json(issues).status(200);

});

// validating server 
const validIssueStatus = {
    New: 'true',
    Open: 'true',
    Assigned: 'true',
    Fixed: 'true',
    Verified: 'true',
    Closed: 'true'
}
// validating the field types
const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};
// this is the validating function
function validateIssues(issue) {
    for (let field in issueFieldType) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field]
        } else if (type === 'required' && !issue[field]) {
            return `${field} is required`
        }
    }


    if (!validIssueStatus[issue.status]) {
        return `${issue.status} is not a valid status.`;
    }
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
    res.json(newIssue);
});
app.listen(3000, function () {
    console.log('App started on port 3000');
});