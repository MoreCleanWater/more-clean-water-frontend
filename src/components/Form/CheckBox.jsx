import CheckBoxMaterial from '@material-ui/core/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function CheckBox (props) {
    const {
        name,
        label,
        value,
        options,
        className,
        onChange,
        required
    } = props;
    
    return (

        <FormControlLabel
            control={
                <CheckBoxMaterial
                    {...options}
                    name={name}
                    id={name}
                    checked={value}
                    className={className}
                    onChange={onChange}
                    required={required}
                    color="primary"
                />
            }
            label={label}
        />
    )
}

export default CheckBox;