import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hashHistory } from 'react-router';
import Add from './src/add.component.jsx';
import Users from './src/users.component.jsx';
import Update from './src/update.component.jsx';
import Upload from './src/file_upload.component.jsx';
import RcPaginate from './src/rcpage.component.jsx';
import Paginate from './src/pagination.component.jsx';
import Boot from './src/reactbootstrap.component.jsx';


render(
    <Router history={hashHistory}>
    <div>
        <Route path="/add" component={Add}/>
        <Route path="/users" component={Users}/>
        <Route path="/edit" component={Update}/>
        <Route path="/upload" component={Upload}/>
        <Route path="/rcpage" component={RcPaginate}/> 
        <Route path="/page" component={Paginate}/>
        <Route path="/boot" component={Boot}/>
        </div>
</Router>,
document.getElementById('container'));

