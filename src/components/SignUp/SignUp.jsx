import {NavLink} from 'react-router-dom'
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Account, Personal, Confirmation} from './SignUpSteps'
import {signUpForm} from '../Form/Form.module.scss';
import {container} from './SignUp.module.scss';
import axios from 'axios';
import CachedIcon from '@material-ui/icons/Cached';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

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

    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value })
    };

    const handleBackClick = (e) => {
        setStatus('idle');
    }
    
    const [step, setStep] = useState(1);

    const prev = (e) => setStep(step > 1 ? step - 1 : step);

    const next = (e) => setStep(step < 3 ? step + 1 : 3);

    const submit = (e) => {
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

    if (status==="submiting") 
        return (
            <Grid
                container
                alignContent="center"
                justify="center"
                className="fullHeight"
            >
                <CachedIcon className="loading"/>
            </Grid>
        );

    if (status==="error") 
        return (
            <Grid
                container
                alignContent="center"
                justify="center"
                className="fullHeight"
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
        );

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
            <Grid item xs={10} md={5}>
                <h2 className="center">
                    New User
                </h2>
                <form className={signUpForm}>
                    <ul>
                        <Account isActive={step === 1} 
                            username={form.username}
                            email={form.email}
                            password={form.password}
                            onChange={handleChange}
                        />
                        <Personal isActive={step === 2}
                            firstName={form.firstName}
                            lastName={form.lastName}
                            countyId={form.countyId}
                            onChange={handleChange}
                        />
                        <Confirmation isActive={step === 3} 	
                            userName={form.userName}
                            email={form.email}
                            password={form.password}
                            firstName={form.firstName}
                            lastName={form.lastName}
                            countyId={form.countyId}
                            postcode={form.postcode}
                            isSubscriber={form.isSubscriber}
                        />
                    </ul>
                    <div className="center">
                        <Button 
                            variant="text"
                            color="primary"
                            disableElevation
                            onClick={prev}
                            className={step === 1 ? 'hidden' : ''}
                        >
                            Previous
                        </Button>
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={next}
                            className={step === 3 ? 'hidden' : ''}
                        >
                            Next
                        </Button>
                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={submit}
                            className={step < 3 ? 'hidden' : ''}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    )
}

export default SignUp;