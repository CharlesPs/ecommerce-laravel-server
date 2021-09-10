
import React from 'react'

import * as logo from '../../assets/images/logo/logo.svg'

import './Spinner.scss'

const Spinner = () => {

  return (
    <div className='fallback-spinner vh-100'>
      <img className='fallback-logo' src={logo.default} alt='logo' />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default Spinner
