import TextInput from '@material-ui/core/TextField';

function TextField (props) {
    const {
        name,
        label,
        value,
        variant,
        options,
        className,
        onChange,
    } = props;
    

    return (
        <TextInput
            {...options}
            name={name}
            id={name}
            label={label}
            value={value}
            variant={variant}
            className={className}
            onChange={onChange}
        />
    )
}

export default TextField;