import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['InterVariable', 'Arial', 'Helvetica', 'sans-serif']
      },
    }
  },
  content: [],
  plugins: [],
}
