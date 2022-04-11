import tw from 'tailwind-styled-components'
import { ArticleType } from '@/types/main'
import Link from '@/components/Link'

export const ArticleItemContainer = tw.article`
    w-full
    h-fit
    grid
`

interface Props {
	article: ArticleType
}

const ArticleItem = ({ article }: Props) => {
	;<ArticleItemContainer>
		<div className='flex flex-col items-center justify-center'>
			<Link href='/blog/[slug]'></Link>
		</div>
	</ArticleItemContainer>
}

export async function getStaticProps() {
	const posts = await getAllArticles
}
