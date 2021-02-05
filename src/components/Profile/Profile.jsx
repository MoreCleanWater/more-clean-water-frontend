import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from 'styles/Form.module.scss';
import axios from 'axios';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Validation from '../Form/Validation';
import CheckBox from 'components/Form/CheckBox';
import { OutlinedInput } from '@material-ui/core';


function Profile({countyData}) {
    const [formData, setFormData] = useState();

    const [status, setStatus] = useState('idle');

    const [userId, setUserId] = useState(localStorage.getItem('userId'));

	const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField},
        {label: 'First Name', name: 'firstName', required: true, component: TextField},
        {label: 'Last Name', name: 'lastName', required: true, component: TextField},
        {label: 'County', name: 'countyId', required: true, type: 'combobox', component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField},
	];
	
	useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setStatus('loading');
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/' + userId)
        .then(response => {
            let newData = {};
            inputItems.map(i => i.name).forEach(i => newData[i] = response.data[0][i]);
            newData.isSubscriber = response.data[0].isSubscriber;
            // newData.isActive = response.data[0].isActive;
            setFormData(newData);
            setStatus('idle');
        })
        .catch(error => {
            setStatus('error');
            console.log(error)
        })
    }

    const [errors, setErrors] = useState({});

    const handleBackClick = e => setStatus('idle');

    const handleFocus = e => setErrors(Validation.isValidated(formData, inputItems));

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = e => {
        setStatus('loading');
        axios
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/edit/' + userId, formData)
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

    const handleToggleActivation = e => {
        setStatus('loading');
        const action = Boolean(e.currentTarget.className) ? 
            'https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/unsubscribe/' + userId
            : 
            'https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/subscribe/' + userId;
            
        axios
        .put(action)
        .then((response) => {
            
            if (response.data === 'User is subscribed successfully'||
                                    'User is unsubscribed successfully') 
            {
                setStatus('success');
                setFormData({...formData, isSubscriber: !formData.isSubscriber});
            } else {
                console.log(response);
                setStatus('error');
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })
    };
 
    const deleteUser = e => {
        setStatus('loading')
        axios
        .delete('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/deactivate/' + userId)
        .then((response) => {
            if (response.data === 'User is deleted successfully') 
            {
                setStatus('deleted');
                setTimeout(() => {
                    localStorage.removeItem('userId');
                    setStatus('idle')
                }, 2000);
            } else {
                console.log(response);
                setStatus('error')
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })
    };

    const [openDialog, setOpenDialog] = useState(false);

    const handleDelete = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        if (status!=='deleted') setOpenDialog(false);
    };

    if (!userId) return <Redirect to="/signin"/>

    if (!formData) return (
        <Backdrop className='circularProgress' open={!formData}>
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    console.log(status)
    return (
        <Grid 
            justify="center"
            className={`${formStyle.container} ${formStyle.profile}`}
            
        >
            <LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm account delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This will delete your account permanently. Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteUser} color="primary" >
                        Yes
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary" autoFocus variant='contained' disableElevation>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
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
                item 
                xs={11}
                md={8}
                className={`${formStyle.content} ${status!=='error' ? '' : 'hidden'}`}
            >
                <Snackbar 
                    open={status==='success'||status==='deleted'} 
                    autoHideDuration={3000} 
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
                    onClose={handleCloseSnackBar}
                >
                    <Alert onClose={handleCloseSnackBar} severity="success" >
                        {status === 'success' ? 'Profile updated successfully!' : 'Profile deleted successfully.'}
                    </Alert>
                </Snackbar>

                <h2 className={`${formStyle.title} ${formStyle.profile}`}>
                    Profile Manager
                </h2>
               
                <form className={formStyle.profileForm}>
                    <div className={`${formStyle.contentBox} ${formStyle.userBox}`}>
                        <OutlinedInput notched disabled label='User information' className={formStyle.border}/>
                        <h4>
                            User information
                        </h4>
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

                        <div className={`${formStyle.buttons} ${formStyle.profile}`}>
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
                    </div>

                    <div className={`${formStyle.contentBox} ${formStyle.subscriptionBox}`}>
                        <OutlinedInput notched disabled label='Manage subscription' className={formStyle.border}/>
                        <h4>
                            Manage subscription
                        </h4>
                        <div
                            onChange={handleToggleActivation}
                            className={formData.isSubscriber && String(formData.isSubscriber)}
                        >
                            <CheckBox
                                value={formData.isSubscriber}  
                                label="Receive water alerts?"
                                disabled={status === 'loading' ? 'disabled' : ''}
                            />
                        </div>
                        
                    </div>

                    <div className={`${formStyle.contentBox} ${formStyle.deleteBox}`}>
                        <OutlinedInput notched disabled label='Danger zone' className={formStyle.border}/>
                        <h4>
                            Danger zone
                        </h4>
                        <Button 
                            variant="outlined"
                            color="primary"
                            disableElevation
                            onClick={handleDelete}
                            disabled={status === 'loading' ? 'disabled' : ''}
                        >
                            Delete account
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default Profile;