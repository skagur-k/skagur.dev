import Github from "./github.svg";
import Gmail from "./gmail.svg";
import Instagram from "./instagram.svg";
import Linkedin from "./linkedin.svg";

const icons = {
    mail: Gmail,
    github: Github,
    instagram: Instagram,
    linkedin: Linkedin,
};

const SocialIcon = ({ kind, href, size = 6 }) => {
    const Svg = icons[kind];

    return (
        <a
            className="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="sr-only">{kind}</span>
            <Svg
                className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
            />
        </a>
    );
};

export default SocialIcon;
