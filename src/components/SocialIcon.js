import Github from "@/lib/social-icons/github.svg"
import LinkedIn from "@/lib/social-icons/linkedin.svg"
import Gmail from "@/lib/social-icons/gmail.svg"

const icons = {
    gh: Github,
    li: LinkedIn,
    gm: Gmail,
}

const SocialIcon = ({ type, href, size }) => {
    console.log(type, href, size)
    console.log(icons)
    const SVG = icons[type]
    console.log(SVG)
    return (
        <a
            className="text-sm text-gray-500 transition hover:text-gray-600"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="sr-only">{type}</span>
            <SVG
                className={`fill-current text-gray-700 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 h-${size} w-${size}`}
            />
        </a>
    )
}

export default SocialIcon
