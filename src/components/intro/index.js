import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Intro from './Intro';

function NonAuth () {
    return (
        <Intro />
    );
}

export default  NonAuth;