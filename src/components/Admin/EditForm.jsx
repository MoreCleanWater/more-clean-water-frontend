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

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setData({ ...data, [e.target.name]: value })
    };

    const handleSubmit = (e) => {
        onSubmit(data);
    }

    const handleCancel = (e) => {
        onCancel();
    }

    return (
        <form className={formStyle.adminForm} style={style}>
            {inputItems.map((i, index) => {
                const Component = i.component;
                return (
                    <Component 
                        {...i} 
                        key={index}
                        value={data[i.name] ? data[i.name] : ''}
                        variant='outlined' 
                        onChange={handleChange}
                        dataProvider={i.dataProvider ? i.dataProvider : ''}
                        options={i.options ? i.options : ''}
                        className={formStyle.formInput}
                    />
                )
            })}

            <div className={`${formStyle.buttons} ${formStyle.admin}`}>
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
        </form>
    )
}

export default EditForm;