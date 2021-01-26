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

function WaterStations () {
    const columns = [
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
        {label: 'Username', name: 'userName', type: 'text', component: TextField},
        {label: 'Email', name: 'email', type: 'text', component: TextField},
        {label: 'First Name', name: 'firstName', type: 'text', component: TextField},
        {label: 'Last Name', name: 'lastName', type: 'text', component: TextField},
        {label: 'County', name: 'county', type: 'combobox', component: ComboBox, dataProvider: CountyList.data},
        {label: 'Post Code', name: 'postcode', type: 'text', component: TextField},
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
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/list')
        .then(response => {
            const loadedData = response.data.map(i => ({id: String(i.userId), ...i}))
            setData(loadedData);
        })
        .catch(error => console.log(error))
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

    const [isSelected, setSelected] = useState(false);

    const onSelectionChange = (e) => {
        e.rowIds.length === 0 ? setSelected(false) : setSelected(true);
        handleSelection(e.rowIds);
    }
    
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
            <Grid item xs={12} md={8} className={adminStyle.container} >
                <h2 className="center">
                    Water Stations
                </h2>

                <ListData 
                    className={adminStyle.dataGrid} 
                    style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
                    rows={data} 
                    columns={columns}
                    onSelectionChange={onSelectionChange}
                    checkboxSelection
                    disableSelectionOnClick
                    disableDensitySelector
                    showToolbar
                    autoPageSize
                    // handleCreate={handleCreate}
                    // handleSelection={handleSelection}
                    // handleDeleteSelection={handleDeleteSelection}
                >
                    <Button variant="contained"
                        size="small"
                        onClick={handleCreate}
                        className='primaryButton'
                        disableElevation
                    >
                        Add
                    </Button>

                    <Button 
                        variant="text"
                        size="small"
                        style={{ marginLeft: 16 }}
                        onClick={handleDeleteSelection}
                        className={isSelected ? '' : 'hidden'}
                        disableElevation
                    >
                        Delete
                    </Button>
                </ListData>

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

export default WaterStations;