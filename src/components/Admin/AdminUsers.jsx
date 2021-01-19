import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import css from "./Admin.module.scss";
import EditForm from "./EditForm";
import ListData from "./ListData";

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
                    onClick={handleUpdateRow}
                    disableElevation
                >
                    Edit
                </Button>
                <Button
                    variant="text"
                    size="small"
                    style={{ marginLeft: 16 }}
                    id={params.getValue('id')}
                    onClick={handleDeleteRow}
                    disableElevation
                >
                    Delete
                </Button>
                </div>
            ),
        },
    ];
        
    const [users, setUsers] = useState();
    const [mode, setMode] = useState('retrieve');
    const [selected, setSelected] = useState();

    useEffect(() => {
        fetch('/users.json')
        .then(res => res.json())
        .then(data => setUsers(Array.from(data)))
    }, []);
    
    
    const handleCreate = (e) => {
        setMode('create');
    };

    const handleSelection = (e) => {
        console.log(e.rowIds.length)
        e.rowIds.length === 0 ? setSelected(false) : setSelected(true);
    }

    const handleDeleteSelection = (e) => {
        console.log()
    };

    const handleDeleteRow = (e) => {
        setUsers(users.filter(i => i.id !== e.currentTarget.id));
    };

    const handleUpdateRow = (e) => {
        // console.log()
        setSelected(users.filter(i => i.id === e.currentTarget.id)[0]);
        setMode('update');
    };

    const handleCancel = (e) => setMode('retrieve');

    const handleSubmit = (e, data) => {
        console.log(data)
        if (mode==='create') create(data);
        if (mode==='update') update(data);
    }

    const create = (e) => console.log(e);
    
    const update = (e) => console.log(e);
   
    if (!users) return (<div className="full-height"></div>);

    return (
        <Grid container justify="center">
            <Grid item xs={10} md={8} className={css.container} >
                <h2 className="center">
                    Users
                </h2>

                <ListData 
                    className={css.dataGrid} 
                    style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
                    users={users} 
                    columns={columns}
                    handleCreate={handleCreate}
                    handleSelection={handleSelection}
                    handleDeleteSelection={handleDeleteSelection}
                />

                <EditForm
                    className={css.editForm} 
                    mode={mode}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                    selected={mode === 'update' ? selected : ''}
                />
            </Grid>
        </Grid>
    )
}

export default AdminUsers;