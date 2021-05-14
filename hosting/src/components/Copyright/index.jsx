import React from 'react';

// Material UI Import
import Typography from '@material-ui/core/Typography';

// Copyright implemented on bottom of every page
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Created by © Shayaan Akbar '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;
