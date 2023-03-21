import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_AUTH0_DOMAIN: JSON.stringify(process.env.VITE_AUTH0_DOMAIN),
      VITE_AUTH0_CLIENT_ID: JSON.stringify(process.env.VITE_AUTH0_CLIENT_ID),
      VITE_AUTH0_REDIRECT_URI: JSON.stringify(process.env.VITE_AUTH0_REDIRECT_URI),
    },
  },
})
