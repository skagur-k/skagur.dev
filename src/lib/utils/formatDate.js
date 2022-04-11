import siteMetaData from '@/data/siteMetaData'

const formatDate = (date) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	}

	const now = new Date(date).toLocaleDateString(siteMetaData.locale, options)

	return now
}

export default formatDate
