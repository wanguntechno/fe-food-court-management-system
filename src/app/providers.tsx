'use client';

import React from 'react';

import NextTopLoader from 'nextjs-toploader';

import Alert, { type AlertColor } from '@mui/material/Alert';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { ThemeProvider } from '@emotion/react';
import { SnackbarProvider } from 'notistack';

import { colors } from '@/constant';
import MuiTheme from '@/lib/mui/theme';
import ReactQueryProvider from '@/lib/react-query/providers';
import ReduxProvider from '@/lib/redux/Provider';
import { cn } from '@/lib/utils';

interface NotistackProps {
  message: string;
  iconVariant: Partial<Record<AlertColor, React.ReactNode>>;
  variant: AlertColor;
  hideIconVariant: boolean;
  style: React.CSSProperties;
  className: string;
}

const CustomSnackbar = React.forwardRef(
  (
    { message, iconVariant, variant, hideIconVariant, style, className }: NotistackProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <Alert
      iconMapping={iconVariant}
      color={variant}
      icon={hideIconVariant}
      ref={ref}
      style={style}
      className={cn('text-white', className)}
    >
      {message}
    </Alert>
  ),
);

const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <SnackbarProvider
    maxSnack={5}
    autoHideDuration={3500}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    Components={{
      default: CustomSnackbar,
    }}
  >
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReduxProvider>
        <ThemeProvider theme={MuiTheme}>
          <ReactQueryProvider>
            <NextTopLoader zIndex={9999} color={colors.primary[500]} height={5} />
            {children}
          </ReactQueryProvider>
        </ThemeProvider>
      </ReduxProvider>
    </LocalizationProvider>
  </SnackbarProvider>
);

export default Providers;
