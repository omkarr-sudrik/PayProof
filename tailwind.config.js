/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F4F6',
        ink: '#111215',
        borderSubtle: '#E2E4E9',
        actionBlue: {
          DEFAULT: '#0066CC',
          hover: '#0052A3',
          light: '#EBF4FF',
        },
        vaultEmerald: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#ECFDF5',
        },
        countdownAmber: {
          DEFAULT: '#F59E0B',
          light: '#FFFBEB',
        },
        disputeCrimson: {
          DEFAULT: '#EF4444',
          light: '#FEF2F2',
        },
        oled: '#0F141C',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'ui-monospace', 'Menlo', 'Monaco', 'Cascadia Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}

