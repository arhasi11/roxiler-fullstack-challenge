/** @type {import('tailwindcss').Config} */
export default {
  // The 'content' array tells Tailwind which files to scan for utility classes.
  // It's configured to look at the main index.html file and all JS/JSX files
  // within the 'src' directory.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // The 'theme' object is where you can customize Tailwind's default design system.
  // You can extend colors, fonts, spacing, etc.
  theme: {
    extend: {
      // Example: Setting a custom default font for the entire application.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },

  // The 'plugins' array allows you to add official or third-party plugins
  // to extend Tailwind's functionality (e.g., for form styles or typography).
  plugins: [],
}

