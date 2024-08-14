'use client';

import InputLabel from '@mui/material/InputLabel';

import { MuiTelInput, type MuiTelInputProps } from 'mui-tel-input';
import type { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './form-control-wrapper';

interface Props<T extends FieldValues> extends Omit<MuiTelInputProps, 'ref'> {
  name: Path<T>;
  control: Control<T>;
}

const TelInput = <T extends FieldValues>({
  label,
  placeholder,
  name,
  control,
  ...props
}: Props<T>) => (
  <ControllWrapper<T>
    name={name}
    control={control}
    render={({ ...field }) => (
      <>
        <InputLabel error={props.error || field.error} disabled={props.disabled} className="mb-1">
          {label || 'No. Telepon'}
        </InputLabel>
        <MuiTelInput
          placeholder={placeholder || (label as string) || 'No. Telepon'}
          defaultCountry="ID"
          {...field}
          {...(props as Omit<MuiTelInputProps, 'forceCallingCode'>)}
        />
      </>
    )}
  />
);

export default TelInput;
