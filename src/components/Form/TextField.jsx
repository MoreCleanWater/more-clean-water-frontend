import TextFieldMaterial from '@material-ui/core/TextField';

function TextField (props) {
    const {
        name,
        label,
        value,
        variant,
        color,
        options,
        className,
        onChange,
        required
    } = props;
    
    return (
        <TextFieldMaterial
            name={name}
            id={name}
            label={label}
            value={value}
            variant={variant ? variant : 'outlined'}
            color={color ? color : 'primary'}
            className={className}
            required={required}
            {...options}
            onChange={onChange}
        />
    )
}

export default TextField;