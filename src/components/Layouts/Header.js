import siteMetadata, { siteLogo } from "lib/siteMetaData";
import Link from "@/components/Link";
import Logo from "@/lib/logo.svg";
import headerNavLinks from "@/lib/headerNavLinks";
import Switch from "../Switch";
import tw from "tailwind-styled-components";

// TODO: Add hamburger icon & consider headlessui for the drop menu.

const Header = () => {
    return (
        // Header Container
        <header className="flex item-center justify-between py-12">
            <div>
                {/* Logo Area */}
                <Link href="/" aria-label={siteMetadata.headerTitle}>
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                            <div className="text-lg sm:text-2xl font-bold items-center sm:flex">
                                {siteMetadata.headerTitle}
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            {/* {Navbar} */}
            <div className="flex items-center text-lg leading-5">
                <div className="hidden items-center sm:flex space-x-4 sm:space-x-10">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="items-center text-gray-900 dark:text-gray-100 font-bold"
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Switch />
                </div>
            </div>
        </header>
    );
};

export default Header;
