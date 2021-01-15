import { Button, Grid } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';

function AdminUsers () {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
        },
        { field: 'actions', headerName: 'Actions', sortable: false, flex: .5,
            renderCell: (params) => (
                <div>
                    
                    <Button
                    variant="contained"
                    className='greenButton'
                    size="small"
                    id={params.getValue('id')}
                    onClick={handleClick}
                    disableElevation
                >
                    Edit
                </Button>
                <Button
                    variant="text"
                    size="small"
                    style={{ marginLeft: 16 }}
                    id={params.getValue('id')}
                    onClick={handleClick}
                    disableElevation
                >
                    Delete
                </Button>
                </div>
            ),
        },
    ];
        
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

   const handleClick = (e) => console.log(e.currentTarget.id)
        
    return (
        <Grid container
            justify='center'
            alignItems='center'
            className='full-height'
        >
            <Grid item xs={10} className='center' style={{height: 400}}>
                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection disableColumnMenu/>
            </Grid>
        </Grid>
    )
}

export default AdminUsers;