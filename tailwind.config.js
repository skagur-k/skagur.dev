const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const theme = require("tailwindcss/defaultTheme")

module.exports = {
    content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
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
            height: {
                pnf: "calc(60vh)", //page-not-found height
            },
            colors: {
                selectedtext: "#ffffff",
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
                sans: [
                    '"Inter"',
                    ...defaultTheme.fontFamily.sans,
                ],
                serif: [
                    "Georgia",
                    ...defaultTheme.fontFamily.serif,
                ],
                mono: ["ui-monospace", "SFMono-Regular"],
                display: ["Oswald"],
                body: ['"Inter"'],
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
}
