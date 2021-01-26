import { TextField } from '@material-ui/core';
import ComboBox from '../Form/ComboBox';
import CheckBox from '../Form/CheckBox';
import {signUpInput} from '../Form/Form.module.scss';
import CountyList from "../Form/CountyList";

function Account({isActive, onChange, userName, email, password}) {
    return (
        <li className={`account${isActive ? ' active-flex' : ''}`}>
                <TextField
                    autoComplete="on"
                    id='userName'
                    name='userName'
                    label='Username'
                    value={userName}
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
                    id='confirmPassword'
                    name='confirmPassword'
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

function Personal({isActive, countyId, onChange, firstName, lastName, isSubscriber}) {
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
                    id='countyId'
                    name='countyId'
                    label='County *'
                    value={countyId}
                    onChange={onChange}
                    variant='outlined' 
                    className={signUpInput}
                    dataProvider={CountyList.data ? CountyList.data : ''}
                    required
                />
                <TextField
                    autoComplete="on"
                    id='postcode'
                    name='postcode'
                    label='Post code'
                    onChange={onChange}
                    variant="outlined"
                    className={signUpInput}
                    required
                />
                <CheckBox
                    id='isSubscriber'
                    name='isSubscriber'
                    label='Receive water alerts?'
                    value={isSubscriber}
                    onChange={onChange}
                    required
                />

            
        </li>
    )
}

function Confirmation({isActive, userName, email, password, firstName, lastName, countyId, postcode, isSubscriber}) {
    return (
        <li className={`confirmation${isActive ? ' active-flex' : ''}`}>
            <ul>
                <li>Username: {userName}</li>
                <li>Email: {email}</li>
                <li>Password: {password ? password.split('').map(i => '•') : ''}</li>
                <li>First name: {firstName}</li>
                <li>Last Name: {lastName}</li>
                <li>Receive water alerts? {isSubscriber ? 'Yes' : 'No'}</li>
                <li>County: {CountyList.data && countyId ? CountyList.data.find(i => i.countyId === countyId)['county']: ''}</li>
                <li>Post code: {postcode}</li>
            </ul>
        </li>
    )
}

export {Account, Personal, Confirmation};