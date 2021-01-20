import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import css from "./Admin.module.scss";
import EditForm from "./EditForm";
import ListData from "./ListData";
import TextField from './Inputs/TextField';

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
                    onClick={handleEditRow}
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

    const inputItems = [
        {label: 'Email', name: 'email', type: 'text', component: TextField},
        {label: 'First Name', name: 'firstName', type: 'text', component: TextField},
        {label: 'Last Name', name: 'lastName', type: 'text', component: TextField},
        {label: 'County', name: 'county', type: 'combobox', component: TextField},
        {label: 'Post Code', name: 'postcode', type: 'text', component: TextField},
        {label: 'Password', name: 'password', type: 'password', component: TextField},
        {label: 'Confirm Password', name: 'confirm-password', type: 'password', component: TextField},
    ]

    const [data, setData] = useState();

    const newData = () => {
        let newData = {};
        inputItems.forEach(i => {
            newData[i.name] = ''
        })
       
        return {id: '', ...newData};
    }

    
    const [mode, setMode] = useState('retrieve');
    
    const [formData, setFormData] = useState(newData);
    
    useEffect(() => {
        fetch('/users.json')
        .then(res => res.json())
        .then(data => setData(Array.from(data)))
    }, []);
   
    const handleSelection = (rowId) => {
        console.log(rowId)
    }

    const handleDeleteRow = (e) => {
        setData(data.filter(i => i.id !== e.currentTarget.id));
    };

    const handleEditRow = (e) => {
        setFormData(data.filter(i => i.id === e.currentTarget.id)[0]);
        setMode('update');
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleCancel = (e) => {
        setMode('retrieve');
    }

    const handleSubmit = (e) => {
        if (mode==='create') create(formData);
        if (mode==='update') update(formData);
    }

    const handleCreate = (e) => {
        setFormData(newData);
        setMode('create');
    };

    const handleDeleteSelection = (e) => {
        //delete
    };

    const create = (newData) => {
        setData([...data, newData]);
        setMode('retrieve');
    };
    
    const update = (updatedData) => {
        const newData = [...data];
        newData[newData.findIndex(i => i.id === updatedData.id)] = updatedData;
        setData(newData);
        setMode('retrieve');
    }
    
    if (!data) return (<div className="full-height"></div>);

    return (
        <Grid container justify="center">
            <Grid item xs={10} md={8} className={css.container} >
                <h2 className="center">
                    Users
                </h2>

                <ListData 
                    className={css.dataGrid} 
                    style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
                    rows={data} 
                    columns={columns}
                    handleCreate={handleCreate}
                    handleSelection={handleSelection}
                    handleDeleteSelection={handleDeleteSelection}
                />

                <EditForm
                    className={css.editForm} 
                    mode={mode}
                    inputItems={inputItems}
                    handleFormChange={handleFormChange}
                    handleSubmit={handleSubmit}
                    handleCancel={handleCancel}
                    style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                    formData={formData}
                />
            </Grid>
        </Grid>
    )
}

export default AdminUsers;