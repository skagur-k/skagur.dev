type LogoProps = {
	size: string
	weight: string
}

const Logo = ({ size, weight }: LogoProps): JSX.Element => {
	return (
		<div className='items-center'>
			<h1 className={`inline-block font-${weight} text-${size}`}>
				<span className='text-amber-500'>&lt;&nbsp;&nbsp;</span>
				skagur.dev
				<span className='text-amber-500'>&nbsp;/&nbsp;&gt;</span>
			</h1>
		</div>
	)
}

export default Logo
