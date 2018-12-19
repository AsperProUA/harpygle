import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SvgIcon from '@material-ui/core/SvgIcon';

import SalesAndProfit from './SalesAndProfit';
import TopOwners from './TopOwners';


const styles = theme => ({
    root: {
        width: '100%',
        minHeight: 'calc(100% - 130px)',
    },
    tabRoot: {
        maxWidth: '100vw',
        width: '100vw',
        [theme.breakpoints.up('md')]: {
            maxWidth: 'calc(100vw - 240px)',
            width: 'calc(100vw - 240px)',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 'calc(100vw - 240px - 280px)',
            width: 'calc(100vw - 240px - 280px)',
        },
        display: 'inline-block',
    },
    tabs: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    container: {
        width: '100%',
    },
    indicator: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    categoryLabel: {
        verticalAlign: 'middle',
    },
    ctegorySelected: {
        color: '#000',
    }
});




class Analytics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
        }
    }

    changeCategory = (e, value) => {
        console.log(value)
        this.setState({ currentTab: value });
    }

    render() {
        const { classes } = this.props;
        const { currentTab } = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.tabs}>
                    <div className={classes.tabRoot}>
                        <Tabs
                            className={classes.tabs}
                            value={currentTab}
                            onChange={this.changeCategory}
                            classes={{
                                indicator: classes.indicator,
                                flexContainer: classes.container,
                            }}
                            scrollable
                            scrollButtons="auto"
                        >

                            <Tab label={
                                <span>
                                    <SvgIcon viewBox='0 0 27 27' style={{ top: 8, position: 'relative', marginRight: 8}}>
                                        <g id="iconfinder_line-chart_2_322455" transform="translate(0 144)">
                                            <path id="Path_400" data-name="Path 400" d="M1.188-126.187H19V-125H0v-19H2.375v1.188H1.188v2.375H2.375v1.188H1.188v2.375H2.375v1.188H1.188v2.375H2.375v1.188H1.188v2.375H2.375v1.188H1.188Zm13.606-10.071c-.068,1.049-.154,2.352-.544,2.352-.695,0-.885-.378-1.218-1.375-.308-.923-.729-2.187-2.345-2.187-1.691,0-2.049,2.157-2.366,4.059-.228,1.366-.511,3.066-1.2,3.066-1.212,0-1.779-3.189-1.781-5.344H4.156c0,.668.084,6.531,2.969,6.531,1.692,0,2.05-2.156,2.367-4.059.229-1.366.511-3.066,1.2-3.066s.885.377,1.218,1.375c.309.924.73,2.188,2.345,2.188,1.5,0,1.619-1.761,1.729-3.46.186-2.841.511-4.852,3.021-4.852v-1.187C15.183-142.219,14.949-138.631,14.794-136.259Z" />
                                        </g>
                                    </SvgIcon>
                                    Sales & Profit
                                </span>
                            }
                                classes={{
                                    selected: classes.ctegorySelected,
                                    label: classes.categoryLabel,
                                    root: classes.categoryRoot,
                                }} />
                            <Tab label={<span>
                                <SvgIcon viewBox='0 0 27 27' style={{ top: 8, position: 'relative', marginRight: 8 }}>
                                    <g id="iconfinder_user_group_man_man_2639942" transform="translate(0 -3)">
                                        <path id="Path_401" data-name="Path 401" d="M12.684,17.869A1.958,1.958,0,0,1,12,17V15.25a4.89,4.89,0,0,0,1.734-2.1,3.769,3.769,0,0,1-.664-1.7,2.61,2.61,0,0,1,.223-1.536A5.461,5.461,0,0,1,13,8.25a6.959,6.959,0,0,1,.8-3.287,2.639,2.639,0,0,0-1.8-.65S11.626,3,9.5,3A5.13,5.13,0,0,0,4,8.25a4.71,4.71,0,0,0,.528,1.937.979.979,0,0,0-.474,1.048c.164,1.123.72,1.407,1.074,1.431A4.573,4.573,0,0,0,7,15.25V17c-1,2.625-7,.875-7,7H9A6.153,6.153,0,0,1,12.684,17.869Z" />
                                        <g id="Group_365" data-name="Group 365" transform="translate(13 3.001)">
                                            <path id="Path_402" data-name="Path 402" d="M23,17V15.25a4.574,4.574,0,0,0,1.872-2.583c.354-.024.91-.308,1.074-1.431a.978.978,0,0,0-.474-1.048A4.19,4.19,0,0,0,26,8.251c0-2.124-.953-3.937-3-3.937C23,4.313,22.626,3,20.5,3A5.129,5.129,0,0,0,15,8.25a4.71,4.71,0,0,0,.528,1.937.979.979,0,0,0-.474,1.048c.164,1.123.72,1.407,1.074,1.431A4.573,4.573,0,0,0,18,15.25V17c-1,2.625-7,.875-7,7H30C30,17.875,24,19.625,23,17Z" transform="translate(-11 -3.001)" />
                                        </g>
                                    </g>
                                </SvgIcon>
                                Top business owners
                                </span>} classes={{
                                    selected: classes.ctegorySelected,
                                    label: classes.categoryLabel,
                                    root: classes.categoryRoot,
                                }} />
                        </Tabs>
                    </div>
                </div>
                {currentTab == 0 && <SalesAndProfit />}
                {currentTab == 1 && <TopOwners />}
            </div>
        );
    }
}

Analytics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Analytics);