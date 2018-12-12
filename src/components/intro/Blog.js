import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';

import Footer from './Footer';

const style = theme => ({
    root: {
        height: 'calc(100vh - 431px)',
        textAlign: 'center',
    },
});

function Blog(props) {
    const { classes } = props;
    return (
        <div>
            <Header />
            <div className={classes.root}>
                <h1>Blog</h1>
            </div>
            <Footer/>
        </div>
    );
}

Blog.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(style)(Blog);