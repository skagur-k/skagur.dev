import Image from 'next/image'

//TODO: Figure out how to mask profile image with github svg
const GithubProfile = ({ ghmeta }) => {
	return (
		<div>
			<Image
				className='rounded-full'
				alt='gh-profilepic'
				layout='fixed'
				width='100'
				height='100'
				src={ghmeta.avatar_url}></Image>
		</div>
	)
}

export default GithubProfile
