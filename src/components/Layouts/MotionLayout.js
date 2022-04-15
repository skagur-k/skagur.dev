import { motion } from 'framer-motion'

const variants = {
	hidden: { opacity: 0, x: -50, y: 0 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: 25, y: 0 },
}

const MotionLayout = ({ children }, key) => {
	return (
		<motion.div
			className='h-fit'
			key={key}
			variants={variants}
			initial='hidden'
			animate='enter'
			exit='exit'
			transition={{ type: 'linear' }}>
			{children}
		</motion.div>
	)
}

export default MotionLayout
