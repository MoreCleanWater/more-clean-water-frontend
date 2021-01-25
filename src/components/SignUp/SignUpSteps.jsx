import { TextField } from '@material-ui/core';
import ComboBox from '../Form/ComboBox';
import {signUpInput} from '../Form/Form.module.scss';
import CountyList from "../CountyList";


function Account({isActive, onChange, userid, email, password}) {
    return (
        <li className={`account${isActive ? ' active-flex' : ''}`}>
                <TextField
                    autoComplete="on"
                    id='userid'
                    name='userid'
                    label='User ID'
                    value={userid}
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='email'
                    name='email'
                    label='Email'
                    value={email}
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='password'
                    name='password'
                    label='Password'
                    type="password"
                    value={password}
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='confirm-password'
                    name='confirm-password'
                    label='Confirm password'
                    type="password"
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
        </li>
    )
}

function Personal({isActive, county, onChange, firstName, lastName}) {
    return (
        <li className={`personal${isActive ? ' active-flex' : ''}`}>
                <TextField
                    autoComplete="on"
                    id='firstName'
                    name='firstName'
                    label='First name'
                    value={firstName}
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='lastName'
                    name='lastName'
                    label='Last name'
                    value={lastName}
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required 
                />
                <ComboBox 
                    id='county'
                    name='county'
                    label='County'
                    value={county}
                    onChange={onChange}
                    variant='outlined' 
                    className={signUpInput}
                    dataProvider={CountyList.data ? CountyList.data : ''}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='postCode'
                    name='postCode'
                    label='Post code'
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
            
        </li>
    )
}

function Confirmation({isActive, userid, email, firstName, lastName, county, postCode}) {
    return (
        <li className={`confirmation${isActive ? ' active-flex' : ''}`}>
            <ul>
                <li>User ID: {userid}</li>
                <li>Email: {email}</li>
                <li>First name: {firstName}</li>
                <li>Last Name: {lastName}</li>
                <li>County: {county}</li>
                <li>Post code: {postCode}</li>
            </ul>
        </li>
    )
}

export {Account, Personal, Confirmation};