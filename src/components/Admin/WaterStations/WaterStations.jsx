import { Backdrop, Button, CircularProgress, Grid, LinearProgress, Snackbar } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import EditForm from "components/Admin/EditForm";
import ListData from "components/Admin/ListData";
import TextField from 'components/Form/TextField';
import ComboBox from 'components/Form/ComboBox';
import CheckBox from 'components/Form/CheckBox';
import EditIcon from "@material-ui/icons/Edit";
import axios from 'axios';
import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

function WaterStations () {
    const [adminId] = useState(localStorage.getItem('adminId'));
    
    const [countyData, setCountyData] = useState(JSON.parse(localStorage.getItem('countyList')));
    
    const columns = [
        { field: 'stationId', headerName: 'ID', width: 70, cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive},
        { field: 'county', headerName: 'County', width: 270, cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive},
        { field: 'postcode', headerName: 'Post Code', width: 150,cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive},
        { field: 'size', headerName: 'Size', width: 100,  cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive},
        { field: 'capacity', headerName: 'Capacity', width: 100, cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive},
        { field: 'isWorking', headerName: 'Active?', width: 100, cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive,
            renderCell: (params) => (
                <div 
                    style={{height:'100%',  width: '100%', textAlign: 'center'}}
                    id={params.row.id}
                    onChange={handleToggleActivation}
                    className={params.row.isWorking && String(params.row.isWorking)}
                >
                    <CheckBox 
                        value={params.row.isWorking}  
                    />
                </div>
            )
        },
        { field: 'actions', headerName: 'Actions', sortable: false, width: 100, flex:1, cellClassName: params => params.row.isWorking ? '' : adminStyle.inactive,
            renderCell: (params) => (
                <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    <EditIcon
                        id={params.row.id}
                        onClick={handleEditRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '.2rem'}}
                    />
                </div>
            ),
        },
    ];

    const inputItems = [
        {label: 'County', name: 'countyId', required: true, component: ComboBox, dataProvider: countyData},
        {label: 'Post Code', name: 'postcode', required: true, component: TextField},
        {label: 'Size', name: 'size', required: true, component: TextField, options:{className: `${formStyle.formInput} ${formStyle.col2}`}},
        {label: 'Capacity', name: 'capacity', required: true, component: TextField, options:{className: `${formStyle.formInput} ${formStyle.col2}`}},
    ]

    const [data, setData] = useState();

    const newData = () => {
        let newData = {};
        inputItems
        .sort((a,b) => a.order - b.order)
        .forEach(i => {
            newData[i.name] = ''
        })
       
        return newData;
    }
    
    const [mode, setMode] = useState('retrieve');

    const [status, setStatus] = useState('idle');
    
    const [formData, setFormData] = useState(newData);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        setStatus('loading');
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/list')
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
        setMode('retrieve');
        setStatus('success');
        setFormData(newData);
    }

    const handleCreate = e => {
        setMode('create');
    };

    const handleDeleteSelection = e => {
        //delete
    };
   
    const handleSelection = (rowId) => {
        console.log(rowId)
    }

    const handleToggleActivation = e => {
        setStatus('loading');
        const stationId = data.find(i => i.id === e.currentTarget.id).stationId;
        const action = Boolean(e.currentTarget.className) ? 
            'https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/delete/' + stationId
            : 
            'https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/activate/' + stationId;
            
        axios
        .get(action)
        .then((response) => {
            if (response.data === 'Station is deactivated successfully'||
                                    'Station is activated successfully') 
            {
                loadData();
            } else {
                console.log(response);
                setStatus('error')
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })
    };

    const handleEditRow = e => {
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
        console.log(newData);

        axios
        .post('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/add', newData)
        .then((response) => {
            if (response.data === 'Stations is created successfully') {
                loadData();
            } else {
                console.log(response);
                setStatus('error')
            }
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
        delete updatedData.isWorking;
        console.log(updatedData)    

        axios
        .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/stations/edit/' + updatedData.stationId, updatedData)
        .then((response) => {
            if (response.data === 'Station is updated successfully') {
                loadData();
            } else {
                console.log(response)
                setStatus('error')
            }
        })
        .catch(error => {
            console.log(error)
            setStatus('error');
        })
    }

    const [isSelected, setSelected] = useState(false);

    const onSelectionChange = e => {
        e.rowIds.length === 0 ? setSelected(false) : setSelected(true);
        handleSelection(e.rowIds);
    }

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
        <div>
            <LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
            <Snackbar
                open={status==='success'}
                autoHideDuration={3000}
                anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                onClose={handleCloseSnackBar}
            >
                <Alert onClose={handleCloseSnackBar} severity="success" >
                    Data successfully loaded
                </Alert>
            </Snackbar>
            
            <Grid container justify="center" className={`${formStyle.container} ${formStyle.admin}`}>
                <Grid item xs={10} md={8} className={formStyle.content}>
                    <h2 className={`${formStyle.title} ${formStyle.admin}`}>
                        Water Stations
                    </h2>

                    <ListData 
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
                        <Button 
                            variant="contained"
                            size="small"
                            onClick={handleCreate}
                            color="primary"
                            disableElevation
                            disabled={status === 'loading' ? 'disabled' : ''}
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
                            disabled={status === 'loading' ? 'disabled' : ''}
                        >
                            Delete
                        </Button>
                    </ListData>

                    <EditForm
                        mode={mode}
                        inputItems={inputItems}
                        data={formData}
                        status={status}
                        style={{display: mode !== 'retrieve' ? 'flex' : 'none'}}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default WaterStations;