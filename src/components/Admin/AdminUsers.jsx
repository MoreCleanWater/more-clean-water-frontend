import { Button, Grid } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import { useState, useEffect } from "react";
import "./Admin.scss";

function AdminUsers () {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        { field: 'email', headerName: 'Email', width: 230, flex: 1 },
        { field: 'actions', headerName: 'Actions', sortable: false, width: 200,
            renderCell: (params) => (
                <div>
                    <Button
                    variant="contained"
                    className='greenButton'
                    size="small"
                    id={params.getValue('id')}
                    onClick={editUser}
                    disableElevation
                >
                    Edit
                </Button>
                <Button
                    variant="text"
                    size="small"
                    style={{ marginLeft: 16 }}
                    id={params.getValue('id')}
                    onClick={deleteUser}
                    disableElevation
                >
                    Delete
                </Button>
                </div>
            ),
        },
    ];
        
    const [users, setUsers] = useState();

    useEffect(() => {
        fetch('/users.json')
        .then(res => res.json())
        .then(data => setUsers(Array.from(data)))
    }, []);
    
    const editUser = (e) => console.log(e.currentTarget.id);
    
    const deleteUser = (e) => {
        setUsers(users.filter(i => i.id !== e.currentTarget.id));
    };

   
    if (!users) return (<div className="full-height"></div>);

    return (
        <Grid container alignContent='center' justify='space-evenly' className='full-height'>
            <Grid item xs={10} md={8} className='center'>
            <h2>
                Users
            </h2>
            </Grid>

            <Grid item xs={10} md={8} className='center' style={{height: '70%'}}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    checkboxSelection
                    disableColumnMenu
                    disableSelectionOnClick
                    autoPageSize
                />
            </Grid>

            <Grid item xs={10} md={8} className='buttons mt10'>
                <Button variant="contained"
                    className='primaryButton'
                    size="small"
                    // onClick={addUser}
                    disableElevation
                >
                    Add User
                </Button>

                <Button 
                    variant="text"
                    size="small"
                    style={{ marginLeft: 16 }}
                    // onClick={deleteUser}
                    disableElevation
                    // className="hidden"
                >
                    Delete users
                </Button>
            </Grid>
        </Grid>
    )
}

export default AdminUsers;