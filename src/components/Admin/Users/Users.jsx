import { Backdrop, CircularProgress, Grid, LinearProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "../Admin.module.scss";
import ListData from "../ListData";
import axios from 'axios';

function Users () {
    const columns = [
        { field: 'userName', headerName: 'Username', width: 120, flex: 1 },
        { field: 'firstName', headerName: 'First name', width: 200, flex: 1.5 },
        { field: 'lastName', headerName: 'Last name', width: 200, flex: 1.5 },
        { field: 'email', headerName: 'Email', width: 230, flex: 2 },
        { field: 'county', headerName: 'County', width: 230, flex: 1.5 },
        { field: 'postcode', headerName: 'Post code', width: 160,  },
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

    if (!data) 
        return (
            <Backdrop className='circularProgress' open={!data}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={10} className={adminStyle.container} >
                <h2 className="center">
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