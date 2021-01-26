import CheckBoxMaterial from '@material-ui/core/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function CheckBox (props) {
    const {
        name,
        label,
        value,
        color,
        options,
        onChange,
        required
    } = props;
    
    return (

        <FormControlLabel
            control={
                <CheckBoxMaterial
                    name={name}
                    id={name}
                    checked={value}
                    color={color ? color : 'primary'}
                    required={required}
                    {...options}
                    onChange={onChange}
                />
            }
            label={label}
        />
    )
}

export default CheckBox;