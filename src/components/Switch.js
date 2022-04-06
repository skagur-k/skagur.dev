import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"

const Switch = () => {
    const { systemTheme, theme, setTheme } = useTheme()
    const currentTheme =
        theme === "system" ? systemTheme : theme
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <button
            className="btn rounded p-1 items-center bg-transparent hover:bg-transparent text-gray-600 hover:text-amber-600 dark:text-gray-100 dark:hover:text-amber-500"
            onClick={() =>
                setTheme(
                    currentTheme === "dark"
                        ? "light"
                        : "dark"
                )
            }
        >
            {currentTheme === "dark" ? (
                <SunIcon className="h-7 w-7" />
            ) : (
                <MoonIcon className="h-7 w-7" />
            )}
        </button>
    )
}

export default Switch
