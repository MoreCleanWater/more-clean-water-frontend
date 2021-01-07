import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, FormControl } from '@material-ui/core';
import './Profile.css';

function Profile({form, onChange}) {

  return (
	<Grid 
		container
		justify="center"
		className="profile-container"
	>
		<Grid item xs={10}>
			<form action="">	
				<FormControl> 
						<div className="input">
							<TextField
								autoComplete="on"
								required id='email'
								label='Email'
								variant="outlined"
								value={form.email}
								onChange={onChange}
							/>
							<TextField
								autoComplete="on"
								required id='firstName'
								label='First name'
								variant="outlined"
								value={form.firstName}
								onChange={form.onChange}
							/>
							<TextField
								autoComplete="on"
								id='lastName'
								label='Last name'
								variant="outlined"
								value={form.lastName}
								onChange={onChange}
								required 
							/>
						</div>
						<Button
							variant="contained"
							color="primary"
							disableElevation
						>
							SAVE  
						</Button>
				</FormControl>
			</form>
		</Grid>
    </Grid>
  )
}

export default Profile;
   