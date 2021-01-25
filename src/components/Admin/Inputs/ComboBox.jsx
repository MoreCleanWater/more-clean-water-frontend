import { Select, InputLabel, FormControl, MenuItem } from '@material-ui/core';

function ComboBox (props) {
    const {
        name,
        label,
        value,
        dataProvider,
        options,
        variant,
        className,
        onChange,
    } = props;

    return (
        <FormControl className={className} variant={variant}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                id={name}
                name={name}
                labelId={`${name}-label`}
                value={value}
                onChange={onChange}
                label={label}
            >   
                <MenuItem value="">
                    &nbsp;
                </MenuItem>
                {[...dataProvider].map((data, index) => <MenuItem key={index} value={data.name}>{data.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}

export default ComboBox;