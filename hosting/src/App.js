import React, {useEffect} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

// style imports
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './config/theme.config';

// component imports
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme} >
                <Switch>
                    <Route exact path="/">
                        <SignIn />
                    </Route>
                    <Route path="/sign-up">
                        <SignUp />
                    </Route>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                </Switch>
            </ThemeProvider>
        </Router>
    );
}

export default App;
