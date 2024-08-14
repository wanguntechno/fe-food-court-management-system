/* eslint-disable react/require-default-props */

'use client';

import MuiAutocomplete, { type AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

import { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './form-control-wrapper';

export interface AutocompleteOptionsType {
  label: string;
  value: string;
}

interface Props<T extends FieldValues>
  extends Omit<
    AutocompleteProps<AutocompleteOptionsType, boolean, boolean, boolean>,
    'renderInput'
  > {
  renderInput?: AutocompleteProps<
    AutocompleteOptionsType,
    boolean,
    boolean,
    boolean
  >['renderInput'];
  renderInputProps?: TextFieldProps;
  name: Path<T>;
  control: Control<T>;
}

const Autocomplete = <T extends FieldValues>({
  renderInputProps = {},
  options,
  renderInput,
  name,
  control,
  ...props
}: Props<T>) => {
  return (
    <ControllWrapper
      name={name}
      control={control}
      render={({ onChange, error, helperText, value, ...field }) => {
        const defaultRenderInput = (params: any) => (
          <TextField error={error} helperText={helperText} {...params} {...renderInputProps} />
        );
        return (
          <MuiAutocomplete
            options={options}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.label)}
            renderInput={renderInput || defaultRenderInput}
            isOptionEqualToValue={(option, val) =>
              typeof val === 'string' ? option.value === val : option.value === val.value
            }
            onChange={(event, val) => {
              const typedVal = val as AutocompleteOptionsType | null;
              onChange(typedVal ? typedVal.value : '');
            }}
            value={
              options.find(
                (option) => option.value === (typeof value === 'string' ? value : value?.value),
              ) || null
            }
            {...props}
            {...field}
          />
        );
      }}
    />
  );
};

export default Autocomplete;
