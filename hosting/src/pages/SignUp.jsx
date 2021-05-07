import React, { useState } from 'react';
import { withFirebase } from "../firebaseFE/index";
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import useStyles from "../config/theme-signinup";
import Copyright from "../components/Copyright";
import PasswordForget from "../components/PassWordForget";

function SignUp(props) {
    const classes = useStyles();

    const initialUser = {id: null, name: '', email: '', password: '', error: null, auth: null}

    const [user, setUser] = useState(initialUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleSubmit = e => {
        props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
            // Later add user also to database
            .then(authUser => {
                setUser(initialUser);
                props.history.push("/calendar");
            })
            .catch(error => {
                setUser({...user, error: error.message})
            });
    }

    const isValid = user.name === '' || user.email === '' || user.password === '';

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form
                    className={classes.form}
                    noValidate
                    onSubmit={e => e.preventDefault()}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoFocus
                        value={user.name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Typography className={classes.error}>
                        {user.error ? user.error : ''}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={isValid}
                    >
                        Sign up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};

export default withRouter(withFirebase(SignUp));
