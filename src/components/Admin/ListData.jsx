import { Button } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import css from "./Admin.module.scss";
import { useState } from "react";


function ListData (props) {

    const {
        rows, 
        columns, 
        handleCreate, 
        handleSelection,
        handleDeleteSelection,
        className,
        style
    } = props;

    const [isSelected, setSelected] = useState(false);

    const onSelectionChange = (e) => {
        e.rowIds.length === 0 ? setSelected(false) : setSelected(true);
        handleSelection(e.rowIds);
    }

    return (
        <div style={style} className={className}>
            <div className={css.content}>
                <DataGrid 
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                    disableColumnMenu
                    disableSelectionOnClick
                    autoPageSize
                    onSelectionChange={onSelectionChange}
                />
            </div>

            <div className={css.buttons}>
                <Button variant="contained"
                    className='primaryButton'
                    size="small"
                    onClick={handleCreate}
                    disableElevation
                >
                    Add
                </Button>

                <Button 
                    variant="text"
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={handleDeleteSelection}
                    disableElevation
                    className={isSelected ? '' : 'hidden'}
                >
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default ListData;