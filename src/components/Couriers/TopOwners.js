import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SvgIcon from '@material-ui/core/SvgIcon';


const styles = theme => ({

});

class TopOwners extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ownerList: [],
            menuAnchor: null,
        }
    }

    handleClick = event => {
        this.setState({ menuAnchor: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ menuAnchor: null });
    };



    render() {
        const { classes } = this.props;
        const { menuAnchor } = this.state;
        return (
            <div>
                <div>
                    <Button
                        aria-owns={menuAnchor ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                       <SvgIcon>

                       </SvgIcon>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleClose}>Performance</MenuItem>
                        <MenuItem onClick={this.handleClose}>Number of delivered Products</MenuItem>
                    </Menu>
                </div>
            </div>
        );
    }
}

TopOwners.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopOwners);