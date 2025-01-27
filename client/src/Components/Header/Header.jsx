import React from "react";
import { NavLink } from "react-router-dom";

import './Header.css'

export default function Header () {
  return (
    <nav className="header">
      <div className="name">
        YouMP3
      </div>

      <div className="nav">
        <NavLink to="/" className="navHome">
          Home
        </NavLink>
        <NavLink to="/Contact" className="navContact" >
          Contact
        </NavLink>
      </div>
    </nav>
  )
}