import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from '../Form/Form.module.scss';
import axios from 'axios';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import UserId from '../Form/UserId'
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Backdrop, CircularProgress, LinearProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Validation from '../Form/Validation';

function Profile({countyData}) {

    const [formData, setFormData] = useState();
    
    const [status, setStatus] = useState('idle');

	const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField},
        {label: 'First Name', name: 'firstName', required: true, component: TextField},
        {label: 'Last Name', name: 'lastName', required: true, component: TextField},
        {label: 'County', name: 'countyId', required: true, type: 'combobox', component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField},
	];
	
	useEffect(() => {
        setStatus('loading');
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/' + UserId.value)
        .then(response => {
            let newData = {};
            inputItems.map(i => i.name).forEach(i => newData[i] = response.data[0][i]);
            setFormData(newData);
            setStatus('idle');
        })
        .catch(error => {
            setStatus('error');
            console.log(error)
        })
    }, []);

    const [errors, setErrors] = useState({});

    const handleBackClick = e => setStatus('idle');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = e => {
        setStatus('loading');
        axios
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/edit/' + UserId.value, formData)
            .then((response) => {
                console.log(response)
                if (response.data === 'User is updated successfully') {
                    setStatus('success');
                } else {
                    setStatus('error');
                }
            })
            .catch(error => {
                console.log(error)
                setStatus('error');
            })
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };

    if (!UserId.value) return <Redirect to="/signin"/>

    if (!formData) return (
        <Backdrop className='circularProgress' open={!formData}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    
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
                    <p>Something weird happened. <br/> Please try again later.</p>
                    <div>
                        <Button 
                            variant="contained"
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
                className={formStyle.content}
            >
                <Snackbar 
                    open={status==='success'} 
                    autoHideDuration={3000} 
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
                    onClose={handleCloseSnackBar}
                >
                    <Alert onClose={handleCloseSnackBar} severity="success" variant="filled">
                        Profile updated successfully!
                    </Alert>
                </Snackbar>

                <h2 className="center">
                    Profile
                </h2>
               
                <form className={formStyle.profileForm}>
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
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default Profile;