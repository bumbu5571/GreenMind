import { extendTheme } from '@chakra-ui/react';

import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  // label: {
  //   fontFamily: 'mono', // change the font family of the label
  // },
  control: {
    padding: 2,
    color: '#EDF2F7',
  },
});
export const checkboxTheme = defineMultiStyleConfig({ baseStyle });

const theme = extendTheme({
  colors: {
    brand: {
      100: '#55B76B',
      150: '#8BD2A0',
      200: '#333333',
      250: '#FFFFFF',
    },
    dark: '#333333',
    accent: '#55b76b',
    accentLight: '#f3f8de',
    btnHover: '#3b804a',
    btnActive: '#2a5b35',
    customGreen: {
      // theme for buttons in cards on the tab with all company promotions
      50: '#f3f8de', // hoverBgOutline
      100: '#cce9d2', // activeBgOutline
      200: 'red',
      300: 'orange',
      400: 'purple',
      500: '#55b76b', // simpleBgPrimary
      600: '#3b804a', // hoverBgPrimary
      700: '#2a5b35', // activeBgPrimary
      800: 'pink',
      900: 'blue',
    },
  },
  styles: {
    global: {
      body: {
        bg: '#ffffff',
        color: '#333333',
        // fontFamily: 'Montserrat',
        fontWeight: 400,
        fontStyle: 'normal',
        fontSize: '16px',
      },
      a: {
        _hover: {},
      },
      h1: {
        color: '',
      },
      h2: {
        color: '',
      },
      p: {
        color: '',
      },
      // colors: {
      //   primary: {
      //     100: '55B76B',
      //   },
      //   accent: {
      //     100: '8BD2A0',
      //   },
      //   neutral: {
      //     100: '333333',
      //   },
      // },
    },
  },

  fonts: {
    body: 'Montserrat, Helvetica, Arial, sans-serif',
    heading: 'Montserrat, Helvetica, Arial, sans-serif',
    //   mono: 'Menlo, monospace',
  },

  components: { Checkbox: checkboxTheme },
});

export default theme;
