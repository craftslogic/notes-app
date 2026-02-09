// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



//gemini code 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Import karein

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Plugin add karein
  ],
})
