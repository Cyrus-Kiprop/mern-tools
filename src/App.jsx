import ReactDOM from 'react-dom';
import React from 'react';
// importing the modularized files from other directories

import IssueList from './IssueList.jsx';

// importation of modularized filess



const contentNode = document.getElementById('contents');

ReactDOM.render(<IssueList />, contentNode);
