import React from 'react'
import { Bell } from 'lucide-react'

function Header() {
	return (
		<header className="bg-gradient-to-r from-[#e95371] to-[#c013fa] text-white">
			<div className="container mx-auto px-4 py-6">
				<div className="flex flex-col items-center space-y-4 text-center">
					<h1 className="text-3xl md:text-4xl font-bold">
						Fast Lotto Results
					</h1>
					<p className="text-purple-100 max-w-2xl">
						Get the latest satta results, updated in real-time. View winning numbers and draw times for all major games.
					</p>
					<button className="bg-white text-[#a3076a] hover:bg-purple-50 flex items-center px-4 py-2 rounded-md">
						<Bell className="mr-2 h-4 w-4" />
						Get Result Notifications
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header