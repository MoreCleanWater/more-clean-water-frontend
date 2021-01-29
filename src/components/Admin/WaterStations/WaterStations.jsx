import { Button, Grid, Snackbar } from "@material-ui/core";
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
import { Alert } from "@material-ui/lab";

function WaterStations () {
    const [countyData, setCountyData] = useState();

    
    const columns = [
        { field: 'county', headerName: 'County', width: 250, flex: 1.5 },
        { field: 'postcode', headerName: 'Post Code', width: 130, flex: 1,},
        { field: 'size', headerName: 'Size', width: 90, flex: 1, },
        { field: 'capacity', headerName: 'Capacity', width: 110, flex: 1, },
        { field: 'isWorking', headerName: 'Is working?', width: 140, 
            renderCell: (params) => <CheckBox value={params.row.isWorking}  disabled='disabled'/>
        },
        { field: 'actions', headerName: 'Actions', sortable: false, width: 110, 
            renderCell: (params) => (
                <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    <EditIcon
                        id={params.row.id}
                        onClick={handleEditRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '.2rem'}}
                    />

                    <DeleteIcon
                        id={params.row.id}
                        onClick={handleDeleteRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '1rem'}}
                    />
                </div>
            ),
        },
    ];

    const inputItems = [
        {label: 'County', name: 'countyId', required: true, component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField},
        {label: 'Size', name: 'size', required: true, component: TextField},
        {label: 'Capacity', name: 'capacity', required: true, component: TextField},
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
        loadData();
    }, []);

    const loadData = () => {
        setStatus('loading');
        axios.all([
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/county/list'),
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/list')
        ])
        .then(axios.spread((county, stations) => {
            if (county && stations) {
                const loadedData = stations.data.map(i => ({
                    ...i, 
                    id: String(i.stationId), 
                    county: i.countyId && county.data.find(c => i.countyId === c.countyId).county
                }));
                county.data.sort((a, b) => (a.county > b.county) ? 1 : -1);
                setCountyData(county.data);
                setData(loadedData);
                setMode('retrieve');
                setStatus('success');
            } else {
                console.log(county, stations)
            }
        }))
        .catch(error => console.log(error))
    }

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
        const stationId = data.find(i => i.id === e.currentTarget.id).stationId;
        axios
        .delete('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/delete/' + stationId)
        .then((response) => {
            console.log(response.data);
            setFormData(newData);
            loadData();
            // if (response.data === 'User is created successfully') {
                
            // } else {
            //      setStatus('error')
            // }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })
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
        setStatus('loading');
        delete newData.additionalInfo;
        delete newData.id;
        console.log(newData);

        axios
        .post('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/users/add', newData)
        .then((response) => {
            console.log(response.data);
            setFormData(newData);
            loadData();
            // if (response.data === 'User is created successfully') {
                
            // } else {
            //      setStatus('error')
            // }
        })
        .catch(error => {
            console.log(error);
            setStatus('error');
        })
    };
    
    const update = (updatedData) => {
        setStatus('loading');
        delete updatedData.additionalInfo;
        delete updatedData.id;
        delete updatedData.county;
        delete updatedData.installDate;
        delete updatedData.installationDate;
        delete updatedData.postcodeId;
        console.log(updatedData)

        axios
        .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/edit/' + updatedData.stationId, updatedData)
        .then((response) => {
            if (response.data === 'Station is updated successfully') {
                setFormData(newData);
                loadData();
            } else {
                setStatus('error')
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })

        
    }

    const [isSelected, setSelected] = useState(false);

    const onSelectionChange = (e) => {
        e.rowIds.length === 0 ? setSelected(false) : setSelected(true);
        handleSelection(e.rowIds);
    }

    const handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') return;
        setStatus('idle');
    };
    
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
            <Snackbar open={status==='success'} autoHideDuration={3000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success" variant="filled">
                    Data successfully loaded
                </Alert>
            </Snackbar>

            <Grid item xs={10} md={8} className={formStyle.content}>
                <h2 className={formStyle.admin}>
                    Water Stations
                </h2>

                <ListData 
                    className={adminStyle.dataGrid} 
                    style={{display: mode === 'retrieve' ? 'flex' : 'none'}} 
                    rows={data} 
                    columns={columns}
                    onSelectionChange={onSelectionChange}
                    // checkboxSelection
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
                    data={formData}
                    style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Grid>
        </Grid>
    )
}

export default WaterStations;