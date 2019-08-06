import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div id="home-div">
      <div id="home-content">
        <h1 id="home-header">Welcome To Your New Paradise</h1>
        <div id="link-container">
          <Link to="/login" className="home-links">
            Log In
          </Link>
          <Link to="/signup" className="home-links">
            Sign Up
          </Link>
          <Link to="/products" className="home-links">
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
