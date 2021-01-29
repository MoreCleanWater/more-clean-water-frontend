import { FormHelperText } from '@material-ui/core';
import CheckBoxMaterial from '@material-ui/core/CheckBox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


function CheckBox (props) {
    const {
        name,
        label,
        value,
        error,
        helperText,
        color,
        options,
        className,
        onChange,
    } = props;
    
    return (
        <div className={className}>
             <FormControlLabel
                control={
                    <CheckBoxMaterial
                        name={name}
                        id={name}
                        checked={value}
                        color={color ? color : 'primary'}
                        {...options}
                        onChange={onChange}
                    />
                }
                label={label}
                error={error}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </div>
       
    )
}

export default CheckBox;