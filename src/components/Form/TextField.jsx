import TextFieldMaterial from '@material-ui/core/TextField';

function TextField (props) {
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
        onChange,
        onFocus,
    } = props;
    
    return (
        <TextFieldMaterial
            autoComplete='on'
            name={name}
            id={name}
            label={label}
            value={value}
            error={error}
            helperText={helperText}
            variant={variant ? variant : 'outlined'}
            color={color ? color : 'primary'}
            className={className}
            {...options}
            onChange={onChange}
            onFocus={onFocus}
        />
    )
}

export default TextField;