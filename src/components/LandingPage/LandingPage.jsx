import {Redirect} from 'react-router-dom'
import {useState} from 'react';
import { TextField, Button, FormControl } from '@material-ui/core';
import {NavLink} from "react-router-dom";
import './LandingPage.scss';
import {Grid} from '@material-ui/core'

function LandingPage ({form, onChange}) {

    const [redirect, setRedirect] = useState(null);

    const handleRegister = (e) => setRedirect("/signup");

    if (redirect!=null) return (<Redirect to={redirect} />)

    return (
        <div className="landing-page">
            <div className="ocean-wrapper">
                <div className="ocean">
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>
            
            <div className="content-wrapper">
                <Grid container
                    alignContent="center"
                    className="content"
                    justify="center"
                >
                    <div className="title">
                        <h1>
                            More Clean Water
                        </h1>
                        <h2>
                            Helping you to access clean water
                        </h2>
                        <h3>
                            Register now and receive water shortage alerts, water cleaning advises and more.
                        </h3>
                    </div>
                    
                    <FormControl>
                        <TextField
                            autoComplete="on"
                            required id='email'
                            label='Email'
                            variant='filled'
                            onChange={onChange}
                        />

                        <Button 
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </FormControl>

                    <NavLink to="/find-water" className="enter">Or click here to proceed</NavLink>
                        
                </Grid>
            </div>
        </div>
    )
}

export default LandingPage;