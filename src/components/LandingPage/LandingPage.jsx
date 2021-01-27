import {Redirect} from 'react-router-dom'
import {useState} from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';
import {NavLink} from "react-router-dom";
import './LandingPage.scss';
import {landingForm, signUpInput} from '../Form/Form.module.scss';
import {Grid} from '@material-ui/core'

function LandingPage ({form, onChange}) {

    const [redirect, setRedirect] = useState(null);

    return (
        <div className="landing-page">
            <div className="ocean-wrapper">
                <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>
            
            <div className="content-wrapper">
                <Grid container
                    alignContent="center"
                    className="content"
                    justify="center"
                >
                    <div className="title">
                        <h1>
                            More Clean Water
                        </h1>
                        <h2>
                            Helping you to access clean water
                        </h2>
                        <h3>
                            Sign up now and receive water shortage alerts, water cleaning advises and more.
                        </h3>
                    </div>
                    
                    <form className={landingForm}>
                            <TextField
                                autoComplete="on"
                                required id='email'
                                label='Email'
                                variant="outlined"
                                className={signUpInput}
                                onChange={onChange}
                            />

                            <Button 
                                variant="contained"
                                color="primary"
                                disableElevation
                                component={NavLink}
                                to="/signup"
                            >
                                Sign Up
                            </Button>
                    
                        <p>
                            Are you already registered? 
                        </p>

                        <Button 
                            variant="text"
                            color="primary"
                            disableElevation
                            component={NavLink}
                            to="/signin"
                        >
                            Sign in
                        </Button>

                        <NavLink to="/find-water" className="enter">
                            <p>
                                Or proceed without sign up
                            </p>
                        </NavLink>
                    </form>
                </Grid>
            </div>
        </div>
    )
}

export default LandingPage;