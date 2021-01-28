import { TextField, Button } from '@material-ui/core';
import {NavLink, Redirect} from "react-router-dom";
import './LandingPage.scss';
import {landingForm, signUpInput} from '../Form/Form.module.scss';
import {Grid} from '@material-ui/core'
import { useState } from 'react';
import Email from '../Form/Email'

function LandingPage () {
    const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField},
    ];

    const [form, setForm] = useState({email: ""});
    
    const [redirect, setRedirect] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSignUp = e => {
        if (!isValidated()) return;
        Email.value = form.email;
        setRedirect('/signup');
    }

    const [errors, setErrors] = useState({});

    const isValidated = () => {
        let isValidated = true;
        const checkFields = inputItems.filter(i => i.required);
        const newErrors = {...errors};
        checkFields.forEach(i => {
            newErrors[i.name] = '';
            if (!form[i.name]) {
                newErrors[i.name] = 'Ops! This field is required';
                isValidated = false;
            } 
        })
        
        setErrors({...errors, ...newErrors});
        return isValidated;
    }

    if (redirect) return <Redirect push to={redirect}/>

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
                                id='email'
                                name='email'
                                label='Email'
                                variant='outlined'
                                value={form.email}
                                error={errors.email ? 'error' : ''}
                                helperText={errors.email}
                                className={signUpInput}
                                onChange={handleChange}
                            />

                            <Button 
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                    
                        <p className='more'>
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
                            <p className='more'>
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