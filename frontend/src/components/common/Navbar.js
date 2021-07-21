import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isNavOpen, setIsNavOpen] = React.useState(false)

  const sidebarItemStyle = 'block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-white focus:text-gray-900 hover:bg-primaryGrey focus:bg-gray-200 focus:outline-none focus:shadow-outline'

  return ( <>
    <div className="md:flex flex-col md:flex-row md:min-h-screen w-full absolute">
      <div  className="flex flex-col w-full md:w-64 text-gray-700 bg-primaryWhite dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0" x-data="{ open: true }">
        <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">To The Moon</a>
          <button className="rounded-lg md:hidden rounded-lg focus:outline-none focus:shadow-outline" onClick={() => setIsNavOpen(!isNavOpen)}>
            <span className={`burger cursor-pointer flex flex-col justify-center items-center h-14 w-14  ${isNavOpen ? 'is-active' : ''}`} >
              <span className={`relative block w-33px h-4px mb-5px ${ isNavOpen ? 'burger-first-active' : '' }`}></span>
              <span className={`relative block w-33px h-4px mb-5px ${ isNavOpen ? 'burger-mid-active' : '' }`}></span>
              <span className={`relative block w-33px h-4px mb-5px ${ isNavOpen ? 'burger-last-active' : '' }`}></span>
            </span>
          </button>
        </div>
        <nav className={`flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto ${isNavOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className={sidebarItemStyle} >Home</Link>
          <Link to="/portfoilio" className={sidebarItemStyle} href="#">Portfolio</Link>
          <Link to="/login" className={sidebarItemStyle} href="#">Login</Link>
          <Link to="/register" className={sidebarItemStyle} href="#">Register</Link>
          <Link to="/contact" className={sidebarItemStyle} href="#">Contact</Link>
          <div className="relative" >
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:block hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
              <span>Dropdown</span>
              <svg fill="currentColor" viewBox="0 0 20 20"  className={`inline w-4 h-4 mt-1 ml-1 transform md:-mt-1 transition-transform duration-300 ${!isDropdownOpen && 'transform rotate-180'}`}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>

            {/* could use this section to link to coins in portfolio */}
            <div className={`absolute right-0 w-full mt-2 origin-top-right rounded-md transition-opacity duration-300 ease-in ${!isDropdownOpen ? 'opacity-0 pointer-events-none' : 'shadow'}`}>
              <div className={'px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800 '}>
                <a className={sidebarItemStyle} href="#">Link #1</a>
                <a className={sidebarItemStyle} href="#">Link #2</a>
                <a className={sidebarItemStyle} href="#">Link #3</a>
              </div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  </>
  )
}

export default Navbar
