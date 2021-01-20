import { Button } from "@material-ui/core";
import { useState } from "react";
import css from "./Admin.module.scss";

function EditForm (props) {
    const {
        mode,
        inputItems,
        formData,
        handleFormChange,
        handleSubmit,
        handleCancel,
        className,
        style
    } = props;
    
    const [data, setData] = useState(formData);

    console.log(data)

    return (
        <div className={className} style={style}>
            {mode === 'update' && <p>ID:{formData.id}</p>}
            <form action="" className={css.form}>
                {inputItems.map((i, index) => {
                    const Component = i.component;
                    const value = formData[i.name] ? formData[i.name] : '';
                    return (
                        <div style={{marginTop: 10}} key={index}>
                            <Component {...i} 
                                value={value}
                                variant='outlined' 
                                onChange={handleFormChange}
                                className={className}
                            />
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
                    {mode === 'create' && 'Create'}
                    {mode === 'update' && 'Update'}
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