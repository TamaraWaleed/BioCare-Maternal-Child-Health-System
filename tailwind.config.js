import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                office: {
                    black: {
                        bg: '#111111',       // Main background
                        surface: '#262626',  // Container/Card background
                        ribbon: '#333333',   // Header/Nav background
                        text: '#e6e6e6',     // Primary text
                        subtext: '#a6a6a6',  // Secondary text
                        border: '#3c3c3c',   // Border color
                    },
                    // Office 2019 Colorful (Light Theme)
                    colorful: {
                        bg: '#f3f2f1',       // Main background
                        surface: '#ffffff',  // Container/Card background
                        ribbon: '#2B7CBD',   // Characterizing color (Blue)
                        text: '#201f1e',     // Primary text
                        subtext: '#605e5c',  // Secondary text
                        border: '#edebe9',   // Border color
                    },
                    accent: '#2B7CBD', // Primary Accent Blue
                }
            }
        },
    },

    plugins: [forms],
};
