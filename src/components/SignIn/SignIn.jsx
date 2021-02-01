import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from 'styles/Form.module.scss';
import axios from 'axios';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import { Redirect, NavLink } from 'react-router-dom';
import UserId from '../Form/UserId'
import Validation from '../Form/Validation';
import { LinearProgress } from '@material-ui/core';

function SignIn() {
    
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
    });

    const [status, setStatus] = useState('idle');

    const inputItems = [
        {label: 'Username', name: 'userName', required: true, component: TextField},
        {label: 'Password', name: 'password', required: true, component: TextField, options: {type: 'password'}},
    ]

    const [errors, setErrors] = useState({});

    const handleBackClick = e => setStatus('idle');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = () => {
        setStatus('loading');
        axios
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/login', formData)
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
            className={formStyle.container}
            
        >
            <LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>

            <Grid
                container
                alignContent="center"
                justify="center"
                className={`full-height ${status==='error' ? '' : 'hidden'}`}
            >
                <div style={{textAlign: 'center'}}>
                    <ErrorIcon className="alertColor" style={{fontSize: '5rem'}}/>
                    <h2 style={{margin:0}}>Uh oh!</h2>
                    <p>Invalid email or password. <br/> Please try again.</p>
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
                className={`${formStyle.content} ${status==='error' ? 'hidden' : ''}`}
            >
                <h2 className={formStyle.title}>
                    Sign in
                </h2>
               
                <form className={formStyle.signInForm}>
                    {inputItems.map(i => {
                        const Component = i.component;
                        return (
                            <Component
                                id={i.name}
                                name={i.name}
                                label={i.label}
                                value={formData[i.name]}
                                error={errors[i.name] ? 'error' : ''}
                                helperText={errors[i.name]}
                                className={formStyle.formInput}
                                options={i.options ? i.options : ''}
                                dataProvider={i.dataProvider ? i.dataProvider : ''}
                                onChange={handleChange}
                            />
                        )
                    })}

                    <div className={formStyle.buttons}>
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={handleSubmit}
                            disabled={status === 'loading' ? 'disabled' : ''}
                        >
                            Submit
                        </Button>

                        <div className={formStyle.actions}>
                            <p>
                                Don't have an account yet?
                            </p>

                            <Button 
                                variant="outlined"
                                color="primary"
                                disableElevation
                                component={NavLink}
                                to="/signup"
                                disabled={status === 'loading' ? 'disabled' : ''}
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