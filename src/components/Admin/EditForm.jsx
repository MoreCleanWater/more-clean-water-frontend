import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import formStyle from "../Form/Form.module.scss";

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
            <form className={formStyle.adminForm}>
                {inputItems.map((i, index) => {
                    const Component = i.component;
                    return (
                        <div style={{marginTop: 10}} key={index}>
                            <Component {...i} 
                                value={data[i.name] ? data[i.name] : ''}
                                variant='outlined' 
                                onChange={handleChange}
                                dataProvider={i.dataProvider ? i.dataProvider : ''}
                                options={i.options ? i.options : ''}
                                className={formStyle.input}
                            />
                        </div>
                    )
                })}
            </form>

            <div className={formStyle.buttons}>
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