import React from 'react'

const Navbar = () => {
  return (
    <nav className='navbar is-dark'>
      <div className='container'>
        <div className='navbar-brand'>
          <a className='navbar-item' href='/'>
            <h1 className='title is-4 has-text-light'>DocuSign</h1>
          </a>
        </div>
      </div>
      <div className='navbar-end'>
        <div className='navbar-item'>
          <button
            className='button is-light is-small'
            onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
