const express = require('express');
const app = express();
const bodyParser = require('body-parser')

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
app.listen(3000, function () {
    console.log('App started on port 3000');
});