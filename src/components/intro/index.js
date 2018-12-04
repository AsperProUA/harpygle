import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Intro from './Intro';
import PreSignUp from './PreSignUp';

function NonAuth() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/presign' render={() => <PreSignUp/>} />
                <Route exact path='/ownersignup' render={() => <div></div>} />
                <Route path='/' render={() => <Intro />} />
                
            </Switch>
        </BrowserRouter>
    );
}

export default NonAuth;