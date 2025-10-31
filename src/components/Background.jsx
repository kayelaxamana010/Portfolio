import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
	const blobRefs = useRef([])
	const initialPositions = [
		{ x: -4, y: 0 },
		{ x: -4, y: 0 },
		{ x: 20, y: -8 },
		{ x: 20, y: -8 },
	]

	useEffect(() => {
		let currentScroll = 0
		let requestId

		const handleScroll = () => {
			const newScroll = window.pageYOffset
			const scrollDelta = newScroll - currentScroll
			currentScroll = newScroll

			blobRefs.current.forEach((blob, index) => {
				const initialPos = initialPositions[index]

				// Calculating movement in both X and Y direction
				const xOffset = Math.sin(newScroll / 100 + index * 0.5) * 340 // Horizontal movement
				const yOffset = Math.cos(newScroll / 100 + index * 0.5) * 40 // Vertical movement

				const x = initialPos.x + xOffset
				const y = initialPos.y + yOffset

				// Apply transformation with smooth transition
				blob.style.transform = `translate(${x}px, ${y}px)`
				blob.style.transition = "transform 1.4s ease-out"
			})

			requestId = requestAnimationFrame(handleScroll)
		}

		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
			cancelAnimationFrame(requestId)
		}
	}, [])

	return (
		<div className="fixed inset-0 pointer-events-none">
			<div className="absolute inset-0">
				{/* Light mode blobs - soft pastel colors */}
				<div
					ref={(ref) => (blobRefs.current[0] = ref)}
					className="absolute top-0 -left-4 md:w-[500px] md:h-[500px] w-80 h-80 
					           bg-blue-300 dark:bg-blue-600 
					           rounded-full mix-blend-multiply dark:mix-blend-soft-light 
					           filter blur-[100px] dark:blur-[120px] 
					           opacity-30 dark:opacity-15 
					           transition-colors duration-500"></div>
				<div
					ref={(ref) => (blobRefs.current[1] = ref)}
					className="absolute top-0 -right-4 md:w-[500px] md:h-[500px] w-80 h-80 
					           bg-pink-300 dark:bg-orange-500 
					           rounded-full mix-blend-multiply dark:mix-blend-soft-light 
					           filter blur-[100px] dark:blur-[120px] 
					           opacity-30 dark:opacity-15 
					           transition-colors duration-500 
					           hidden sm:block"></div>
				<div
					ref={(ref) => (blobRefs.current[2] = ref)}
					className="absolute -bottom-8 left-[-40%] md:left-20 md:w-[500px] md:h-[500px] w-80 h-80 
					           bg-purple-300 dark:bg-indigo-600 
					           rounded-full mix-blend-multiply dark:mix-blend-soft-light 
					           filter blur-[100px] dark:blur-[120px] 
					           opacity-30 dark:opacity-15 
					           transition-colors duration-500"></div>
				<div
					ref={(ref) => (blobRefs.current[3] = ref)}
					className="absolute -bottom-10 right-20 md:w-[500px] md:h-[500px] w-80 h-80 
					           bg-yellow-300 dark:bg-red-600 
					           rounded-full mix-blend-multiply dark:mix-blend-soft-light 
					           filter blur-[100px] dark:blur-[120px] 
					           opacity-25 dark:opacity-12 
					           transition-colors duration-500 
					           hidden sm:block"></div>
			</div>
			{/* Grid overlay - subtle in light mode, more subtle in dark mode */}
			<div className="absolute inset-0 
			                bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)]
			                dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)]
			                bg-[size:40px_40px]
			                transition-colors duration-500"></div>
		</div>
	)
}

export default AnimatedBackground

