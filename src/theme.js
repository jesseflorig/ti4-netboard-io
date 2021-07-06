import {
  extendTheme,
  withDefaultColorScheme,
  theme as baseTheme,
} from '@chakra-ui/react';

const customTheme = extendTheme(
  {
    colors: {
      brand: baseTheme.colors.yellow,
      player: {
        black: '#666666',
        blue: '#3182ce',
        green: '#38a169',
        pink: '#d53f8c',
        orange: '#ed8936',
        purple: '#805aD5',
        red: '#e53e3e',
        yellow: '#d69e2e',
      },
    },
    components: {
      Alert: {
        defaultProps: {
          colorScheme: 'blue',
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);

export default customTheme;
