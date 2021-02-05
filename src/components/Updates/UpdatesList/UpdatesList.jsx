import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from "react";
import UpdatesItem from './UpdatesItem/UpdatesItem';
import axios from 'axios';
import { Button, LinearProgress } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

function UpdatesList() {
	const [userId] = useState(localStorage.getItem('userId'));

	const [updates, setUpdates] = useState([]);

	const [status, setStatus] = useState('idle');

	const alerts = [
	{type: 'shortage', title: 'Water shortage', description: 'A Water shortage was detected in your area'},
	{type: 'dirty', title: 'Dirty water', description: 'Dirty water sources was detected in your area'}
	]

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		setStatus('loading');
		axios
		.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/alert/' + userId)
		.then(response => {
			console.log(response.data)
			if (response.data) {
				const loadedData = response.data.map((i, index) => ({
					...i, 
					id: String(index), 
					title: alerts.find(a => a.type === i.alertType).title,
					description: alerts.find(a => a.type === i.alertType).description
					// county: i.countyId && county.data.find(c => i.countyId === c.countyId).county
				}));
				setUpdates(loadedData)
				setStatus('idle');
			} else {
				setStatus('error');
				console.log(response.data)
			}
		})
		.catch(error => {
			setStatus('error');
			console.log(error)
		})
	}

	const markAsRead = id => {
		setStatus('loading');
        axios
            .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/read/alert/' + userId)
            .then((response) => {
                if (response.data === 'Alert status is updated successfully') {
					loadData();
                    setStatus('success');
                } else {
					console.log(response)
                    setStatus('error');
                }
            })
            .catch(error => {
                console.log(error)
                setStatus('error');
            })
	}

	// if (!updates) return (<div></div>);
	const unreadUpdates = updates.filter(update => !update.isReaded);

	if (!userId) return (
		<Grid 
			className="updatesNotSigned no-items" 
			container 
			justify="center" 
			alignItems="center"
		> 

			<Grid container className='content' xs={10} md={12}>
				<h2 style={{margin: 0}}>
					Sign up now 
				</h2>

				<p style={{textAlign: 'center', padding: '0 4rem'}}>
					And receive water alerts directly in your device
				</p>
				
				<Button
					variant="contained"
					color="primary"
					disableElevation
					component={NavLink}
					to="/signup"
					style={{margin: '1rem 0'}}
				>
					Sign Up
				</Button>
			
				<p>
					Are you already registered? 
				</p>

				<Button 
					variant="text"
					color="primary"
					disableElevation
					component={NavLink}
					to="/signin"
				>
					Sign in
				</Button>
			</Grid>

		</Grid>
	)

	return (
		<div>
			<LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
			<ul className="updates-list">
				{unreadUpdates.map(update => 
				<UpdatesItem 
					key={update.id}
					id={update.id}
					title={update.title}
					description={update.description}
					markAsRead={markAsRead}
				/>
				)}
			</ul>
			
			<div className="total">
			{unreadUpdates.length > 0 ? `Total updates: ${unreadUpdates.length}` : 
			<Grid 
				className="fullHeightMobile no-items" 
				container 
				justify="center" 
				alignItems="center"> 
				Hooray! No updates!
			</Grid>}
			</div>
		</div>
	)
}

export default UpdatesList;
   

