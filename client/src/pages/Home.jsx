import React from 'react';
import Hero from '../component/Hero.jsx';
import FeaturedSection from '../component/featuredSection.jsx';
import Banner from '../component/Banner.jsx';
import Testinomial from '../component/Testinomial.jsx';
import NewsLetter from '../component/NewsLetter.jsx';
import Footer from '../component/Footer.jsx';

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <Banner />
      <Testinomial />
      <NewsLetter />
      
    </>
  );
};

export default Home;