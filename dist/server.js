"use strict";

var _sourceMapSupport = _interopRequireDefault(require("source-map-support"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import queryString from 'query-string'
var ObjectId = require('mongodb').ObjectID;

_sourceMapSupport["default"].install();

var express = require('express');

var bodyParser = require('body-parser'); // an instance of express


var app = express(); // mounting other middlewares into our server.js

app.use(express["static"]('static'));

var qpm = require('query-params-mongo');

var mongodb = require('mongodb');

var processQuery = qpm({
  autoDetect: [{
    fieldPattern: /_id$/,
    dataType: 'objectId'
  }],
  converters: {
    objectId: mongodb.ObjectID
  }
}); // hot module replacement using HMR  express middlewares
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

app.use(bodyParser.json()); // not validated post pointing to uri
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
}; // this function validates the issue object created by the user

function validateIssue(issue) {
  for (var field in issueFieldType) {
    var type = issueFieldType[field];

    if (!type) {
      delete issue[field];
    } else if (type === 'required' && !issue[field]) {
      return "".concat(field, " is required.");
    }
  }

  if (!validIssueStatus[issue.status]) return "".concat(issue.status, " is not a valid status.");
  return null;
}

app.post('/api/issues', function (req, res) {
  var newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status) newIssue.status = 'New';
  var err = validateIssue(newIssue);

  if (err) {
    res.status(422).json({
      message: "Invalid request: ".concat(err)
    });
    return;
  }

  db.collection('issues').insertOne(newIssue).then(function (result) {
    return db.collection('issues').find({
      _id: result.insertedId
    }).limit(1).next();
  }).then(function (newIssue) {
    res.json(newIssue);
  })["catch"](function (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error: ".concat(error)
    });
  });
});
app.get('/api/issues', function (req, res) {
  var filter = {};
  if (req.query.status) filter.status = req.query.status; // filtering using the effort field

  if (req.query.effort_gte || req.query.effort_lte) filter.effort = {};
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  console.log(filter); // this is a conditional statement that checks for undefined query

  if (filter !== undefined) {
    db.collection('issues').find(filter).toArray().then(function (issues) {
      var metadata = {
        total_count: issues.length
      };
      console.log(filter);
      res.json({
        _metadata: metadata,
        records: issues
      });
    })["catch"](function (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error: ".concat(error)
      });
    });
  } else {
    db.collection('issues').find().toArray().then(function (issues) {
      var metadata = {
        total_count: issues.length
      };
      res.json({
        _metadata: metadata,
        records: issues
      });
    })["catch"](function (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal Server Error: ".concat(error)
      });
    });
  }
}); // the get api

app.get('/api/issues/:id', function (req, res) {
  var issueId;

  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({
      message: "Invalid issue ID format: ".concat(error)
    });
    return;
  }

  db.collection('issues').find({
    _id: issueId
  }).limit(1).next().then(function (issue) {
    if (!issue) res.status(404).json({
      message: "No such issue: ".concat(issueId)
    });else res.json(issue);
  })["catch"](function (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error: ".concat(error)
    });
  });
}); // the update api

app.put('api/issues/:id', function (req, res) {
  var issueId;

  try {
    issueId = new ObjectId(req.match.params.id);
  } catch (error) {
    res.status(422).send("this is an invalid id ".concat(error));
  }

  var issue = req.body;
  delete issue.id;
  var err = Issue.validateIssue(issue);

  if (err) {
    res.status(422).json({
      message: "Invalid request: ".concat(err)
    });
    return;
  }

  db.collection('issues').update({
    _id: issueId
  }, Issue.convertIssue(issue)).then(function () {
    return db.collection('issues').find({
      _id: issueId
    }).limit(1).next();
  }).then(function (savedIssue) {
    res.json(savedIssue);
  })["catch"](function (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error: ".concat(error)
    });
  });
});
var db = null; // Initialize connection once

_mongodb.MongoClient.connect("mongodb://localhost:27017/test", function (err, client) {
  if (err) throw err;
  db = client.db('test'); // Start the application after the database connection is ready

  app.listen(3001, function () {
    console.log("Listening on port 3001");
  });
});
//# sourceMappingURL=server.js.map