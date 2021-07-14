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
      strategy: {
        leadership: '#000',
        diplomacy: '#000',
        politics: '#000',
        construction: '#000',
        trade: '#000',
        warfare: '#000',
        technology: '#000',
        imperial: '#000',
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
