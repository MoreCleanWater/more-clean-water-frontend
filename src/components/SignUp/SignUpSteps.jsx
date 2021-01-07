import { TextField, Select, InputLabel, FormControl } from '@material-ui/core';

function Account({isActive, onChange, email, password}) {
    return (
        <li className={`account${isActive ? ' active-flex' : ''}`}>
            <FormControl>
                <TextField
                    autoComplete="on"
                    required id='email'
                    label='Email'
                    value={email}
                    onChange={onChange}
                    variant="outlined"
                />
                <TextField
                    autoComplete="on"
                    required id='password'
                    label='Password'
                    type="password"
                    value={password}
                    onChange={onChange}
                    variant="outlined"
                />
                <TextField
                    autoComplete="on"
                    required id='confirm-password'
                    label='Confirm password'
                    type="password"
                    onChange={onChange}
                    variant="outlined"
                />
            </FormControl>
        </li>
    )
}

function Personal({isActive, county, onChange, firstName, lastName}) {
    return (
        <li className={`personal${isActive ? ' active-flex' : ''}`}>
                <TextField
                    autoComplete="on"
                    required id='firstName'
                    label='First name'
                    value={firstName}
                    onChange={onChange}
                    variant="outlined"
                />
                <TextField
                    autoComplete="on"
                    id='lastName'
                    label='Last name'
                    value={lastName}
                    onChange={onChange}
                    required 
                    variant="outlined"
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
                    variant="outlined"  
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
                    variant="outlined"
                />
            
        </li>
    )
}

function Confirmation({isActive, email, firstName, lastName, county, postCode}) {
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