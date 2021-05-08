import React from 'react';
import { withAuthentication } from '../Session';

function Calendar(props) {
    return (
        <h1>Calendar</h1>
    )
};

export default withAuthentication(Calendar);
