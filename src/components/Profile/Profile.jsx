import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from '../Form/Form.module.scss';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import UserId from '../Form/UserId'
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Validation from '../Form/Validation';

function Profile({countyData}) {

    const [formData, setFormData] = useState({
        postcode: "",
        countyId: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    
    const [status, setStatus] = useState('loading');

    console.log(status)

	const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField},
        {label: 'First Name', name: 'firstName', required: true, component: TextField},
        {label: 'Last Name', name: 'lastName', required: true, component: TextField},
        {label: 'County', name: 'countyId', required: true, type: 'combobox', component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField},
	];
	
	useEffect(() => {
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/' + UserId.value)
        .then(response => {
            let newData = {};
            Object.entries(formData).forEach(i => newData[i[0]] = response.data[0][i[0]])
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

    const isValidated = () => {
        let isValidated = true;
        const checkFields = inputItems.filter(i => i.required);
        const newErrors = {...errors};
        checkFields.forEach(i => {
            newErrors[i.name] = '';
            if (!formData[i.name]) {
                newErrors[i.name] = 'Ops! This field is required';
                isValidated = false;
            } 
        })
        
        setErrors({...errors, ...newErrors})
        return isValidated;
    }

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = e => {
        if (!isValidated()) return;
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

    if (!UserId.value) return <Redirect to="/find-water"/>
    
    return (
        <Grid 
            justify="center"
            className={formStyle.container}
            
        >
            <Grid
                container
                alignContent="center"
                justify="center"
                className={`fullHeight ${status==='loading' ? '' : 'hidden'}`}
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
                className={`${formStyle.content} ${status==='idle' || status==='success' ? '' : 'hidden'}`}
            >
                <Snackbar open={status==='success'} autoHideDuration={3000} onClose={handleCloseSnackBar}>
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