import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function DatePicker(props) {
  const {
    name,
    label,
    value,
    error,
    helperText,
    className,
    options,
    onChange,
    onFocus,
  } = props;

  return (
    <TextField
          name={name}
          id={name}
          label={label}
          value={value}
          error={error}
          helperText={helperText}
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
          onChange={onChange}
          onFocus={onFocus}
          className={className}
          {...options}
          type="date"
      />
  );
}
