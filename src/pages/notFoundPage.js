import React from 'react'
import notFoundImg from '../img/404.jpg'

function NotFoundPage() {
  return (
    <div className="container">
      <div className='row justify-content-center items-center'>
        <img src={notFoundImg} alt='Not-found-img' />
      </div>
    </div>

  )
}

export default NotFoundPage