import React from 'react'

const Title = ({title, subtitle}) => {
  return (
    <>
     <h1 className='font-medium text-3xl'>{title}</h1> 
     <p className='text-sm md:text-base text-gray-500/90 max-w-156
     mt-2'>{subtitle}</p>
    </>
  )
}

export default Title
