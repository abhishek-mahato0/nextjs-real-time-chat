import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '28': '28%',
        '44': '44%',
        '98': '98%',
      },
      borderRadius: {
        '100': '100%',
      },
    },
  },
  plugins: [],
};
export default config;
