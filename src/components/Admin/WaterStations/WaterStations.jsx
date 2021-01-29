import { Button, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "../Admin.module.scss";
import formStyle from "../../Form/Form.module.scss";
import EditForm from "../EditForm";
import ListData from "../ListData";
import TextField from '../../Form/TextField';
import ComboBox from '../../Form/ComboBox';
import CheckBox from '../../Form/CheckBox';
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CachedIcon from '@material-ui/icons/Cached';
import axios from 'axios';

function WaterStations () {
    const [countyData, setCountyData] = useState();

    const columns = [
        { field: 'county', headerName: 'County', width: 250, flex: 1 },
        { field: 'postcode', headerName: 'Post Code', width: 250, flex: 1 },
        { field: 'size', headerName: 'Size', width: 160 },
        { field: 'capacity', headerName: 'Capacity', width: 160 },
        { field: 'isWorking', headerName: 'Is working?', width: 250, flex: 1 },
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
        {label: 'County', name: 'countyId', component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', component: TextField},
        {label: 'Size', name: 'size', component: TextField},
        {label: 'Capacity', name: 'capacity', component: TextField},
        {label: 'Additional Info', name: 'additionalInfo', component: TextField, options:{multiline: true, rows:4}},
        {label: 'Is working?', name: 'isWorking', component: CheckBox},
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

    const [status, setStatus] = useState('idle');
    
    const [formData, setFormData] = useState(newData);

    useEffect(() => {
        axios.all([
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list'),
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/list')
        ])
        .then(axios.spread((county, stations) => {
            const loadedData = stations.data.map(i => ({
                ...i, 
                id: String(i.stationId), 
                county: county.data.find(c => i.countyId === c.countyId)['county']
            }));
            setCountyData(county.data);
            setData(loadedData)
        }))
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
    
    if (!data || status === 'loading') 
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
        <Grid container justify="center" className={formStyle.container} >
            <Grid item xs={12} md={10}  className={formStyle.content}>
                <h2 className={formStyle.admin}>
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
                    // disableDensitySelector
                    disableColumnSelector
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
                    mode={mode}
                    inputItems={inputItems}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    className={adminStyle.dataGrid}
                    style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                    formData={formData}
                />
            </Grid>
        </Grid>
    )
}

export default WaterStations;