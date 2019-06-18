import sourceMapSupport from 'source-map-support'
// import queryString from 'query-string'
import { MongoClient } from 'mongodb';


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
    // try {
    //     var query = processQuery(req.query.status,
    //         { name: { dataType: 'string', required: false } },
    //         true
    //     );
    // } catch (errors) {
    //     res.status(500).send(errors);
    // }
    // console.log(query);
    const filter = {};
    filter.status = req.query.status;
    // this is a conditional statement that checks for undefined query
    if (filter.status !== undefined) {
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