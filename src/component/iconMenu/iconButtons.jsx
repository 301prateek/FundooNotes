import React, { useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import PaletteOutlinedIcon from '@material-ui/icons/PaletteOutlined';
import AddAlertOutlinedIcon from '@material-ui/icons/AddAlertOutlined';
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './iconButtons.css';
import MoreMenu from './moreMenu';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginRight: theme.spacing(1),

    },
    palette: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        padding: '2px 2px 2px 2px',
        width: '130px',
        border: 'none',
    },
    button: {
        margin: theme.spacing(0.5),
        borderRadius: "50%",
        width: '5px',
        height: '5px',
    },
    more: {
        display: 'flex',
        flexDirection: 'row',
        flexFlow: 'wrap',
        padding: '2px 2px 2px 2px',
        width: '130px',
        border: 'none',
    },
}));

export default function IconButtons(props) {

    const colors = [
        '#fff',
        '#f28b82',
        '#fbbc04',
        '#fff475',
        '#ccff90',
        '#a7ffeb',
        '#cbf0f8',
        '#aecbfa',
        '#d7aefb',
        '#fdcfe8',
        '#e6c9a8',
        '#e8eaed'
    ];


    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const [color, setColor] = React.useState();

    const handleColorChange = (value) => {
        props.handleColor(value);
    }

    const handlePalleteMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'palette-menu';
    const renderMenu = (
        <Menu
            getContentAnchorEl={null}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <div className={classes.palette}>
                {colors.map((value) => (
                    <IconButton
                        className={classes.button}
                        style={{ backgroundColor: value }}
                        onClick={() => handleColorChange(value)}>
                    </IconButton>
                ))}
            </div>
        </Menu>
    );

    return (
        <div className="buttons">
            <IconButton>
                <AddAlertOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonAddOutlinedIcon />
            </IconButton>
            <IconButton
                // className="profile"
                className={classes.paper}
                name="palette-menu"
                edge="end"
                aria-label="color palette"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handlePalleteMenuOpen}
                color="inherit"
            >
                <PaletteOutlinedIcon />
            </IconButton>
            {renderMenu}
            <IconButton>
                <ImageOutlinedIcon />
            </IconButton>
            <IconButton>
                <ArchiveOutlinedIcon />
            </IconButton>
            <MoreMenu />
        </div>
    )
}