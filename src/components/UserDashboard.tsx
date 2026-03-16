import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'

function UserDashboard() {
  return (
    <>

      <HeroSection />
      <div className='mt-2.5'><CategorySlider />
      </div>

    </>
  )
}

export default UserDashboard