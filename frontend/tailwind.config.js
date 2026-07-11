export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                boba: {
                    primary: "#F76C6C",
                    dark: "#D9534F",
                    cream: "#FFF3E9",
                    brown: "#3E2723",
                },
            },
            fontFamily: {
                heading: ['"Playfair Display"', 'serif'],
                body: ['"Poppins"', 'sans-serif'],
            },
        },
    },
    plugins: [],
}