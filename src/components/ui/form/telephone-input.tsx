'use client';

import InputLabel from '@mui/material/InputLabel';

import { MuiTelInput, type MuiTelInputProps } from 'mui-tel-input';
import type { Control, FieldValues, Path } from 'react-hook-form';

import ControllWrapper from './form-control-wrapper';

interface Props<T extends FieldValues> extends Omit<MuiTelInputProps, 'ref'> {
  name: Path<T>;
  control: Control<T>;
}

const TelInput = <T extends FieldValues>({ placeholder, name, control, ...props }: Props<T>) => (
  <ControllWrapper<T>
    name={name}
    control={control}
    render={({ ...field }) => (
      <MuiTelInput
        defaultCountry="ID"
        {...field}
        {...(props as Omit<MuiTelInputProps, 'forceCallingCode'>)}
      />
    )}
  />
);

export default TelInput;
