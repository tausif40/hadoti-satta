import React from 'react'
import { Bell } from 'lucide-react'

function Header() {
	return (
		<header className="headerBg text-white">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold">
						Fast Lotto Results
					</h1>
					<p className="text-purple-100 max-w-2xl">
						Get the latest satta results, updated in real-time. View winning numbers and draw times for all major games.
					</p>
					<button className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-light backdrop-blur-sm transition hover:bg-white/30">
						<Bell className="h-4 w-4" />
						Get Result Notifications
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header