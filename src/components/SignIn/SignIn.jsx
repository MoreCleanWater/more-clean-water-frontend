import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {signUpInput} from '../Form/Form.module.scss';
import signInStyle from './SignIn.module.scss';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import { Redirect, NavLink } from 'react-router-dom';
import UserId from '../Form/UserId'

function SignIn() {
    
    const [form, setForm] = useState({
        userName: "",
        password: "",
    });

    const [status, setStatus] = useState('idle');

    const inputItems = [
        {label: 'Username', name: 'userName', required: true, component: TextField},
        {label: 'Password', name: 'password', required: true, component: TextField, options: {type: 'password'}},
    ]

    const [errors, setErrors] = useState({});

    const handleBackClick = (e) => setStatus('idle');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const isValidated = () => {
        let isValidated = true;
        const checkFields = inputItems.filter(i => i.required);
        const newErrors = {...errors};
        checkFields.forEach(i => {
            newErrors[i.name] = '';
            if (form[i.name] === '') {
                newErrors[i.name] = 'Ops! This field is required';
                isValidated = false;
            } 
        })
        
        setErrors({...errors, ...newErrors})
        return isValidated;
    }

    const submit = (e) => {
        if (!isValidated()) return;
        setStatus('submiting');
        axios
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/login', form)
            .then((response) => {
                if (response.data === 'Invalid email or password') {
                    setStatus('error');
                } else {
                    UserId.value = response.data;
                    console.log(UserId.value)
                    setStatus('success');
                }
            })
            .catch(error => {
                console.log(error)
                setStatus('error');
            })
    }
    
    if (status==="success") return <Redirect push to="/find-water"/>

    return (
        <Grid 
            justify="center"
            className={signInStyle.container}
            
        >
            <Grid
                container
                alignContent="center"
                justify="center"
                className={`full-height ${status==='submiting' ? '' : 'hidden'}`}
            >
                <CachedIcon className="loading"/>
            </Grid>

            <Grid
                container
                alignContent="center"
                justify="center"
                className={`full-height ${status==='error' ? '' : 'hidden'}`}
            >
                <div style={{textAlign: 'center'}}>
                    <ErrorIcon className="alertColor" style={{fontSize: '5rem'}}/>
                    <h2 style={{margin:0}}>Uh oh!</h2>
                    <p>Invalid email or password. Please try again.</p>
                    <div>
                        <Button 
                            variant="contained"
                            // className="alertColor" 
                            disableElevation
                            onClick={handleBackClick}
                            style={{marginTop: '1rem'}}
                        >
                            BACK
                        </Button>
                    </div>
                </div>
            </Grid>
            
            <Grid 
                item xs={10}
                md={5}
                className={`${signInStyle.content} ${status==='idle' ? '' : 'hidden'}`}
            >
                <h2 className="center">
                    Sign in
                </h2>
               
                <form className={signInStyle.signInForm}>
                    {inputItems.map(i => {
                        const Component = i.component;
                        return (
                            <Component
                                id={i.name}
                                name={i.name}
                                label={i.label}
                                value={form[i.name]}
                                error={errors[i.name] ? 'error' : ''}
                                helperText={errors[i.name]}
                                className={signUpInput}
                                options={i.options ? i.options : ''}
                                dataProvider={i.dataProvider ? i.dataProvider : ''}
                                onChange={handleChange}
                            />
                        )
                    })}

                    <div className={signInStyle.buttons}>
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={submit}
                        >
                            Submit
                        </Button>

                        <div className={signInStyle.more}>
                            <p>
                                Don't have an account yet?
                            </p>

                            <Button 
                                variant="outlined"
                                color="primary"
                                disableElevation
                                component={NavLink}
                                to="/signup"
                            >
                                Sign Up
                            </Button>

                            <NavLink to="/find-water" className="enter">
                                <p>
                                    Or proceed without sign up
                                </p>
                            </NavLink>
                        </div>
                        
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignIn;