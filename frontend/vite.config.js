import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuration file for Vite.
 * Vite is a modern frontend build tool that provides an extremely fast
 * development experience and bundles your code for production.
 * https://vitejs.dev/config/
 */
export default defineConfig({
  /**
   * The 'plugins' array is where you add Vite plugins.
   * The '@vitejs/plugin-react' is the official plugin that enables
   * full support for React, including features like Fast Refresh (HMR),
   * and JSX transformation.
   */
  plugins: [react()],
})

