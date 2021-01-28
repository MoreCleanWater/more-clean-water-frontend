import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {signUpInput} from '../Form/Form.module.scss';
import signInStyle from '../SignIn/SignIn.module.scss';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import CountyList from '../Form/CountyList'
import UserId from '../Form/UserId'
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Profile() {

    const [form, setForm] = useState({
        postcode: "",
        countyId: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
    });

    const [status, setStatus] = useState('idle');

	const inputItems = [
        {label: 'Email', name: 'email', component: TextField},
        {label: 'First Name', name: 'firstName', component: TextField},
        {label: 'Last Name', name: 'lastName', component: TextField},
        {label: 'County', name: 'countyId', type: 'combobox', component: ComboBox, dataProvider: CountyList.data},
        {label: 'Post Code', name: 'postcode', component: TextField},
        // {label: 'Password', name: 'password', component: TextField, options: {type: 'password'}},
	];
	
	useEffect(() => {
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/' + UserId.value)
        .then(response => {
            let newData = {};
            Object.entries(form).forEach(i => newData[i[0]] = response.data[0][i[0]])
            setForm(newData);
        })
        .catch(error => console.log(error))
    }, []);

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
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/edit/' + UserId.value, form)
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

    if (!UserId.value) return <Redirect to="/find-water"/>
    
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
                    Profile
                </h2>
               
                <form className={signInStyle.profileForm}>
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
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default Profile;