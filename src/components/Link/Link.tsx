import Link from 'next/link'
import React, { forwardRef } from 'react'
import { Url } from 'url'

const CustomLink = forwardRef(
	(
		{ children, className, href, as }: { children: React.ReactNode; className?: string; href: string; as?: Url | undefined },
		ref: React.Ref<HTMLAnchorElement> | undefined
	): JSX.Element => {
		const isInternalLink = href && href.startsWith('/')
		const isAnchorLink = href && href.startsWith('#')

		if (isInternalLink) {
			return (
				<Link href={href} as={as} ref={ref}>
					<a className={className}>{children}</a>
				</Link>
			)
		}

		if (isAnchorLink) {
			return (
				<Link href={href} as={as} ref={ref}>
					<a className={className}>{children}</a>
				</Link>
			)
		}

		return (
			<a target='_blank' rel='noopener noreferrer' href={href} className={className}>
				{children}
			</a>
		)
	}
)

CustomLink.displayName = 'CustomLink'

export default CustomLink
