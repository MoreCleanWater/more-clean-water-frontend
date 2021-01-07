import {Redirect} from 'react-router-dom'
import {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Account, Personal, Confirmation} from './SignUpSteps'
import {container} from './SignUp.module.scss';

function SignUp({form, onChange}) {
    
    const [step, setStep] = useState(1)

    const [redirect, setRedirect] = useState(null);

    const prev = (e) => setStep(step > 1 ? step - 1 : step)

    const next = (e) => setStep(step < 3 ? step + 1 : 3)

    const submit = (e) => setRedirect("/find-water")

    if (redirect!=null) return (<Redirect to={redirect} />)
    
    return (
        <Grid 
        container
        justify="center"
        className={container}
        >
            <Grid item xs={10}>
                <h2 class="center">
                    Registration
                </h2>
                <form>
                    <ul>
                        <Account isActive={step === 1} 
                            email={form.email}
                            password={form.password}
                            onChange={onChange}
                        />
                        <Personal isActive={step === 2}
                            firstName={form.firstName}
                            lastName={form.lastName}
                            county={form.county}
                            onChange={onChange}
                        />
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