import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import { FormHelperText } from '@material-ui/core';

function ComboBox (props) {
    const {
        name,
        label,
        value,
        error,
        helperText,
        variant,
        color,
        options,
        className,
        dataProvider,
        onChange,
    } = props;

    return (
        <FormControl 
            variant={variant ? variant : 'outlined'}
            color={color ? color : 'primary'} 
            className={className}
            error={error}
        >
            {!dataProvider && <CachedIcon className="loading absolute" style={{right:'-2.5rem', top: '.8rem'}}/>}
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                id={name}
                name={name}
                label={label}
                labelId={`${name}-label`}
                value={value}
                {...options}
                onChange={onChange}
            >   
                <MenuItem value={null}>
                    &nbsp;
                </MenuItem>
                {[...dataProvider].map(data => <MenuItem key={data.countyId} value={data.countyId}>{data.county}</MenuItem>)}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default ComboBox;