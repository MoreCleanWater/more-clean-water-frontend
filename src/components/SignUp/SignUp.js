import {Redirect} from 'react-router-dom'
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Account, Personal, Confirmation} from './SignUpSteps'
import {container} from './SignUp.module.scss';

function SignUp() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        county: '',
        postcode: ''
    })

    const [step, setStep] = useState(1)

    const [redirect, setRedirect] = useState(null);

    const prev = (e) => setStep(step > 1 ? step - 1 : step)

    const next = (e) => setStep(step < 3 ? step + 1 : 3)

    const handleChange = (e) => setForm({...form, [e.target.id]: e.target.value})
    
    const submit = (e) => setRedirect("/find-water")

    if (redirect!=null) return (<Redirect to={redirect} />)
    
    return (
        <Grid 
        container
        justify="center"
        className={container}
        >
            <Grid item xs={10}>
                <form>
                    <ul>
                        <Account isActive={step === 1} onChange={handleChange}/>
                        <Personal isActive={step === 2} county={form.county} onChange={handleChange}/>
                        <Confirmation isActive={step === 3} 	
                            email={form.email}
                            firstName={form.firstName}
                            lastName={form.lastName}
                            county={form.county}
                            postCode={form.postCode}
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