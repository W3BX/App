import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='error container'>
        <h2>404</h2>
        <h3>Page not found</h3>
        <Link to={'/'}>Back to Home Page</Link>
    </div>
  )
}

export default Error