import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import formStyle from "../Form/Form.module.scss";
import Validation from "../Form/Validation";

function EditForm (props) {
    const {
        mode,
        inputItems,
        data,
        onSubmit,
        onCancel,
        variant,
        className,
        style
    } = props;

    const [formData, setData] = useState(data);
    useEffect(() => { setData(data)}, [data] )

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setData({ ...formData, [e.target.name]: value });
    }

    const handleSubmit = (e) => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? onSubmit(formData) : isValidated);
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
                        key={i.name}
                        id={i.name}
                        name={i.name}
                        label={i.label}
                        value={formData[i.name] ? formData[i.name]  : ''}
                        error={errors[i.name] ? 'error' : ''}
                        helperText={errors[i.name]}
                        className={`${className} ${formStyle.formInput}`}
                        style={{style}}
                        variant={variant ? variant : 'outlined' }
                        options={i.options ? i.options : ''}
                        dataProvider={i.dataProvider ? i.dataProvider : ''}
                        onChange={handleChange}
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