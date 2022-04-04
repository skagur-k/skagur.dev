import SocialIcon from "@/lib/SocialIcon";
import siteMetadata from "@/lib/siteMetaData";

const Footer = () => {
    return (
        <footer>
            <div className="flex flex-col items-center mt-10">
                <div className="flex mb-3 space-x-4">
                    <SocialIcon
                        kind="github"
                        href={`${siteMetadata.github}`}
                        size="6"
                    />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
