import React from 'react'
import Hero from '../component/Hero'
import FeaturedSection from '../component/featuredSection'
import Banner from '../component/Banner'
import Testinomial from '../component/Testinomial'
import NewsLetter from '../component/NewsLetter'
import Footer from '../component/Footer'

const Home = () => {
  return (
    <>
     <Hero /> 
   <FeaturedSection />
   <Banner />
   <Testinomial />
   <NewsLetter />
   <Footer />
    </>
  )
}

export default Home
