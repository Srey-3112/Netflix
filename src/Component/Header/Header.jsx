import React from 'react'
import { Link } from 'react-router-dom' 
import logo from '../../logo.png'
import {ImSearch} from 'react-icons/im'

const Header = () => {
  return (
    <div>
      <nav className="header">
        <img src={logo} alt="logo"></img>
        <div>
          <Link to="/tvShow">TV Shows</Link>
          <Link to="/Movies">Movies</Link>
          <Link to="/RecentlyAdded">Recently Added</Link>
          <Link to="MyList">My List</Link>
        </div>
        <ImSearch/>
      </nav>
    </div>
  )
}

export default Header
