import { FormControl, FormGroup, FormControlLabel, Checkbox, FormHelperText } from "@mui/material";

function CheckBoxField({ id, label, errors, options, register, setValue, getValues,setError,clearErrors }) {
    // console.log(options)

    const handleCheckboxChange = (value) => {
        console.log(value)
        const selectedValues = getValues(id) || [];
        const newValues = selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value) // Remove if already checked
          : [...selectedValues, value]; // Add if unchecked
    
        setValue(id, newValues, { shouldValidate: true });

        if (newValues.length === 0) {
          setError('role', {
            type: 'manual',
            message: 'Please select at least one role',
          });
        } else {
          clearErrors('role');
        }
    };

  return (
    <FormControl component="fieldset" error={!!errors[id]}>
        <label htmlFor="" ><strong>{label}</strong></label>
        <FormGroup>
          {options?.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Checkbox
                  // {...register(id, {
                  //   validate: (value) => value.length > 0 || "Please select at least one option",
                  // })}
                  value={option.value}
                  onChange={() => handleCheckboxChange(option.value)}
                  checked={getValues(id)?.includes(option.value)}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        {errors[id] && <FormHelperText>{errors[id].message}</FormHelperText>}
      </FormControl>
  )
}

export default CheckBoxField