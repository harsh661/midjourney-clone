import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg'
import trending from '../assets/trending.svg'

const Navbar = ({shown, setShown}) => {
  return (
    <nav className='lg:hidden flex justify-between p-5 lg:p-10 items-center sticky top-0 w-full'>
      <img onClick={() => setShown(prev => !prev)} src={shown ? close: menu} alt="Menu" className='w-10 p-2 rounded-full hover:bg-hover/20 cursor-pointer'/>
      <Link to='/create' className='px-4 cursor-pointer py-2 bg-lighter hover:bg-hover/50 rounded-full flex lg:hidden items-center gap-2 w-max'>
          <img src={trending} alt="Add" className='w-5 h-5'/> <span>Add</span>
      </Link>
    </nav>
  )
}

export default Navbar