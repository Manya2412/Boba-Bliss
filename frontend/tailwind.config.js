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
                              dark: "#E85A4F",
                              cream: "#FFF3E9",
                              brown: "#3E2723",
                              text: "#1F1F1F",
                              gray: "#666666",
                              border: "#EDEDED",
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