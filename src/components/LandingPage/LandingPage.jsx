import { TextField, Button } from '@material-ui/core';
import {NavLink, Redirect} from "react-router-dom";
import './LandingPage.scss';
import formStyle from 'styles/Form.module.scss';
import {Grid} from '@material-ui/core'
import { useState } from 'react';
import Email from '../Form/Email'
import 'components/LandingPage/LandingPage.scss'
import Ocean from 'components/Ocean/Ocean';

function LandingPage () {
    const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField},
    ];

    const [form, setForm] = useState({email: ""});
    
    const [redirect, setRedirect] = useState(null);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

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
            <Ocean/>
            
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
                    
                    <form className={formStyle.landingForm}>
                        <TextField
                            autoComplete="on"
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            value={form.email}
                            error={errors.email ? 'error' : ''}
                            helperText={errors.email}
                            className={formStyle.formInput}
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
                    
                        <div className={formStyle.actions}>
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

                            <NavLink to="/find-water" className={formStyle.link}>
                                Or proceed without sign up
                            </NavLink>
                        </div>
                    </form>
                </Grid>
            </div>
        </div>
    )
}

export default LandingPage;