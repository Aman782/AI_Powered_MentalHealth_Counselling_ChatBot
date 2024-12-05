import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Mentalhealthchat from './Mentalhealthchat'
import Footer from './Footer'
import HowITWorks from './HowITWorks'
import FAQ from './FAQ'

const Home = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <Mentalhealthchat />
        <HowITWorks />
        <FAQ />
        <Footer />
    </>
  )
}

export default Home