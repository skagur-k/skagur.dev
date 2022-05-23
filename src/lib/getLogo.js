export default function Logo({ className, ...rest }) {
	return (
		<h1
			className={`inline-block font-semibold px-2 items-center`}
			{...rest}>
			<span className='text-amber-500'>&lt;</span>
			skagur.dev
			<span className='text-amber-500'>/&gt;</span>
		</h1>
	)
}
