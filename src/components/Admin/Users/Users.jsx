import { Backdrop, CircularProgress, Grid, Snackbar } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import ListData from "../ListData";
import axios from 'axios';
import { Alert } from "@material-ui/lab";

function Users () {
    const columns = [
        { field: 'userId', headerName: 'ID', width: 70, },
        { field: 'userName', headerName: 'Username', width: 140,},
        { field: 'firstName', headerName: 'First name', width: 130, },
        { field: 'lastName', headerName: 'Last name', width: 130, },
        { field: 'email', headerName: 'Email', width: 200,  },
        { field: 'county', headerName: 'County', width: 160,  },
        { field: 'postcode', headerName: 'Post code', width: 120,  },
    ];

    const [data, setData] = useState();

    useEffect(() => {
        axios.all([
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list'),
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/list')
        ])
        .then(axios.spread((county, users) => {
            if (county && users) {
                const loadedData = users.data.map(i => ({
                    ...i, 
                    id: String(i.userId), 
                    county: i.countyId && county.data.find(c => i.countyId === c.countyId).county
                }));
                setData(loadedData)
            } else {
                console.log(county, users)
            }
        }))
        .catch(error => console.log(error))
    }, []);

    const [status, setStatus] = useState('idle');

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };

    if (!data) 
        return (
            <Backdrop className='circularProgress' open={!data}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )

    return (
        <Grid container justify="center" className={formStyle.container} >
            <Snackbar
                open={status==='success'}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="success" variant="filled">
                    Data successfully loaded
                </Alert>
            </Snackbar>
            <Grid item xs={10} md={7} className={formStyle.content}>
                <h2 className={`${formStyle.title} ${formStyle.admin}`}>
                    Users
                </h2>

                <ListData 
                    className={adminStyle.dataGrid} 
                    rows={data}
                    columns={columns}
                    disableColumnSelector
                    disableSelectionOnClick
                    // disableDensitySelector
                    showToolbar
                    autoPageSize
                >
                </ListData>
            </Grid>
        </Grid>
    )
}

export default Users;