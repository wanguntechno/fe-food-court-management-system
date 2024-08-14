/* eslint-disable react-hooks/rules-of-hooks */
import { useCallback } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';

import { UploadCloud } from 'lucide-react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import ControllWrapper from '../form-control-wrapper';
import FileList from './file-list';

interface Props<T extends FieldValues> extends BoxProps {
  name: Path<T>;
  control: Control<T>;
  options: DropzoneOptions;
  label?: string;
}

const FileDropzone = <T extends FieldValues>({
  name,
  control,
  options,
  className,
  label,
  ...props
}: Props<T>) => {
  return (
    <ControllWrapper
      name={name}
      control={control}
      render={({ onChange, error, helperText, value }) => {
        const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
          onDropAccepted: (files) => {
            if (files.length > 1) {
              const intitalValue = (value as any[]).filter((file) => !(file instanceof File));
              onChange([...intitalValue, ...files]);
            } else {
              onChange(files[0]);
            }
          },
          ...options,
        });

        const handleRemoveFile = useCallback(
          (index: number) => {
            const updatedFiles = (value || []).filter((_: File, i: number) => i !== index);
            onChange(updatedFiles);
          },
          [value, onChange],
        );

        return (
          <div>
            {label && <InputLabel className="mb-1.5">{label}</InputLabel>}
            <Box
              {...getRootProps()}
              className={cn(
                'duratoin-300 flex cursor-pointer flex-col items-center justify-center rounded-[0.6rem] border-2 border-dashed border-gray-300 bg-gray-100 p-4 py-16 hover:border-gray-700 hover:opacity-80',
                error && 'border-red-500 bg-red-50 text-red-500 hover:border-red-500',
                isDragActive && 'border-primary-500',
                className,
              )}
              {...props}
            >
              <input {...getInputProps()} />

              <UploadCloud className="mb-2 size-16" />

              <Typography variant="body1" className="font-semibold">
                {isDragActive ? 'Drop the files here...' : 'Drop or select file'}
              </Typography>

              <Typography variant="body2" className={`${error ? 'text-red-400' : 'text-gray-500'}`}>
                Drop files here or click tobrowsethrough your machine.
              </Typography>
            </Box>
            <FormHelperText error={error}>{helperText}</FormHelperText>

            {acceptedFiles.length > 0 && (
              <FileList files={acceptedFiles} onRemove={handleRemoveFile} />
            )}
          </div>
        );
      }}
    />
  );
};

export default FileDropzone;
