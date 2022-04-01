import { useTheme } from "next-themes";
import {
    XIcon,
    ViewGridIcon,
    RefreshIcon,
    PlayIcon,
    MenuIcon,
    ChartBarIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}
// TODO: Add hamburger icon & consider headlessui for the drop menu.

const Header = () => {
    const { systemTheme, theme, setTheme } = useTheme();

    const themeChanger = () => {
        // Theme Changer Component
        const currentTheme = theme === "system" ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (
                <button className="btn" onClick={() => setTheme("light")}>
                    LIGHT
                </button>
            );
        } else {
            return (
                <button className="btn" onClick={() => setTheme("dark")}>
                    DARK
                </button>
            );
        }
    };

    return (
        // Header Container
        <header className="relative bg-gray-200 dark:bg-black overflow-hidden">
            <div className="container py-4 max-w-6xl w-full mx-auto flex justify-between items-center">
                <a href="#">
                    <p className="text-xl font-bold font-serif px-4">
                        skagur.dev
                    </p>
                </a>
                <div className="hidden md:flex space-x-8 items-center">
                    <a href="#" className="">
                        Projects
                    </a>
                    <a href="#" className="">
                        About
                    </a>
                    <a href="#" className="">
                        Blog
                    </a>
                    <a href="#" className="">
                        Snippets
                    </a>
                    <a href="#" className="">
                        <button className="btn font-bold">Contact Me</button>
                    </a>
                </div>
                <div className="md:hidden px-4">Menu Icon Goes Here</div>
            </div>
        </header>
    );
};

export default Header;
