import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SvgIcon from '@material-ui/core/SvgIcon';
import getData from '../../services/getData';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
    bigAvatar: {
        width: 60,
        height: 60,
        marginRight: 25,
    },
    ownerBadge: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textAlign: 'left',
        color: '#636363',
        fontSize: 20,
        fontWeight: 'bold',
    },
    li: {
        marginBottom: 20,
        listStyle: 'none',
        position: 'relative',
        marginLeft: 50,
        '&::before': {
            content: 'counter(li)',
            counterIncrement: 'li',
            position: 'absolute',
            top: 20,
            left: -25,
            fontSize: 20,
        }
    }
});

class TopOwners extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerList: [
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
                {
                    imgUrl: 'pictures/fakeData/poy_benbernanke.png',
                    name: 'Ahmed'
                },
            ],
            menuAnchor: null,
        }
    }

    handleClick = event => {
        this.setState({ menuAnchor: event.currentTarget });
    };

    handleClose = (type) => {
        this.setState({ menuAnchor: null });
        getData({ url: `ownerrate/${type}` }).then(response => {
            this.setState({ ownerList: response.data.response });
        });
    };



    render() {
        const { classes } = this.props;
        const { menuAnchor, ownerList } = this.state;
        return (
            <div>
                <div>
                    <Button
                        style={{ marginLeft: 25 }}
                        aria-owns={menuAnchor ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <SvgIcon style={{ width: 45, height: 25 }} >
                            <g id="iconfinder_00-ELASTOFONT-STORE-READY_sliders_2738302" transform="translate(-1 -3.991)">
                                <path id="Path_395" data-name="Path 395" d="M1.932,8.66h8.3a3.719,3.719,0,0,0,7.211,0H29.878a.932.932,0,0,0,0-1.863H17.439a3.719,3.719,0,0,0-7.211,0h-8.3a.932.932,0,0,0,0,1.863Zm11.9-2.806A1.874,1.874,0,1,1,11.96,7.728,1.876,1.876,0,0,1,13.834,5.854Z" fill="#88c601" />
                                <path id="Path_396" data-name="Path 396" d="M29.878,12.8H27.883a3.719,3.719,0,0,0-7.21,0H1.932a.932.932,0,1,0,0,1.863H20.672a3.719,3.719,0,0,0,7.21,0h1.995a.932.932,0,1,0,0-1.863Zm-5.6,2.806a1.874,1.874,0,1,1,1.874-1.874A1.876,1.876,0,0,1,24.277,15.6Z" transform="translate(0 1.452)" fill="#88c601" />
                                <path id="Path_397" data-name="Path 397" d="M29.878,18.8H11.828a3.718,3.718,0,0,0-7.209,0H1.932a.932.932,0,1,0,0,1.863H4.619a3.718,3.718,0,0,0,7.209,0H29.878a.932.932,0,1,0,0-1.863ZM8.224,21.6A1.874,1.874,0,1,1,10.1,19.728,1.876,1.876,0,0,1,8.224,21.6Z" transform="translate(0 2.905)" fill="#88c601" />
                            </g>
                        </SvgIcon>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={() => this.handleClose('perfomanse')}>Performance</MenuItem>
                        <MenuItem onClick={() => this.handleClose('deliveredproducts')}>Number of delivered Products</MenuItem>
                    </Menu>
                </div>
                <div>
                    <ol>
                        {ownerList.map(owner => {
                            return (
                                <li className={classes.li}>
                                    <div className={classes.ownerBadge}>
                                        <Avatar src={owner.imgUrl} className={classes.bigAvatar} />
                                        <div>{owner.name}</div>
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

TopOwners.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopOwners);