import React, { useState } from 'react';
import { withFirebase } from "../firebaseFE/index";
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import useStyles from "../config/theme-signinup";
import Copyright from "../components/Copyright";
import PasswordForget from "../components/PasswordForget";

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
            .then(async authUser => {
                // Create a user in the Firebase realtime database
                await props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username: user.name,
                        email: user.email,
                        activities: 'not set'
                    });
                return authUser;
            })
            .then(authUser => {
                console.log(authUser.user)
                setUser(authUser);
                props.history.push("/dashboard");
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
                    Sign up
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
                        <Grid item>
                            <Link to="/">
                                <PasswordForget />
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
