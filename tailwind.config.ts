/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

import { colors } from './src/constant';

const config: Config = {
  corePlugins: {
    preflight: false,
    aspectRatio: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.primary[500],
          100: colors.primary[100],
          200: colors.primary[200],
          300: colors.primary[300],
          400: colors.primary[400],
          500: colors.primary[500],
          600: colors.primary[600],
          700: colors.primary[700],
          800: colors.primary[800],
          900: colors.primary[900],
        },
      },
      loading: {
        sm: '',
        md: '',
        lg: '',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
    plugin(({ matchUtilities, theme, addUtilities }) => {
      matchUtilities(
        {
          loading: (value) => ({
            loading: value,
          }),
        },
        {
          values: theme('loading'),
        },
      );
      addUtilities({
        '.form-container': {
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '3rem',
          maxWidth: '720px',
        },
      });
    }),
  ],
};
export default config;
