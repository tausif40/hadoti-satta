import React from 'react'

function TopNav() {
	return (
		<>
			<nav className='border-2 topHeaderBg'>
				<div className='flex items-center justify-center gap-2 sm:gap-4'>
					<img src="/assets/img/logo.png" alt="" className='w-16 sm:w-20 p-2' />
					<h1 className='logo-name'>Hadoti Satta</h1>
				</div>
			</nav>
		</>
	)
}

export default TopNav