import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Intro from './Intro';
import PreSignUp from './PreSignUp';
import OwnerSignUp from './OwnerSignUp';
import SupplierSignUp from './SupplierSignUp';
import SignIn from './SignIn';
import Parnter from './partner/PartnerSurvey';
import PartnerPreSignUp from './partner/PartnerPreSignUp';
import PartnerFinalSignup from './partner/PartnerFinalSignup';

//partner
import ForgotPassword from './ForgotPassword';


function NonAuth() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/presign' render={() => <PreSignUp/>} />
                <Route exact path='/owner/signup' render={() => <OwnerSignUp/>} />
                <Route exact path='/supplier/signup' render={() => <SupplierSignUp/>} />
                <Route exact path='/signin' render={() => <SignIn/>} />
                <Route exact path='/partner' render={() => <Parnter/>} />
                <Route exact path='/forgotpassword' render={() => <ForgotPassword/>} />
                <Route exact path='/partner/presignup' render={() => <PartnerPreSignUp/>} />
                <Route exact path='/partner/finalsignup' render={() => <PartnerFinalSignup/>} />

                <Route path='/' render={() => <Intro />} />
                
            </Switch>
        </BrowserRouter>
    );
}

export default NonAuth;