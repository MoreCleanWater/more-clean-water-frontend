import { Backdrop, Button, CircularProgress, Grid, LinearProgress, Snackbar } from "@material-ui/core";
import { useState, useEffect } from "react";
import adminStyle from "styles/Admin.module.scss";
import formStyle from "styles/Form.module.scss";
import EditForm from "components/Admin/EditForm";
import ListData from "components/Admin/ListData";
import TextField from 'components/Form/TextField';
import ComboBox from 'components/Form/ComboBox';
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import { Alert } from "@material-ui/lab";

function Events () {
    const [countyData, setCountyData] = useState();

    const columns = [
        { field: 'id', headerName: 'ID', width: 70,},
        { field: 'title', headerName: 'Title', width: 400,},
        // { field: 'link', headerName: 'Link', width: 150,},
        // { field: 'description', headerName: 'Description', width: 150,},
        { field: 'eventDate', headerName: 'Event Date', width: 130,},
        { field: 'eventTime', headerName: 'Event Time', width: 130,cellClassName: row => row.isCancelled ? adminStyle.inactive : ''}, 
        { field: 'isCancelled', headerName: 'Active', width: 100,
            renderCell: (params) => (
                <div 
                    style={{height:'100%',  width: '100%'}}
                >
                    {params.row.isCancelled ? 'Cancelled' : 'Active' }
                </div>
            )
        },
        { field: 'actions', headerName: 'Actions', sortable: false, width: 100, 
            renderCell: (params) => (
                <div style={{display: 'flex', height: '100%', alignItems: 'center'}}>
                    <EditIcon
                        id={params.row.id}
                        onClick={handleEditRow}
                        style={{cursor: "pointer", color: "#78787c"}}
                    />
                    <CancelIcon
                        id={params.row.id}
                        onClick={handleDeleteRow}
                        style={{cursor: "pointer", color: "#78787c", marginLeft: '.6rem' }}
                    />
                </div>
            ),
        },
    ];

    const inputItems = [
        {label: 'Link', name: 'link', required: true, component: TextField, },
        {label: 'Title', name: 'title', required: true, component: TextField, },
        {label: 'Description', name: 'description', required: true, component: TextField, options: {multiline: true, rows: 4}},
        {label: 'Date', name: 'eventDate', required: true, component: TextField, options: {className: `${formStyle.formInput} ${formStyle.col2}`}},
        {label: 'Time', name: 'eventTime', required: true, component: TextField, options: {className: `${formStyle.formInput} ${formStyle.col2}`}},
    ];

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
            axios.get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/events/list')
        ])
        .then(axios.spread((county, events) => {
            if (events) {
                const loadedData = events.data.map(i => ({
                    ...i, 
                    id: String(i.eventId), 
                    county: i.countyId && county.data.find(c => i.countyId === c.countyId).county
                }));
                county.data.sort((a, b) => (a.county > b.county) ? 1 : -1);
                setCountyData(county.data);
                setData(loadedData);
                setMode('retrieve');
                setStatus('success');
                setFormData(newData);
            } else {
                console.log(events)
            }
        }))
        .catch(error => console.log(error))
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

    const handleDeleteRow = e => {
        const eventId = data.find(i => i.id === e.currentTarget.id).eventId;
            
        axios
        .get('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/events/cancel/' + eventId)
        .then((response) => {
            if (response.data === 'Event is cancelled successfully') 
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
        console.log(formData)
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
        delete newData.county;
        delete newData.id;
        newData.isCancelled = false;
        console.log(newData);

        axios
        .post('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/events/add', newData)
        .then((response) => {
            if (response.data === 'Event is created successfully') {
                loadData();
            } else {
                console.log(response);
                setStatus('error');
            }
        })
        .catch(error => {
            console.log(error);
            setStatus('error');
        })
    };


//     "link": "https://us05web.zoom.us/j/89052598792?pwd=NVM3UlFjZlBaU2orZHNWOFY0aTY2UT09",
//     "title": "The role of the Water Convention and the Protocol on Water and Health", 
//     "description": "Protocol on Water and Health: recovery, preparedness and response to possible future epidemics", 
//    "eventDate": "18-03-2021",
//     "eventTime": "1:20",
//     "isCancelled": false

    const update = (updatedData) => {
        setStatus('loading');
        delete updatedData.county;
        delete updatedData.id;
        console.log(updatedData);

        axios
        .put('https://ckyxnow688.execute-api.eu-west-2.amazonaws.com/dev/events/edit/' + updatedData.eventId, updatedData)
        .then((response) => {
            if (response.data === 'Event is postponed successfully') {
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
    
    if (!data) 
        return (
            <Backdrop className='circularProgress' open={!data}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )

    return (
        <div>
            <LinearProgress className={`linearProgress ${status==='loading' ? '' : 'hidden'}`}/>
            <Grid container justify="center" className={formStyle.container} >
                <Snackbar
                    open={status==='success'}
                    autoHideDuration={3000}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    onClose={handleCloseSnackBar}
                >
                    <Alert onClose={handleCloseSnackBar} severity="success" variant="filled">
                        Data successfully loaded
                    </Alert>
                </Snackbar>

                <Grid item xs={10} md={8} className={formStyle.content}>
                    <h2 className={`${formStyle.title} ${formStyle.admin}`}>
                        Events
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

export default Events;