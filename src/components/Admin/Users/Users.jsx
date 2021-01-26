import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "../Admin.module.scss";
import EditForm from "../EditForm";
import ListData from "../ListData";
import TextField from '../../Form/TextField';
import ComboBox from '../../Form/ComboBox';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CountyList from "../../Form/CountyList";
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';

function Users () {
    const columns = [
        { field: 'userName', headerName: 'Username', width: 120 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        { field: 'email', headerName: 'Email', width: 230, flex: 1 },
        { field: 'postcode', headerName: 'Post code', width: 160, flex: 1 },
    ];

    const [data, setData] = useState();

    useEffect(() => {
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/list')
        .then(response => {
            const loadedData = response.data.map(i => ({id: String(i.userId), ...i}))
            setData(loadedData);
        })
        .catch(error => console.log(error))
    }, []);

    if (!data) 
        return (
            <Grid
                container
                alignContent="center"
                justify="center"
                className="fullHeight"
            >
                <CachedIcon className="loading"/>
            </Grid>
        );


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
                    disableDensitySelector
                    showToolbar
                    autoPageSize
                >
                </ListData>
            </Grid>
        </Grid>
    )
}

export default Users;