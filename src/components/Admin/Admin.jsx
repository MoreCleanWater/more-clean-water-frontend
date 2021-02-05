import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from 'styles/Form.module.scss';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import { Redirect } from 'react-router-dom';
import Validation from '../Form/Validation';
import { LinearProgress } from '@material-ui/core';
import 'components/LandingPage/LandingPage.scss'

function Admin() {
    
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

    const handleFocus = e => setErrors(Validation.isValidated(formData, inputItems));

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = () => {
        console.log(formData)
        setStatus('loading');
        if (formData.userName==="admin"&&formData.password==='admin1234') {
            localStorage.setItem('adminId', 1);
            setTimeout(() => {
                setStatus('success');
            }, 1500);
        } else {
            setStatus('error');
        }
    }
    
    if (status==="success") return <Redirect push to="/admin/users"/>

    return (
        <Grid 
            justify="center"
            className={`${formStyle.container} ${formStyle.admin}`}
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
                item xs={11}
                md={5}
                className={`${formStyle.content} ${status==='error' ? 'hidden' : ''}`}
            >

                <h2 className={formStyle.title}>
                    Admin area
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
                                onFocus={handleFocus}
                            />
                        )
                    })}

                    <p style={{fontSize: '.75rem', margin: '-.85rem 0 1.5rem'}}>
                        {/* Forgot password? */}
                    </p>

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
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default Admin;