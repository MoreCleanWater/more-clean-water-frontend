import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import formStyle from "styles/Form.module.scss";
import Validation from "../Form/Validation";

function EditForm (props) {
    const {
        mode,
        inputItems,
        data,
        status,
        variant,
        style,
        onSubmit,
        onCancel,
    } = props;

    const [formData, setData] = useState(data);
    useEffect(() => { setData(data)}, [data] )

    const [errors, setErrors] = useState({});

    const handleFocus = e => setErrors(Validation.isValidated(formData, inputItems));

    const handleChange = e => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setData({ ...formData, [e.target.name]: value });
        console.log(formData)
    }

    const handleSubmit = e => {
        const [isValidated, errors] = Validation.isValidated(formData, inputItems);
        setErrors(errors);
        return (isValidated ? onSubmit(formData) : isValidated);
    }

    const handleCancel = e => {
        onCancel();
    }

    return (
        <form className={formStyle.adminForm} style={style}>
            <div style={{flexGrow: 1}}>
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
                            className={formStyle.formInput}
                            style={{style}}
                            variant={variant ? variant : 'outlined' }
                            options={i.options ? i.options : ''}
                            dataProvider={i.dataProvider ? i.dataProvider : ''}
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    )
                })}
            </div>

            <div className={`${formStyle.buttons} ${formStyle.admin}`}>
                <Button 
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmit}
                    disableElevation
                    disabled={status === 'loading' ? 'disabled' : ''}
                >
                    {mode === 'create' && 'Create'}
                    {mode === 'update' && 'Update'}
                </Button>

                <Button 
                    variant="outlined"
                    // className='primaryButton'
                    size="small"
                    style={{ marginLeft: 16 }}
                    onClick={handleCancel}
                    disableElevation
                    disabled={status === 'loading' ? 'disabled' : ''}
                >
                    Cancel
                </Button>
            </div>
        </form>
    )
}

export default EditForm;