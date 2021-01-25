import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "./Admin.module.scss";
import EditForm from "./EditForm";
import ListData from "./ListData";
import TextField from '../Form/TextField';
import ComboBox from '../Form/ComboBox';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CountyList from "../CountyList";

function AdminUsers () {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 160 },
        { field: 'lastName', headerName: 'Last name', width: 160 },
        { field: 'email', headerName: 'Email', width: 250, flex: 1 },
        { field: 'actions', headerName: 'Actions', sortable: false, width: 110,
            renderCell: (params) => (
                <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    <EditIcon
                        id={params.getValue('id')}
                        onClick={handleEditRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '.2rem'}}
                    />

                    <DeleteIcon
                        id={params.getValue('id')}
                        onClick={handleDeleteRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '1rem'}}
                    />
                </div>
            ),
        },
    ];

    const inputItems = [
        {label: 'Username', name: 'username', type: 'text', component: TextField},
        {label: 'Email', name: 'email', type: 'text', component: TextField},
        {label: 'First Name', name: 'firstName', type: 'text', component: TextField},
        {label: 'Last Name', name: 'lastName', type: 'text', component: TextField},
        {label: 'County', name: 'county', type: 'combobox', component: ComboBox, dataProvider: CountyList.data},
        {label: 'Post Code', name: 'postCode', type: 'text', component: TextField},
        {label: 'Additional Info', name: 'additionalInfo', type: 'text', component: TextField, options:{multiline: true, rows:4}},
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

    const handleCreate = (e) => {
        setFormData(newData);
        setMode('create');
    };

    const handleDeleteSelection = (e) => {
        //delete
    };
   
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
   
    const handleSubmit = (data) => {
        if (mode==='create') create(data);
        if (mode==='update') update(data);
    }

    const handleCancel = () => {
        setMode('retrieve');
        setFormData(newData);
    }
   
    const create = (newData) => {
        setData([...data, newData]);
        setMode('retrieve');
        setFormData(newData);
    };
    
    const update = (updatedData) => {
        const newData = [...data];
        newData[newData.findIndex(i => i.id === updatedData.id)] = updatedData;
        setData(newData);
        setMode('retrieve');
        setFormData(newData);
    }
    
    if (!data) return (<div className="full-height"></div>);

    return (
        <Grid container justify="center">
            <Grid item xs={12} md={8} className={adminStyle.container} >
                <h2 className="center">
                    Users
                </h2>

                <ListData 
                    className={adminStyle.dataGrid} 
                    style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
                    rows={data} 
                    columns={columns}
                    handleCreate={handleCreate}
                    handleSelection={handleSelection}
                    handleDeleteSelection={handleDeleteSelection}
                />

                <EditForm
                    className={adminStyle.editForm} 
                    mode={mode}
                    inputItems={inputItems}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                    formData={formData}
                />
            </Grid>
        </Grid>
    )
}

export default AdminUsers;