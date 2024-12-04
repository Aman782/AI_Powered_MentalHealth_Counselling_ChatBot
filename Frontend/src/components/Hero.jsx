import React from 'react'

const Hero = () => {
  return (
    <>
      <div className='container-fuild p-5 border'>
        <div className='row d-flex align-items-center justify-content-evenly'>
            <div className='col-md-5'>
                <p className='fs-2 text-center fw-semibold'><span className='textStyle'>Simple & Effective Solutions</span>  <br></br> for your mental health & well-being.</p>
                <p>No matter where you are in life, you are never too far gone to make positive changes. Your mental health is the foundation of your happiness and success, and seeking support is the first step in building a more resilient and fulfilling life</p>

                <button className='btn btn-success btn-lg'>
                   Get Started
                </button>
            </div>

            <div className='col-md-4'>
               <img src='./images/brain.svg'></img>
            </div>
        </div>
      </div>
    </>
  )
}

export default Hero