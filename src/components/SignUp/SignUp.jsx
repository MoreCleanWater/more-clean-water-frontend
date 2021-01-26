import {NavLink} from 'react-router-dom'
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {signUpForm, signUpInput} from '../Form/Form.module.scss';
import {container} from './SignUp.module.scss';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import CheckBox from '../Form/CheckBox';
import CountyList from "../Form/CountyList";

function SignUp() {

    const [form, setForm] = useState({
        userName: "",
        postcode: "",
        countyId: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        isSubscriber: "",
    });

    const [status, setStatus] = useState('error');

    const inputItems = [
        {label: 'Username', name: 'userName', component: TextField, step: 0},
        {label: 'Email', name: 'email', component: TextField, step: 0},
        {label: 'Password', name: 'password', type: 'password', component: TextField, options: {type: 'password'}, step: 0},
        {label: 'Confirm Password', name: 'confirmPassword', component: TextField, options: {type: 'password'}, step: 0},
        {label: 'First Name', name: 'firstName', component: TextField, step: 1},
        {label: 'Last Name', name: 'lastName', component: TextField, step: 1},
        {label: 'County', name: 'countyId', type: 'combobox', component: ComboBox, dataProvider: CountyList.data, step: 1},
        {label: 'Post Code', name: 'postcode', component: TextField, step: 1},
        {label: 'Receive water alerts?', name: 'isSubscriber', component: CheckBox, options:{multiline: true, rows:4}, step: 1},
    ]

    const maxStep = 2;

    const formSteps = ['Account', 'Personal'];

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value })
    };

    const handleBackClick = (e) => {
        setStatus('idle');
    }
    
    const [step, setStep] = useState(0);

    const prev = (e) => setStep(step > 0 ? step - 1 : step);

    const next = (e) => setStep(step < maxStep ? step + 1 : maxStep);

    const isValidated = () => {
        return false;
    }

    const submit = (e) => {
        if (!isValidated()) return;
        const newUser = {...form}
        delete newUser.confirmPassword;
        setStatus('submiting');
        axios
            .post('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/add', newUser)
            .then((response) => {
                console.log(response.data)
                return (response.data === '' ? setStatus('error') : setStatus('sucesss'))
            })
            .catch(error => {
                setStatus('error');
                console.log(error)
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
                    <p>Welcome! You account has been created</p>
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
        
    return (
        <Grid 
            container
            justify="center"
            className={container}
        >
            <Grid
                container
                alignContent="center"
                justify="center"
                className={`fullHeight ${status==='submiting' ? '' : 'hidden'}`}
            >
                <CachedIcon className="loading"/>
            </Grid>

            <Grid
                container
                alignContent="center"
                justify="center"
                className={`fullHeight ${status==='error' ? '' : 'hidden'}`}
            >
                <div style={{textAlign: 'center'}}>
                    <ErrorIcon className="alertColor" style={{fontSize: '5rem'}}/>
                    <h2 style={{margin:0}}>Uh oh!</h2>
                    <p>Something weird happened. Keep calm and try again.</p>
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
            
            <Grid item xs={10} md={5} className={status==='idle' ? '' : 'hidden'}>
                <h2 className="center">
                    New User
                </h2>
                <form className={signUpForm}>
                    <ul>
                        {formSteps.map((formStep, formIndex) => {
                            return (
                                <li className={`account${step === formIndex ? ' active-flex' : ''}`}>
                                    {inputItems.filter(i => i.step === formIndex).map(i => {
                                        const Component = i.component;
                                        return (
                                            <Component
                                                autoComplete="on"
                                                id={i.name}
                                                name={i.name}
                                                label={i.label}
                                                value={form[i.name]}
                                                className={signUpInput}
                                                options={i.options ? i.options : ''}
                                                dataProvider={i.dataProvider ? i.dataProvider : ''}
                                                onChange={handleChange}
                                                required
                                            />
                                        )
                                    })}
                                </li>
                            )
                        })}

                        <li className={`confirmation${step === maxStep ? ' active-flex' : ''}`}>
                            <ul>
                                <li>Username: {form.userName}</li>
                                <li>Email: {form.email}</li>
                                <li>Password: {form.password ? form.password.split('').map(i => '•') : ''}</li>
                                <li>First name: {form.firstName}</li>
                                <li>Last Name: {form.lastName}</li>
                                <li>Receive water alerts? {form.isSubscriber ? 'Yes' : 'No'}</li>
                                <li>County: {CountyList.data && form.countyId ? CountyList.data.find(i => i.countyId === form.countyId)['county']: ''}</li>
                                <li>Post code: {form.postcode}</li>
                            </ul>
                        </li>
                    </ul>

                    <div className="center">
                        {step === 0 ? '' : 
                            <Button 
                                variant="text"
                                color="primary"
                                disableElevation
                                onClick={prev}
                            >
                                Previous
                            </Button>
                        }
                        
                        {step < maxStep ?  
                            <Button 
                                variant="contained"
                                color="primary"
                                disableElevation
                                onClick={next}
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
                                onClick={submit}
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