import siteMetadata, { siteLogo } from "lib/siteMetaData"
import Link from "@/components/Link"
import Logo from "@/components/Logo"
import headerNavLinks from "@/lib/headerNavLinks"
import Switch from "../Switch"
import ContactMenu from "@/components/ContactMenu"

// TODO: Add hamburger icon & consider headlessui for the drop menu.

const Header = () => {
    return (
        // Header Container
        <header className="flex item-center justify-between py-4 md:py-10 px-4 md:px-0">
            <div>
                <Link
                    href="/"
                    aria-label={siteMetadata.headerTitle}
                >
                    <Logo size="xl" weight="bold" />
                </Link>
            </div>
            {/* {Navbar} */}
            <div className="flex items-center text-lg leading-5">
                <div className="hidden items-center sm:flex space-x-4 sm:space-x-10">
                    {headerNavLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="items-center text-gray-600 hover:text-amber-600 dark:text-gray-100 dark:hover:text-amber-500  font-bold text-base"
                        >
                            {link.title}
                        </Link>
                    ))}
                    {/* <ContactMenu /> */}
                    <Switch />
                </div>
            </div>
        </header>
    )
}

export default Header
