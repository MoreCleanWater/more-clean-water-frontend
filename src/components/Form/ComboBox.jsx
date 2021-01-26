import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';

function ComboBox (props) {
    const {
        id,
        name,
        label,
        value,
        variant,
        className,
        onChange,
        dataProvider,
    } = props;

    return (
        <FormControl className={className} variant={variant}>
            {dataProvider !== '' ? '' : <CachedIcon className="loading absolute" style={{right:'-2.5rem', top: '.8rem'}}/>}
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                id={id}
                name={name}
                label={label}
                labelId={`${name}-label`}
                value={value}
                onChange={onChange}
            >   
                <MenuItem value={null}>
                    &nbsp;
                </MenuItem>
                {[...dataProvider].map(data => <MenuItem key={data.countyId} value={data.countyId}>{data.county}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default ComboBox;