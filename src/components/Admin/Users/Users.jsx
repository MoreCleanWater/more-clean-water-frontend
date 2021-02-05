import { Backdrop, CircularProgress, Grid, Snackbar } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import ListData from "../ListData";
import axios from 'axios';
import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

function Users () {
    const [adminId] = useState(localStorage.getItem('adminId'));

    const [countyData, setCountyData] = useState(JSON.parse(localStorage.getItem('countyList')));
    
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
        loadData();
    }, []);

    const loadData = () => {
        setStatus('loading');
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/list')
        .then((response) => {
            if (response.data) {
                if (countyData) {
                    initGrid(response.data)
                } else {
                    axios
                    .get("https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list")
                    .then((countyResponse) => {
                        if (countyResponse.data) {
                            countyResponse.data.sort((a, b) => (a.countyResponse > b.countyResponse ? 1 : -1));
                            localStorage.setItem('countyList', JSON.stringify(countyResponse.data));
                            setCountyData(JSON.parse(localStorage.getItem('countyList')));
                            initGrid(response.data, countyResponse.data)
                        }
                      })
                      .catch((error) => console.log(error));
                } 
            } else {
                console.log(response)
            }
        })
        .catch(error => console.log(error))
    }

    const initGrid = (data, countyList) => {
        if (!countyList) countyList = countyData;
        const loadedData = data.map(i => ({
            ...i, 
            id: String(i.stationId), 
            county: i.countyId && countyList.find(c => i.countyId === c.countyId).county
        }));
        setData(loadedData);
        setStatus('success');
    }

    const [status, setStatus] = useState('idle');

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };

    if (!adminId) return <Redirect to="/admin"/>

    if (!data) 
        return (
            <Backdrop className='circularProgress' open={!data}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )

    return (
        <Grid container justify="center" className={`${formStyle.container} ${formStyle.admin}`}>
            <Snackbar
                open={status==='success'}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleCloseSnackBar}
            >
                <Alert severity="success" >
                    Data successfully loaded
                </Alert>
            </Snackbar>
            <Grid item xs={10} md={8} className={formStyle.content}>
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