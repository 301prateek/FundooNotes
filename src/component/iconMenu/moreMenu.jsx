import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './iconButtons.css';


const useStyles = makeStyles((theme) => ({
    more: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        padding: '2px 2px 2px 2px',
        width: '130px',
        border: 'none',
    },
}));

export default function MoreMenu(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menu = 'options';
    const renderMenuMore = (
        <Menu
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            id={menu}
            keepMounted
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            keepMounted
        >
            <div className={classes.more}>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Add Label</MenuItem>
            </div>
        </Menu>
    );

    return (
        <div className="buttons">
            <IconButton
                 id={menu}
                 anchorEl={anchorEl}
                 keepMounted
                 open={open}
                //  onClose={handleClose}
                 onClick={handleClick}
                // className={classes.paper}
                // name="options"
                // edge="end"
                // aria-label="more"
                // aria-controls={menu}
                // aria-haspopup="true"
                // onClick={handleClick}
                // color="inherit"
            >
                <MoreVertOutlinedIcon />
            </IconButton>
            {renderMenuMore}
        </div>
    )
}
