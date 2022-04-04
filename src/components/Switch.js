import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Switch = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    return (
        <button
            className="btn rounded p-1"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
            Toggle
        </button>
    );
};

export default Switch;
