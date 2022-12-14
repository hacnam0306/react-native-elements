import React from 'react';
import {ThemeProvider, createTheme} from '@rneui/themed';

const theme = createTheme({
  mode: 'dark',
  components: {
    Text: {
      h1Style: {
        fontSize: 80,
      },
    },
  },
});

export const WithThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
