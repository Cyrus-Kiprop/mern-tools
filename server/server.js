import sourceMapSupport from 'source-map-support'
// import queryString from 'query-string'
import { MongoClient } from 'mongodb';

var ObjectId = require('mongodb').ObjectID;


sourceMapSupport.install()

const express = require('express');
const bodyParser = require('body-parser');

// an instance of express
const app = express();

// mounting other middlewares into our server.js
app.use(express.static('static'));


var qpm = require('query-params-mongo');
var mongodb = require('mongodb');

var processQuery = qpm({
    autoDetect: [{ fieldPattern: /_id$/, dataType: 'objectId' }],
    converters: { objectId: mongodb.ObjectID }
});




// hot module replacement using HMR  express middlewares
// if (process.env.NODE_ENV !== 'production') {
//     const webpack = require('webpack');
//     const webpackDevMiddleware = require('webpack-dev-middleware');
//     const webpackHotMiddleware = require('webpack-hot-middleware');

//     // getting the webpack config files
//     const config = require('./webpack.config');

//     config.entry.app.push('webpack-hot-middleware/client','webpack/hot/only-dev-server');
//     config.plugins.push(new webpack.HotModuleReplacementPlugin());
//     const bundler = webpack(config);
//     // Mounting the HMR middlewares using app.use() middleware mounter
//     app.use(webpackDevMiddleware(bundler, { noInfo: true }));
//     app.use(webpackHotMiddleware(bundler, { log: console.log }));
//   }




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
// const issues = [
//     {
//         id: 1, status: 'Open', owner: 'Ravan',
//         created: new Date('2016-08-15'), effort: 5, completionDate: undefined,
//         title: 'Error in console when clicking Add',
//     },
//     {
//         id: 2, status: 'Assigned', owner: 'Eddie',
//         created: new Date('2016-08-16'), effort: 14,
//         completionDate: new Date('2016-08-30'),
//         title: 'Missing bottom border on panel',
//     },
// ];

const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};
const issueFieldType = {
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};
// this function validates the issue object created by the user
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
    newIssue.created = new Date();
    if (!newIssue.status)
        newIssue.status = 'New';
    const err = validateIssue(newIssue)
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    db.collection('issues').insertOne(newIssue).then(result =>
        db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
    ).then(newIssue => {
        res.json(newIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/issues', (req, res) => {

    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    // filtering using the effort field
    if (req.query.effort_gte || req.query.effort_lte) filter.effort = {};
    if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
    if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    console.log(filter)
    // this is a conditional statement that checks for undefined query
    if (filter !== undefined) {
        db.collection('issues').find(filter).toArray().then(issues => {
            const metadata = { total_count: issues.length };
            console.log(filter);
            res.json({ _metadata: metadata, records: issues })
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
    } else {
        db.collection('issues').find().toArray().then(issues => {
            const metadata = { total_count: issues.length };
            res.json({ _metadata: metadata, records: issues })
        }).catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
    }
});

// the get api
app.get('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = new ObjectId(req.params.id);
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
    db.collection('issues').find({ _id: issueId }).limit(1)
        .next()
        .then(issue => {
            if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
            else res.json(issue);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});

// the update api
app.put('api/issues/:id', (req, res) => {
    let issueId;
    try {

        issueId = new ObjectId(req.match.params.id)
    } catch (error) {
        res.status(422).send(`this is an invalid id ${error}`)
    }
    const issue = req.body;
    delete issue.id;
    const err = Issue.validateIssue(issue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    db.collection('issues').update({ _id: issueId },
        Issue.convertIssue(issue)).then(() =>
            db.collection('issues').find({ _id: issueId }).limit(1)
                .next()
        )
        .then(savedIssue => {
            res.json(savedIssue);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: `Internal Server Error: ${error}` });
        });
});

let db = null;

// Initialize connection once
MongoClient.connect("mongodb://localhost:27017/test", (err, client) => {
    if (err) throw err;

    db = client.db('test');

    // Start the application after the database connection is ready
    app.listen(3001, () => {
        console.log("Listening on port 3001")
    });

});