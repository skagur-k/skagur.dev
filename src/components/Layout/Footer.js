import siteMetadata from "@/lib/siteMetaData"
import Link from "@/components/Link"
import SocialIcon from "@/components/Icons"
import Logo from "@/components/Logo"

const Footer = () => {
    return (
        <footer>
            <div className="flex items-center py-8">
                <div className="" />
                <div className="flex ml-auto flex-col space-y-2 items-center">
                    <Logo size="lg" weight="medium"/>
                    <div className="flex items-center space-x-4 text-gray-500">
                        <div>{`© ${new Date().getFullYear()}`}</div>
                        <div>{siteMetadata.author}</div>
                        <Link href="/">
                            {siteMetadata.title}
                        </Link>
                    </div>
                </div>
                <div className="ml-auto">GitHub</div>
            </div>
        </footer>
    )
}

export default Footer
