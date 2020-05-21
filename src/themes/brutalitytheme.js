
const brutalityTheme = {
  name: 'Brutality',
  rounding: 2,
  spacing: 18,
  defaultMode: 'dark',
  anchor: {
    color: {
      dark: 'pink',
    },
  },
  global: {
    focus: {
      border: {
        color: 'none',
      },
    },
    colors: {
      brand: {
        dark: 'pink',
        light: 'pink',
      },
      background: {
        dark: 'rgb(29, 29 ,29)',
        light: '#FFFFFF',
      },
      'background-back': {
        dark: '#111111',
        light: '#EEEEEE',
      },
      'background-front': {
        dark: '#222222',
        light: '#FFFFFF',
      },
      'background-contrast': {
        dark: '#FFFFFF11',
        light: '#11111111',
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444',
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666',
      },
      border: {
        dark: 'pink',
        light: '#CCCCCC',
      },
      control: 'brand',
      'active-background': 'background-contrast',
      'active-text': 'pink',
      'selected-background': 'pink',
      'selected-text': 'text-strong',
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      'graph-0': 'brand',
      'graph-1': 'status-warning',
    },
    font: {
      family: 'Helvetica',
    },
    active: {
      background: 'black',
      color: 'active-text',
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },

    selected: {
      background: 'selected-background',
      color: 'pink',
    },

  },
};

export default brutalityTheme;
