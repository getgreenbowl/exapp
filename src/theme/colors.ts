const palette = {
  primary: {
    DEFAULT: 'hsl(240 5.9% 10%)',
    foreground: 'hsl(0 0% 98%)',
  },
  secondary: {
    DEFAULT: 'hsl(240 4.8% 95.9%)',
    foreground: 'hsl(240 5.9% 10%)',
  },
  destructive: {
    DEFAULT: 'hsl(0 84.2% 60.2%)',
    foreground: 'hsl(0 0% 98%)',
  },
  muted: {
    DEFAULT: 'hsl(240 4.8% 95.9%)',
    foreground: 'hsl(240 3.8% 46.1%)',
  },
  accent: {
    DEFAULT: 'hsl(240 4.8% 95.9%)',
    foreground: 'hsl(240 5.9% 10%)',
  },
  popover: {
    DEFAULT: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
  card: {
    DEFAULT: 'hsl(0 0% 100%)',
    foreground: 'hsl(222.2 84% 4.9%)',
  },
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  border: 'hsl(240 5.9% 90%)',
  input: 'hsl(240 5.9% 90%)',
  background: 'hsl(0 0% 100%)',
  foreground: 'hsl(240 10% 3.9%)',

  // purpleBg: '#3f4381',
  // lightBg: '#5d628f',
  // orangeBg: '#e46c47',
  // redBg: '#ea595e',
  // darkRedBg: '#e2374f',
  // greenBg: '#07BEB8',
  // darkGreenBg: '#00b2aa',
};
