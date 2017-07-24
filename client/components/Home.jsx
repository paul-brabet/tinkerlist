import React from 'react'
// import {Link} from 'react-router'

function Home () {
  return (
    <div>
      <div className='header'>
        <h1 className='title'>Tinkerlist</h1>
        <img src='https://placekitten.com/149/149' alt='Placeholder kitty' />
      </div>
      <div className='login'>
        <h2>Login</h2>
        {/* <Link to='./haventdecidedyet'>Login</Link> */}
      </div>
    </div>
  )
}

export default Home
