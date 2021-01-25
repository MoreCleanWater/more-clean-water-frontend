import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import formStyles from "../Form/Form.module.scss";
import {idLabel} from "../Admin/Admin.module.scss";

function EditForm (props) {
    const {
        mode,
        inputItems,
        formData,
        onSubmit,
        onCancel,
        className,
        style
    } = props;

    const [data, setData] = useState(formData);
    useEffect(() => { setData(formData)}, [formData] )

    const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        onSubmit(data);
    }

    const handleCancel = (e) => {
        onCancel();
    }

    return (
        <div className={className} style={style}>
            {mode === 'update' && <p className={idLabel}>ID:{data.id}</p>}
            <form action="" className={formStyles.adminForm}>
                {inputItems.map((i, index) => {
                    const Component = i.component;
                    const value = data[i.name] ? data[i.name] : '';
                    const dataProvider = i.dataProvider ? i.dataProvider : '';
                    const options = i.options ? i.options : '';
                    return (
                        <div style={{marginTop: 10}} key={index}>
                            <Component {...i} 
                                value={value}
                                variant='outlined' 
                                onChange={handleChange}
                                dataProvider={dataProvider}
                                options={options}
                                className={formStyles.input}
                            />
                        </div>
                    )
                })}
            </form>

            <div className={formStyles.buttons}>
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