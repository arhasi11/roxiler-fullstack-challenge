/**
 * Configuration file for PostCSS.
 * PostCSS is a tool for transforming CSS with JavaScript plugins.
 * This setup enables Tailwind CSS and Autoprefixer.
 */
export default {
  plugins: {
    // 1. Tailwind CSS Plugin:
    // Scans your HTML/JSX files for Tailwind utility classes (e.g., 'text-center', 'bg-blue-500')
    // and generates all the corresponding CSS.
    tailwindcss: {},

    // 2. Autoprefixer Plugin:
    // Parses the generated CSS and automatically adds vendor prefixes
    // (e.g., -webkit-, -moz-) to CSS rules, ensuring cross-browser compatibility.
    autoprefixer: {},
  },
}

