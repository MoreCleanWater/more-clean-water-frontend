import { TextField, Select, InputLabel, FormControl } from '@material-ui/core';

function Account({isActive, onChange}) {
    return (
        <li className={`account${isActive ? ' active-flex' : ''}`}>
            <FormControl>
                <TextField
                    autoComplete="on"
                    required id='email'
                    label='Email'
                    onChange={onChange}
                />
                <TextField
                    autoComplete="on"
                    required id='password'
                    label='Password'
                    type="password"
                    onChange={onChange}
                />
                <TextField
                    autoComplete="on"
                    required id='confirm-password'
                    label='Confirm password'
                    type="password"
                    onChange={onChange}
                />
            </FormControl>
        </li>
    )
}

function Personal({isActive, county, onChange}) {
    return (
        <li className={`personal${isActive ? ' active-flex' : ''}`}>
                <TextField
                    autoComplete="on"
                    required id='firstName'
                    label='First name'
                    onChange={onChange}
                />
                <TextField
                    autoComplete="on"
                    id='lastName'
                    label='Last name'
                    onChange={onChange}
                    required 
                />
                <FormControl>
                    <InputLabel htmlFor="county">County</InputLabel>
                    <Select
                    native
                    value={county}
                    onChange={onChange}
                    inputProps={{
                        name: 'county',
                        id: 'county',
                    }}
                    >
                        <option aria-label="None" value="" />
                        <option value="Great London">Great London</option>
                    </Select>
                </FormControl>
                <TextField
                    autoComplete="on"
                    id='postCode'
                    label='Post code'
                    onChange={onChange}
                    required 
                />
            
        </li>
    )
}

function Confirmation({isActive, form, email, firstName, lastName, county, postCode}) {
    return (
        <li className={`confirmation${isActive ? ' active-flex' : ''}`}>
            <ul>
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