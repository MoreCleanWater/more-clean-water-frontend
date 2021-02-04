import {NavLink, Redirect} from 'react-router-dom'
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import formStyle from 'styles/Form.module.scss';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import CheckBox from '../Form/CheckBox';
import Email from '../Form/Email'
import Validation from '../Form/Validation';
import UserId from '../Form/UserId';
import { LinearProgress } from '@material-ui/core';

function SignUp({countyData}) {

    const [formData, setFormData] = useState({
        userName: "",
        postcode: "",
        countyId: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        email: Email.value,
        isSubscriber: "",
    });
    
    const [status, setStatus] = useState('idle');

    const inputItems = [
        {label: 'Email', name: 'email', required: true, component: TextField, options:{autoComplete: 'off'}, step: 0},
        {label: 'Username', name: 'userName', required: true, component: TextField, step: 0},
        {label: 'Password', name: 'password', required: true, component: TextField, options: {type: 'password'}, step: 0},
        {label: 'Confirm Password', name: 'confirmPassword', required: true, component: TextField, options: {type: 'password'}, step: 0},
        {label: 'First Name', name: 'firstName', required: true, component: TextField, step: 1},
        {label: 'Last Name', name: 'lastName', required: true, component: TextField, step: 1},
        {label: 'County', name: 'countyId', required: true, component: ComboBox, dataProvider: countyData, step: 1},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField, step: 1},
        {label: 'Receive water alerts?', name: 'isSubscriber', required: false, component: CheckBox, step: 1},
    ]

    const maxStep = 2;

    const formSteps = ['Account details', 'Local information'];

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    };

    const handleBackClick = e => setStatus('idle');
    
    const [step, setStep] = useState(0);

    const handlePrevious = e => setStep(step > 0 ? step - 1 : step);

    const handleNext = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems, step);
        setErrors(errors);
        return (isValidated ? setStep(step < maxStep ? step + 1 : maxStep) : isValidated)
    }

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? submitData() : isValidated)
    }

    const submitData = () => {
        const newUser = {...formData}
        delete newUser.confirmPassword;
        setStatus('loading');

        axios
        .post('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/add', newUser)
        .then((sigin) => {
            if (sigin.data === 'User is created successfully') {
                axios
                .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/login', {userName: newUser.userName, password: newUser.password})
                .then((signup) => {
                    if (signup !== 'Invalid email or password') UserId.value = signup.data;
                    setStatus('success');
                })
                .catch(error => {
                    console.log(error)
                    setStatus('error');
                })
            } else {
                setStatus('error')
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })

    }

    if (status==="success") 
        return (
            <Grid
                container
                alignContent="center"
                justify="center"
                className="fullHeight"
            >
                <div style={{textAlign: 'center'}}>
                    <CheckCircleIcon color="primary" style={{fontSize: '5rem'}}/>
                    <h2 style={{margin:0}}>Woo hoo!</h2>
                    <p style={{lineHeight: 1.5}}>Welcome! <br/> You account has been created</p>
                    <div>
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            component={NavLink}
                            to="/find-water"
                            style={{marginTop: '1rem'}}
                        >
                            GO TO APP
                        </Button>
                    </div>
                </div>
            </Grid>
        );

    if (UserId.value) return <Redirect to="/find-water"/>
    
    return (
        <Grid 
            container
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
                    <p style={{lineHeight: 1.5}}>Something weird happened. <br/> Keep calm and try again.</p>
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
                className={formStyle.content}
            >
                <h2 className={formStyle.title}>
                    User registration
                </h2>
                <p className={formStyle.subtitle}>
                    {/* {formSteps[step]} */}
                </p>
                <form>
                    <ul>
                        {formSteps.map((formStep, formIndex) => {
                            return (
                                <li key={formIndex} className={step === formIndex ? ' active-flex' : ''}>
                                    {inputItems.filter(i => i.step === formIndex).map(i => {
                                        const Component = i.component;
                                        return (
                                            <Component
                                                key={i.name}
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
                                </li>
                            )
                        })}

                        <li className={step === maxStep ? ' active-flex' : ''}>
                            <ul className={formStyle.confirmation}>
                                <li>Username: {formData.userName}</li>
                                <li>Email: {formData.email}</li>
                                <li>Password: {formData.password ? formData.password.split('').map(i => '•') : ''}</li>
                                <li>First name: {formData.firstName}</li>
                                <li>Last Name: {formData.lastName}</li>
                                <li>Receive water alerts? {formData.isSubscriber ? 'Yes' : 'No'}</li>
                                <li>County: {countyData && formData.countyId ? countyData.find(i => i.countyId === formData.countyId)['county']: ''}</li>
                                <li>Post code: {formData.postcode}</li>
                            </ul>
                        </li>
                    </ul>

                    <div className={formStyle.buttons}>
                        {step === 0 ? '' : 
                            <Button 
                                variant="text"
                                color="primary"
                                disableElevation
                                onClick={handlePrevious}
                                disabled={status === 'loading' ? 'disabled' : ''}
                            >
                                Previous
                            </Button>
                        }
                        
                        {step < maxStep ?  
                            <Button 
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                            : ''
                        }

                        {step < maxStep ? '' : 
                            <Button 
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={handleSubmit}
                                disabled={status === 'loading' ? 'disabled' : ''}
                            >
                                Submit
                            </Button>
                        }
                        
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignUp;