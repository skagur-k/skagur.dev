import {
    Gmail,
    Github,
    Linkedin,
} from "@icons-pack/react-simple-icons/"

import Icon from "@icons-pack/react-simple-icons/"

const icons = {
    gh: Github,
    gm: Gmail,
    li: Linkedin,
}

const SocialIcon = ({ type, href, size = 8 }) => {
    const iconsvg = icons[type]
    return (
        <a
            className="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            {<Icon
                icon={iconsvg}
                className={`fill-current text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 h-${size} w-${size}`}
            />}
        </a>
    )
}

export default SocialIcon
