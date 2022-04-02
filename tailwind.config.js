const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
    darkMode: "class",
    theme: {
        fontSize: {
            xs: ".75rem",
            sm: ".875rem",
            tiny: ".875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
        },
        extend: {
            colors: {
                // can use default colors like: [gray: colors.gray]
                body: "#000000",
                selectedtext: "#000000",
                nav: "#000000",
                transparent: "transparent",
                current: "currentcolor",
                theme: {
                    primary: "#ffffff",
                    secondary: "#000000",
                },
                badge: "#000000",
                inputborder: "#000000",
                input: "#000000",
            },
            fontFamily: {
                sans: ['"Noto Sans"', "ui-sans-serif", "system-ui"],
                serif: ["ui-serif", "Georgia"],
                mono: ["ui-monospace", "SFMono-Regular"],
                display: ["Oswald"],
                body: ['"Open Sans"'],
            },
        },
    },
    plugins: [],
};
