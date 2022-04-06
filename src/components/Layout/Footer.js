import siteMetadata from "@/lib/siteMetaData"
import Link from "@/components/Link"
import SocialIcon from "@/components/Icons"
import Logo from "@/components/Logo"

//TODO: add social icons, center last thing

const Footer = () => {
    return (
        <footer>
            <hr className="border-t-1 border-solid border-gray-400 border-opacity-30" />
            <div className="grid grid-cols-8 items-center py-8">
                <div className="col-span-0 md:col-span-2 hidden md:flex" />
                <div className="flex mx-auto flex-col space-y-2 items-center col-span-full md:col-span-4">
                    <Logo size="lg" weight="medium" />
                    <div className="flex justify-items-center items-center space-x-4 text-gray-500">
                        <div>{`© ${new Date().getFullYear()}`}</div>
                        <div>{siteMetadata.author}</div>
                        <Link href="/">
                            {siteMetadata.title}
                        </Link>
                    </div>
                </div>
                <div className="col-span-0 md:col-span-2 justify-end hidden md:flex">
                    GitHub
                </div>
            </div>
        </footer>
    )
}

export default Footer
