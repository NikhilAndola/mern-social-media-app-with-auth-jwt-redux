import React, { useState } from "react";
import {
    Avatar,
    Button,
    Paper,
    Grid,
    Typography,
    Container,
} from "@material-ui/core";
import useStyles from "./styles";
import { LockOutlined } from "@material-ui/icons";
import Input from "./Input";
import Icon from './Icon'
import GoogleLogin from "react-google-login";

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const [isSignUp, setIsSignUp] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = () => { };

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const switchMode = () => {
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);
    };

    const googleSuccess = (res) => {
        console.log("response",res);
    }
    const googleFailure = (error) => {
        console.log("Google signIn was unsuccessful. Try again later", error)
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />
                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name="confirmPassword"
                                label="Repeat Password"
                                handleChange={handleChange}
                                type="password"
                            />
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin
                        clientId= {process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                        render={(renderProps) => (
                            <Button
                                className={classes.googleButton}
                                color="primary"
                                button
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                  
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? "Already have an account? Sign In"
                                    : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
