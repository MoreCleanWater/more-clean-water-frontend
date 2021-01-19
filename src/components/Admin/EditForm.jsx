import { Button } from "@material-ui/core";
import { useEffect } from "react";
import css from "./Admin.module.scss";

function EditForm (props) {

    const {
        mode,
        fields,
        row,
        handleSubmit,
        handleCancel,
        className,
        style
    } = props;

    console.log(fields);

    useEffect(() => {
        if (row) {
            console.log(row)
            populateFields();
        }    
    })

    const populateFields = () => {
        
    }

    return (
        <div className={className} style={style}>
            {row && <p>ID:{row.id}</p>}
            <form action="" className={css.form}>
                {fields.map(f => {
                    return (
                        <div style={{marginTop: 10}}>
                            <label for={f.name}>{f.label}</label>
                            <input 
                                type={f.type} 
                                name={f.name} 
                                id={f.name}
                                value={row && row[f.name]}
                                style={{marginLeft: 10}}
                            ></input>
                        </div>
                    )

                })}
            </form>

            <div className={css.buttons}>
                <Button variant="contained"
                    className='primaryButton'
                    size="small"
                    onClick={handleSubmit}
                    disableElevation
                >
                    {mode === 'create' && 'Add'}
                    {mode === 'update' && 'Save'}
                </Button>

                <Button variant="contained"
                    className='primaryButton'
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={handleCancel}
                    disableElevation
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default EditForm;