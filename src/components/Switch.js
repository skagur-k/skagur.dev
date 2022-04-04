import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

const Switch = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            className="btn rounded p-1 items-center bg-transparent hover:bg-transparent"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
        >
            {currentTheme === "dark" ? (
                <SunIcon className="h-7 w-7 text-white" />
            ) : (
                <MoonIcon className="h-7 w-7 " />
            )}
        </button>
    );
};

export default Switch;
