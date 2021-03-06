module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.tsx',
    ],
    darkMode: false,
    theme: {
        extend: {
            animation: {
                messageFloat: 'messageFloat 3s ease-in-out forwards'
            },
            keyframes: {
                messageFloat: {
                    '0%': { transform: 'translateY(100%)', opacity: 0 },
                    '10%': { transform: 'translateY(0%)', opacity: 1 },
                    '90%': { transform: 'translateY(0%)', opacity: 1 },
                    '100%': { transform: 'translateY(100%)', opacity: 0, visibility: 'hidden' },
                }
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
