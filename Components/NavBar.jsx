import { useEffect, useState, useContext } from 'react'

import { TrackingContext } from '../Conetxt/TrackingContext'
import { Nav3 } from '../Components/index'
import Image from 'next/image'
import images from '../Images/index'

export default () => {
	const [state, setState] = useState(false)
	const { currentUser, connectWallet } = useContext(TrackingContext)

	const navLinks = [
		{ title: 'Home ', path: '#' },
		{ title: 'Services', path: '#' },
		{ title: 'Contact Us', path: '#' },
	]

	useEffect(() => {
		document.onclick = (e) => {
			const target = e.target
			if (!target.closest('.menu-btn')) setState(false)
		}
	}, [])

	return (
		<nav className="navbar bg-base-100 border-2 border-cyan-500 rounded-lg sticky top-0 z-10">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl" href="/">
					Supply Chain
				</a>
			</div>
			<div className="flex-none gap-2">
				<div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
					{currentUser ? (
						<p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
							{currentUser.slice(0, 25)}...
						</p>
					) : (
						<button
							onClick={() => connectWallet()}
							className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
						>
							Connect Wallet
							<Nav3 />
						</button>
					)}
				</div>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<Image
								alt="Tailwind CSS Navbar component"
								src={
									currentUser
										? images.avatar
										: images.defaultAvatar
								}
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="mt-3 z-[1] p-2 shadow menu menu-lg dropdown-content bg-base-100 rounded-box w-52 border-2 border-cyan-500"
					>
						{navLinks.map((navLink, idx) => (
							<li key={idx}>
								<a href={navLink.path}>{navLink.title}</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	)
}
